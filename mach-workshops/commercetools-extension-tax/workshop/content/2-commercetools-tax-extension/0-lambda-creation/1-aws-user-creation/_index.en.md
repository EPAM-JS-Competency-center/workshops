+++
title = "AWS user for lambda execution creation"
weight = 20
+++

Steps:

1. Find IAM AWS service

2. Choose 'Users' -> 'Add users'

![Choose name](/images/extension/extension-3.png)

3. Specify name of user and click 'Next'

![Choose name](/images/extension/extension-4.png)

4. Choose 'Attach policies directly' -> 'Create policy'

![Choose name](/images/extension/extension-4_1.png)

5. Choose 'Visual' option

![Choose name](/images/extension/extension-4_2.png)

6. Provide service, Actions Allowed and resource arn as showed below

![Choose name](/images/extension/extension-5.png)

![Choose name](/images/extension/extension-6.png)

![Choose name](/images/extension/extension-7.png)

7. Provide name of policy and finish policy creation 

8. Refresh policies list on page of user creation and find your policy.

![Choose name](/images/extension/extension-8.png)

9. Enable checkbox on new policy -> Click 'Next' -> 'Create user'


Create credentials to execute lambda:

1. Find the user in IAM and click to it

2. Choose 'Security credentials'

![Choose name](/images/extension/extension-9.png)

3. Scroll down till 'Access keys' and click 'Create access key'

![Choose name](/images/extension/extension-10.png)

4. Choose 'Third-party service' option

![Choose name](/images/extension/extension-11.png)

5. Click 'Next' -> 'Create access key'

6. Save your 'Access key' and 'Secret access key'

![Choose name](/images/extension/extension-12.png)

7. Click 'Done'

Useful links:

- https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_managed-policies.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
