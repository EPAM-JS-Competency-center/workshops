+++
title = "AWS lambda implementation and preparation zip file"
weight = 2
+++


Steps:

To create lambda for subscription we need to perform call to commercetools project to update cart so we need to prepare all dependenies for lambda. For that we should upload archive with code and dependencies.
It should be installed node.js and npm on your local machine
Steps to prepare archive:
	1. Open Visual Studio code or any other IDE to work with Node.js and run in terminal next command
npm init
	2. Create file ct-client.js and index.js
	3. Insert code generated during ct API client creation to ct-client.js and export client with additional line 
module.exports = { client }

	4. Use next code for index.js file
	5. After that run next command to download required dependecy
npm install
Then create zip file including index.js, ct-client.js, node_modules folder

