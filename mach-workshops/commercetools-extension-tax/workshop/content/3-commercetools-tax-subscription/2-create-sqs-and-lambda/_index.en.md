+++
title = "Create SQS and Lambda"
weight = 2
+++

Initially we need to create SQS and after that lambda function

SQS creation steps:

1. Open SQS page and click 'Create queue'

![Choose name](/images/subscription/subscription-4.png)

2. Choose 'Standard' type, fill 'Name' field and click 'Create queue' in the bottom of the page

![Choose name](/images/subscription/subscription-5.png)


Create lambda with template:

1. Similarly like in extension branch we should click 'Create function' -> choose 'Use a blueprint' -> 'Process messages in an SQS queue'

![Choose name](/images/subscription/subscription-6.png)

2. After that provide name for lambda, choose Create a new role and provide name

![Choose name](/images/subscription/subscription-7.png)

3. Scroll down and choose the queue created earlier as a SQS trigger

![Choose name](/images/subscription/subscription-8.png)

4. Click 'Create function'

5. On Lambda function page click 'Upload from' -> '.zip file' and upload a file prepared in previous  section