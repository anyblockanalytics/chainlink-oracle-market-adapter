const request = require("request");

const createRequest = (input, callback) => {
    const url = "http://localhost:8090/market/AMPL_USD_via_ALL/daily-volume/?roundDay=true";

    const options = {
        method: 'GET',
        url: url,
        headers: {
            "Authorization": "Bearer " + process.env.API_KEY,
            "Content-Type": "application/json"
        },
        json: true
    }
    request(options, (error, response, body) => {
        if (error || response.statusCode >= 400) {
            const statusCode = response ? response.statusCode : 500
            console.log(error)
            const errorText = error || body
            callback(statusCode, {
                jobRunID: input.id,
                status: "errored",
                error: errorText,
                data: {}
            });
        } else {
            callback(response.statusCode, {
                jobRunID: input.id,
                data: body,
                status: "completed",
                pending: false,
                error: null
            });
        }
    });
};

exports.gcpservice = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

exports.handler = (event, context, callback) => {
    createRequest(event, (statusCode, data) => {
        callback(null, data);
    });
};

exports.handlerv2 = (event, context, callback) => {
    createRequest(JSON.parse(event.body), (statusCode, data) => {
        callback(null, {
            statusCode: statusCode,
            body: JSON.stringify(data),
            isBase64Encoded: false
        });
    });
};

module.exports.createRequest = createRequest;