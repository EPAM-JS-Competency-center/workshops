+++
title = "AWS Cloud9 IDE"
weight = 2
+++

[AWS Cloud9](https://aws.amazon.com/cloud9/) is a cloud-based integrated development environment (IDE) that lets you write, run, and debug your code with just a browser. It includes a code editor, debugger, and terminal. Cloud9 comes pre-packaged with essential tools for popular programming languages and the AWS Command Line Interface (CLI) pre-installed so you don’t need to install files or configure your laptop for this workshop.

Your Cloud9 environment will have access to the same AWS resources as the user with which you logged into the AWS Management Console. We strongly recommend using Cloud9 to complete this workshop.

Take a few minutes now and setup your Cloud9 development environment. Cloud9 works best with Chrome or Firefox, not Safari. It cannot be used from a tablet.

## Starting AWS Cloud9 ##

### Step-by-step instructions ###

1. Go to the AWS Management Console, Select **Services** then select **Cloud9** under Developer Tools. From the top-right of the Console, select an available region for this workshop. Once you have selected a region for Cloud9, use the same region for the entirety of this workshop.

![Step 4](/images/setup/c9-step4.png)

2. Select **Create environment**.

3. Enter `ide-environment` into **Name** and optionally provide a **Description**.

![Step 5](/images/setup/c9-step5.png)

4. Select **Next step**.

5. In **Environment settings**:
- Set the *Instance type* to **t3.small (2 GiB RAM + 2 vCPU)**.
- Leave all other defaults unchanged.

![Step 6](/images/setup/c9-step6-b.png)

6. Select **Next step**.

7. Review the environment settings and select **Create environment**. It will take a few minutes for your Cloud9 environment to be provisioned and prepared.

8. Once ready, your IDE will open to a welcome screen. Below that, you should see a terminal prompt. Close the Welcome tab and drag up the terminal window to give yourself more space to work in.

![Step 7](/images/setup/c9-step7.png)

You can run AWS CLI commands in here just like you would on your local computer. Remember for this workshop to run all commands within the Cloud9 terminal window rather than on your local computer.

Keep your AWS Cloud9 IDE opened in a browser tab throughout this workshop.
