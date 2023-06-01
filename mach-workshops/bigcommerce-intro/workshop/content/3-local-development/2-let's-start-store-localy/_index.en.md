+++
title = "2. Let's try local development straight away"
weight = 13
+++

## Follow the steps below:

1. Install latest NodeJS LTS: https://nodejs.org/en

2. Install stencil-cli:

   ```
   npm install -g @bigcommerce/stencil-cli
   ```

3. Create project folder and open terminal at created folder.

4. Run terminal quickstart command copied during stencil token creation.

```
stencil init --url <your-store-url> --token <your-stencil-token>
```

5. Leave default port change it and press "Enter" in the dialog.

6. Let's download stencil theme from your store. Run the following command, choose "Yes" to rewrite local with remote, choose your channel.

```
stencil download
```

7. Install packages.

```
npm install
```

8. Start storage localy.

```
stencil start
```

9. Open your store at http://localhost:3000

More information regarding stencil-cli you may find in the documentation https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/stencil-cli-options-and-commands
