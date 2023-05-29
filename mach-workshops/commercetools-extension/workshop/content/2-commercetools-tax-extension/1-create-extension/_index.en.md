+++
title = "Create commercetools tax extension"
weight = 2
+++

Steps:

1. Open and login to https://impex.europe-west1.gcp.commercetools.com/ page

2. Click to API Playground and choose your project

3. Choose 'Extensions' in Endpoint field and 'Create' in Command

![Choose name](/images/extension/extension-13.png)

4. Put provided payload to Payload multiline field and click 'GO!!!'

destination.arn - ARN of your Lambda function
destination.access* - credentials created previously
key - unique identificator of extension. Should be set by user


{
    "destination": {
        "type": "AWSLambda",
        "arn": "arn:aws:lambda:eu-central-1:907001314987:function:ExtensionTaxLambda",
        "accessKey": "*****",
        "accessSecret": "******"
    },
    "triggers": [
        {
            "resourceTypeId": "cart",
            "actions": [
	   "Create",
                "Update"
            ]
        }
    ],
    "key": "tax-extension"
}

5. After that you will see response with extension details

![Choose name](/images/extension/extension-14.png)


Useful links:


