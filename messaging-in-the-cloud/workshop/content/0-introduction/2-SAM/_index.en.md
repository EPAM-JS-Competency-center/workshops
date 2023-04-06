+++
title = "AWS SAM and Workspace"
weight = 3
+++

[AWS SAM](https://aws.amazon.com/serverless/sam/) is an open-source  framework for building serverless applications. It provides shorthand syntax to express functions, APIs, databases, and event source mappings. With just a few lines per resource, you can define the application you want and model it using YAML. During deployment, SAM transforms and expands the SAM syntax into AWS CloudFormation syntax, enabling you to build serverless applications faster.

1. Setup your workspace running
```
mkdir workspace
cd workspace
```

2. Setup default AWS_REGION
```
sudo yum install -y jq
export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')
echo "export AWS_REGION=${AWS_REGION}" | tee -a ~/.bash_profile
source ~/.bash_profile
```

3. Setup default template under folder **template.yaml**

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  Sample SAM Template

Globals:
  Function:
    Timeout: 3

Resources:

Outputs:


```