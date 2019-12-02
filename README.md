# Chainlink Market Adapter

## Input Params

- No input parameters available

## Test locally
```bash
 API_KEY=Your_API_key node app.js
```

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Create the zip

```bash
zip -r cl-market.zip .
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 8.10 for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-market.zip` file
- Handler should remain index.handler
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
  - Key: LISTEN_PORT
  - Value: Port number or leave unset to use 8080
  - Key: LISTEN_IP
  - Value: IP or leave unset to use 127.0.0.1
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-market.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key
  - Key: LISTEN_PORT
  - Value: Port number or leave unset to use 8080
  - Key: LISTEN_IP
  - Value: IP or leave unset to use 127.0.0.1