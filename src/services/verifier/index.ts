import { Api as VerifierApi, W3CCredential } from './verifier.api'

class VerifierService {
  constructor(
    private readonly client = new VerifierApi({
      baseUrl: `${import.meta.env.VITE_VERIFIER_URL}/api/v1`,
      baseApiParams: {
        headers: {
          'Api-Key': `${import.meta.env.VITE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    }),
  ) {}

  verifyVc = async (data: W3CCredential) => {
    try {
      const result = await this.client.verifier.verifyCredentials({ verifiableCredentials: [data] })
      return result.data
    } catch (error: any) {
      throw new Error(error?.error?.message)
    }
  }
}

const verifierService = new VerifierService()

export { verifierService }
