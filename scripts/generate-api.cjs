const { generateApi } = require('swagger-typescript-api')
const path = require('path')
require('dotenv').config()

generateApi({
  name: 'cloud-wallet.api.ts',
  output: path.resolve(process.cwd(), './src/services/cloud-wallet'),
  url: `${process.env.REACT_APP_CLOUD_WALLET_URL}/api/swagger`,
}).catch(console.error)

generateApi({
  name: 'verifier.api.ts',
  output: path.resolve(process.cwd(), './src/services/verifier'),
  url: `${process.env.REACT_APP_VERIFIER_URL}/api/swagger`,
}).catch(console.error)
