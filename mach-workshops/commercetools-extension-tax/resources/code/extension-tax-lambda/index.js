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