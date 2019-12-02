const createRequest = require('./index').createRequest;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.LISTEN_PORT || 8080;
const host = process.env.LISTEN_IP || '127.0.0.1';

app.use(bodyParser.json());

app.post('/', (req, res) => {
	console.log('POST Data: ', req.body);
	createRequest(req.body, (status, result) => {
		console.log('Result: ', result);
		res.status(status).json(result);
	});
});

app.listen(port, host, () => console.log(`Listening on port ${port}!`));