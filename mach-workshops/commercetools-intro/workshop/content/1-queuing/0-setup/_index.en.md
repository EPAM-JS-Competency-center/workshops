+++
title = "Setup"
weight = 1
+++

In the first part of this lab we will be creating SQS queue and connecting it to our lambda.
Lambda and gateway will be precreated using SAM templates so we can focus on the queue directly.
This part of the queue will look like this:

[embed](/images/setup/test.pdf)[/embed]

First thing first, we need to clone our workshop with all code and templates which will help us deploy stack.

Clone repository in `~/environment/workspace` folder
```
git clone https://github.com/EPAM-JS-Competency-center/workshops
```

Position yourself in terminal so that we can deploy our stack, all code from workshop will be inside `messaging-in-the-cloud` folder:
```
cd ~/environment/workspace/workshops/messaging-in-the-cloud/resources/code
```

Because we want to have few stuff precreated for us, which we will be using to connect our SQS to it. Template precreates:
- API Gateway
- 2 Lambda functions, one for consuming from queue, and one to send message into queue
- DynamoDB to store our orders

```
sam build --template template.yaml
sam deploy --stack-name orders --guided
```

When you run deployment, it will ask you a couple of questions, where we have to keep default values, and in the end we just confirm deployment.

```
  Stack Name [orders]: // keep this same
  AWS Region [eu-central-1]: // this will show your region, it's ok to be different
  #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
  Confirm changes before deploy [y/N]: y
  #SAM needs permission to be able to create roles to connect to the resources in your template
  Allow SAM CLI IAM role creation [Y/n]: y
  #Preserves the state of previously provisioned resources when an operation fails
  Disable rollback [y/N]: y
  Save arguments to configuration file [Y/n]: y
  SAM configuration file [samconfig.toml]:
  SAM configuration environment [default]:
```

Once deployment starts it will utilize the CloudFormation in order to deploy. In the AWS Console, you can search for CloudFormation service and open `orders` in it. Which will show something similar:

![SQS CloudFormation template in progress](/images/sqs/sqs-cloudformation.png)
