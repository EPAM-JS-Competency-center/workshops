+++
title = "AWS lambda implementation and preparation zip file"
weight = 20
+++


Steps:

To create lambda for subscription we need to perform call to commercetools project to update cart so we need to prepare all dependenies for lambda. For that we should upload archive with code and dependencies.
It should be installed node.js and npm on your local machine

Steps to prepare archive:
1. Open Visual Studio code or any other IDE to work with Node.js. 
Create package.json file and insert next content 
```
{
  "name": "workshop",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@commercetools/sdk-client": "^3.0.0",
    "@commercetools/sdk-middleware-auth": "^7.0.1",
    "@commercetools/sdk-middleware-http": "^7.0.2",
    "node-fetch": "^2.6.11"
  }
}
```
Or run in terminal next command
```
npm init
```
and copy dependencies from mentioned in package.json above.

2. Create file ct-client.js and index.js
3. Insert code generated during ct API client creation to ct-client.js and export client with additional line 
```
module.exports = { client }
```
4. Use next code for index.js file
```
const { client } = require("./ct-client");

exports.handler = async (event) => {
  console.log(`event: ${JSON.stringify(event)}`);
  for await (let record of event.Records) {
    await processRecord(record);
  }
};

const processRecord = async (record) => {
  const message = JSON.parse(record.body);

  if (message.resource.typeId !== 'cart') {
    console.log(`Event won't be processed. Unsupported event: ${message.resource.typeId}`);
    return;
  }

  //get cart
  const getCartRequest = {
    uri: `/${message.projectKey}/carts/${message.resource.id}`,
    method: 'GET'
  }
  let response;
  try {
    response = await client.execute(getCartRequest);
    console.log(`Get cart response: ${JSON.stringify(response)}`);
  } catch (err) {
    console.error(`error during request.error message: ${err.message}`);
  }

  //update cartItem
  const actions = response.body.lineItems
    .filter(ci => !ci.taxRate)
    .map(ci => {
      return {
        action: "setLineItemTaxRate",
        lineItemId: ci.id,
        externalTaxRate: {
          name: "myTaxRate",
          amount: 0.15,
          country: "US"
        }
      }
    });

  if (isEmpty(actions)) {
    console.log(`All lineItems of this cart just contain cartItemTaxRate. cart id: ${response.body.id}`);
    return;
  }
  const setLineItemTaxRateRequest = {
    uri: `/${message.projectKey}/carts/${message.resource.id}`,
    method: 'POST',
    body: {
      version: response.body.version,
      actions: actions
    }
  }

  try {
    const response = await client.execute(setLineItemTaxRateRequest);
    console.log(`Set tax rate response: ${JSON.stringify(response)}`);
  } catch (err) {
    console.error(`error during request.error message: ${JSON.stringify(err)}`);
  }

}

const isEmpty = (arr) => {
  return !Array.isArray(arr) || !arr.length;
}
```
5. After that run next command to download required dependecy
```
npm install
```
6. Then create zip file including 
- index.js
- ct-client.js
-  node_modules folder

