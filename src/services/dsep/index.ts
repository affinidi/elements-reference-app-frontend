/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  clearSessionStorage,
  getItemFromSessionStorage,
} from 'modules/holder/pages/hooks/useSessionStorage'
import {
  Api as dsepApi,
  // ConfirmSignInInput,
  // SaveCredentialInput,
  // SignInInput,
} from './dsep-operations.api'

import * as S from './api'
import System from '@zxing/library/esm/core/util/System'

class DsepService {


  constructor(
    private readonly client = new dsepApi({
      baseUrl: `${process.env.BECKN_GATEWAY}`,
      baseApiParams: {
        headers: {
          'Api-Key': `${process.env.REACT_APP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    }),
  ) { }

  searchForProviderLocation = async (location: string[], transaction_Id: string, message_id: string) => {
    try {

      const locations: S.Location[] =[] ;
      location.forEach(element => {
        locations.push(
          {
            city: {
              name: element
            }
          }
        )
      });

      const context: S.Context = {
        domain: "nic2004:85491",
        country: "IND",
        region: "std:080",
        action: "search",
        version: "1.0.0",
        bapId: "nic2004:74910.BPP",
        bapUri: process.env.BAP_URL,
        transactionId: transaction_Id,
        messageId: message_id,
        timestamp: new Date()

      }
      const SearchMessage: S.SearchMessage = {
        intent: {
          provider: {
            locations: locations
          }
        }

      }
      const data: S.SearchBody = {
        context: context,
        message: SearchMessage
      }
      const response = await this.client.search.searchCreate(
        { data: data },
        {
          headers: {
            Authorization: getItemFromSessionStorage('accessToken') || '',
          },
        },
      )
      return response.data
    } catch (error: any) {
      throw new Error(error?.error?.message)
    }
  }

  searchAllDefaultJobs = async (data: any) => {
    try {
      const response = await this.client.search.searchCreate(
        { data: data },
        {
          headers: {
            Authorization: getItemFromSessionStorage('accessToken') || '',
          },
        },
      )
      return response.data
    } catch (error: any) {
      throw new Error(error?.error?.message)
    }
  }

  // getCredentialById = async (id: string) => {
  //   try {
  //     const response = await this.client.wallet.getCredential(id, {
  //       headers: {
  //         Authorization: getItemFromSessionStorage('accessToken') || '',
  //       },
  //     })
  //     return response.data
  //   } catch (error: any) {
  //     throw new Error(error?.error?.message)
  //   }
  // }

  // deleteCredentialById = async (id: string) => {
  //   try {
  //     const response = await this.client.wallet.deleteCredential(id, {
  //       headers: {
  //         Authorization: getItemFromSessionStorage('accessToken') || '',
  //       },
  //     })
  //     return response
  //   } catch (error: any) {
  //     throw new Error(error?.error?.message)
  //   }
  // }

  // claimCredential = async (token: string) => {
  //   try {
  //     const response = await this.client.wallet.claimCredentials(
  //       {
  //         credentialOfferRequestToken: token,
  //       },
  //       {
  //         headers: {
  //           Authorization: getItemFromSessionStorage('accessToken') || '',
  //         },
  //       },
  //     )
  //     return response.data
  //   } catch (error: any) {
  //     throw new Error(error?.error?.message)
  //   }
  // }

  // shareCredential = async (id: string) => {
  //   try {
  //     console.log("credenyial ID = " + id);
  //     const response = await this.client.wallet.shareCredential(
  //       id,
  //       {},
  //       {
  //         headers: {
  //           Authorization: getItemFromSessionStorage('accessToken') || '',
  //         },
  //       },
  //     )
  //     return response.data
  //   } catch (error: any) {
  //     throw new Error(error?.error?.message)
  //   }
  // }

  // retrieveSharedCredential = async (hash: string, key: string) => {
  //   try {
  //     const response = await this.client.share.retrieveSharedCredential(hash, { key })
  //     return response.data
  //   } catch (error: any) {
  //     throw new Error(error?.error?.message)
  //   }
  // }

  // storeCredentials = async (data: SaveCredentialInput) => {
  //   try {
  //     const response = await this.client.wallet.storeCredentials(data, {
  //       headers: {
  //         Authorization: getItemFromSessionStorage('accessToken') || '',
  //       },
  //     })
  //     return response.data
  //   } catch (error: any) {
  //     throw new Error(error?.error?.message)
  //   }
  //}
}

const dsepService = new DsepService()

export { dsepService }
