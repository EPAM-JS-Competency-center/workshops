const { client } = require("./ct-client");
const taxRate = parseFloat(process.env.TAX_RATE);

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
          amount: taxRate,
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