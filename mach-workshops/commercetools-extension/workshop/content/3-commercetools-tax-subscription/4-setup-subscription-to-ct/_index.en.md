+++
title = "Create commercetools tax subscription"
weight = 2
+++


Steps:

1. Open and login to https://impex.europe-west1.gcp.commercetools.com/ page

2. Click to API Playground and choose your project

3. Choose 'Subscriptions' in Endpoint field and 'Create' in Command

![Choose name](/images/subscription/subscription-11.png)

4. Put provided payload to Payload multiline field and click 'GO!!!'.


{
	"changes": [{
		"resourceTypeId": "cart"
	}],
	"destination": {
		"type": "SQS",
		"queueUrl": "{{sqs-url}}",
		"region": "eu-central-1",
		"accessKey": "****",
		"accessSecret": "****"
	},
	"key": "tax-subscription"
}

5. Check response details

![Choose name](/images/subscription/subscription-12.png)
