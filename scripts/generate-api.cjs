const { generateApi } = require('swagger-typescript-api')
const path = require('path')
require('dotenv').config()

generateApi({
  name: 'cloud-wallet.api.ts',
  output: path.resolve(process.cwd(), './src/services/cloud-wallet'),
  url: `${process.env.VITE_CLOUD_WALLET_URL}/api/swagger`,
}).catch(console.error)

generateApi({
  name: 'verifier.api.ts',
  output: path.resolve(process.cwd(), './src/services/verifier'),
  url: `${process.env.VITE_VERIFIER_URL}/api/swagger`,
}).catch(console.error)

generateApi({
  name: 'user-management.api.ts',
  output: path.resolve(process.cwd(), './src/services/user-management'),
  url: `${process.env.VITE_USER_MANAGEMENT_URL}/api/swagger`,
}).catch(console.error)

generateApi({
  name: 'issuance.api.ts',
  output: path.resolve(process.cwd(), './src/services/issuance'),
  url: `${process.env.VITE_ISSUANCE_URL}/api/swagger`,
}).catch(console.error)
