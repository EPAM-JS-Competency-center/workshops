+++
title = "Setup"
weight = 1
+++

There are different ways to create messaging in the Cloud. We can use some of the managed services like RabbitMQ which is open source solution for Queue.

On our new architecture, we will be using RabbitMQ as message broker, so we will replace our SQS with Amazon MQ (RabbitMQ implementation).

![Setup](/images/mq/setup.png)

Go to the AWS Console and search for Amazon MQ and click on `Get started` to start creating your RabbitMQ.

![Create Amazon MQ](/images/mq/create-mq-start.png)

On next screen let's choose Rabbit MQ and go to next. Currently Amazon MQ supports two types of message brokers:
  - Apache ActiveMQ
  - RabbitMQ

![Choose RabbitMQ](/images/mq/create-mq-rabbit.png)

Because we needs this only for learning purpose let's choose `Single instance broker`, but in the production environment you want to run `Cluster deployment` which will have better availability and be more resilient.

![Choose RabbitMQ deployment mode](/images/mq/create-mq-deployment-mode.png)

On this screen we need to choose type of our instance and name of the broker. Because it's for testing purpos we will choose `mq.t3.micro` for instance type and name it `OrderProcessing` since we will be using this instead of SQS to push messages.

![Set broker name and type](/images/mq/create-mq-configure-name.png)

Below on the same screen you need to set user and password which will be used to connect to RabbitMQ.

User: rabbit
Password: choose random password (remember it, because you will need it later on), it has some constraints like 12 characters at least

![Set rabbitmq user](/images/mq/create-rabbit-user.png)

Proceed further on Next and in the end to the `Create broker`

After broker has been created we need to create RabbitMQ queue. Open your broker and when you scroll down you will find `Connections`. There is `RabbitMQ web console`, click on the URL and open it. It will ask you to login, enter `rabbit` for username and password you typed earlier.

![Go to web console and login](/images/mq/create-rabbit-web.png)

Once you get logged in, you need to create queue:
  - Go to tab `Queues`
  - At the bottom you have `Add a new queue`
  - Set `name` to `orders`
  - Go to `Add queue` to create it

![Create queue](/images/mq/create-rabbit-queue.png)

