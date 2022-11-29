## Affinidi Elements Reference App

Frontend template for [@affinidi/cli](https://www.npmjs.com/package/@affinidi/cli)

## Demo:

https://holder-reference-app.stg.affinidi.com/

## Context

Affinidi’s vision is to empower communities with control and ownership of their data,
creating new business models and greater trust.

As the customer demand for control and ownership of data continues to increase, it is
becoming increasingly important for developers to better manage data privacy and portability
within their apps. With our tooling, you can start creating a privacy-preserving app within minutes.

## What are privacy-preserving apps?

Privacy-preserving apps make it easy to manage and store customer information while giving your customers more control over how this information is used and shared. We enable this data ownership and control through Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs).

Learn more about [VCs](https://academy.affinidi.com/what-are-verifiable-credentials-79f1846a7b9), [trust triangle](https://academy.affinidi.com/what-is-the-trust-triangle-9a9caf36b321), [Decentralized Identifiers (DIDs)](https://academy.affinidi.com/demystifying-decentralized-identifiers-dids-2dc6fc3148fd), and [selective disclosure](https://academy.affinidi.com/a-detailed-guide-on-selective-disclosure-87b89cea1602).

## How to run

This repository is supposed to be used as a template for [@affinidi/cli](https://www.npmjs.com/package/@affinidi/cli)

Please refer to the documentation of [@affinidi/cli](https://www.npmjs.com/package/@affinidi/cli) for more details.


You may also clone this repository and run it separately, but in this case you need to follow these steps:

(You may skip first 3 steps if you already created a project before and know your Api-Key Hash, Project ID and Wallet DID)

1. Install `@affinidi/cli`:
    ```bash
    npm install -g @affinidi/cli
    ```
    Use to this guide for more details: https://github.com/affinidi/affinidi-cli#installation:

2. Create an account:
    ```bash
    affinidi sign-up
    ```
   Use `affinidi login` instead if you already have an Affinidi Account

3. Create a project:
    ```bash
    affinidi create project
    ```
   
    Save response with your credentials in safe place.   
  
4. Copy .env.example to .env 
    ```
    cp .env.example .env
    ```

5. Replace placeholders in .env file with credentials from step 3:
   - `<YOUR_AFFINIDI_APIKEY_HASH>` - `apiKey.apiKeyHash`
   - `<YOUR_AFFINIDI_ISSUER_DID>` - `wallet.did`
   - `<YOUR_AFFINIDI_PROJECT_ID>` - `project.projectId`

6. Run application:
    ```
    npm start
    ```
