+++
title = "Verification tax extension"
weight = 30
+++

To verify we should create cart and check if tax value is present in cart. Additionally, we should check lambda logs via CloudWatch service to be sure that it's  the lambda was invoked and set taxRate


1. Open https://impex.europe-west1.gcp.commercetools.com/ 

2. Choose Carts in Endpoint field, Create in Command field and put provided payload to Payload multiline field and click "GO!!!"

	Key - unique value
	CustomerId - id of your user in commercetools
```
	{
	    "key": "123",
	    "currency": "USD",
	    "customerId": "487cb8f0-0343-4195-b08d-d6cfe482577c",
	    "customerEmail": "karotkiv@gmail.com",
	    "lineItems": [
	        {
	            "sku": "Smartphone-1"
	        }
	    ],
	"taxMode":"External"
}
```
3. Verify that response contains tax specific objects

![Choose name](/images/extension/extension-16_1.png)

4. Open ExtensionTaxLambda -> Monitor -> View CloudWatch logs

![Choose name](/images/extension/extension-16_2.png)

5. Choose the last record in Log streams -> verify date and time -> review log records and be sure that cartId and other fields are the same like at impex portal

![Choose name](/images/extension/extension-17.png)

6. After verifications it's required to remove extension

{{% notice note %}}
If you don't remove extension at this step it will lead to wrong behavior during next steps 
{{% /notice %}}