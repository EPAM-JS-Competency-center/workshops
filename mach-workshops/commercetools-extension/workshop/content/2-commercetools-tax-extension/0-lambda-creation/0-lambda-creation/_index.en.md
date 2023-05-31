+++
title = "AWS tax lambda creation"
weight = 10
+++

Steps:

1. Open and login to AWS console

2. Find lambda page and click 'Create function'

![Choose name](/images/extension/extension-1.png)

3. Provide name of lambda and choose Runtime as Node.js and the click 'Create function'

![Choose name](/images/extension/extension-2.png)

4. Put provided code to 'Source code' field
```
export const handler = async(event) => {
    console.log(`event is ${JSON.stringify(event)}`);
    
    const action = event.action;
    console.log(`Action is ${action}`);

    const cart = event.resource.obj;
    console.log(`${JSON.stringify(cart)}`);
    
    let actions = cart.lineItems.map(li => {
    const act = {
        action : "setLineItemTaxRate",
        lineItemId : li.id,
        externalTaxRate : {
                name : "myTaxRate",
                amount : 0.15,
                country : "US"
        }
    }
    return act;
    });
    console.log(`Action is ${JSON.stringify(actions)}`);
    
    return {
        actions: actions,
        responseType: "UpdateRequest"
    }
}
```


Useful links:

- https://docs.aws.amazon.com/lambda/latest/dg/foundation-console.html
- https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
