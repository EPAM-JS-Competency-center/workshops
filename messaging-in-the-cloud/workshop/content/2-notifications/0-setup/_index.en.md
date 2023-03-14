+++
title = "Setup"
weight = 1
+++


![Creating dead letter queue](/images/sns/setup/setup.png)

As part of this module we will build couple of notifications using SNS to deliver them to email subscribers.

  - When order is inserted, notify us via email
  - When Dead Letter Queue grows notify us in the email about error

Let's go and open Simple Notification Service in the console and create new topic, call it `order-topic` and it will be connected to our DynamoDB later on. We will be using `Standard` type because we don't care about order of messages in this particular case and they can be out of the order.

![Choose name](/images/sns/setup/sns-setup-name.png)
![Choose name](/images/sns/setup/sns-creation.png)

Once we have it created, we need to set subscriptions for this topic. We will be using email subscription, so go to `Create subscription`

![Choose name](/images/sns/setup/create-subscription.png)

We need to choose protocol for our SNS subscription, there are various but we need Email protocol. And you should specify email which will recieve this message, you can use your personal email. After setting that up you can go on and create subscription.

![Choose name](/images/sns/setup/subscription-creation.png)

In order to recieve SMS notifications we first need to confirm our email, after subscription has been created you will receive email from AWS to confirm your email, go on and confirm it.

![Choose name](/images/sns/setup/sns-confirmation-email.png)
![Choose name](/images/sns/setup/sns-confirmation.png)
