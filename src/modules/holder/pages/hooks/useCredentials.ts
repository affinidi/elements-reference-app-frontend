import { useMutation, useQuery } from '@tanstack/react-query'
import { cloudWalletService } from 'services/cloud-wallet'
import {
  AnyData,
  ClaimCredentialOutput,
  GetCredentialsOutput,
  ShareCredentialOutput,
  StoredCredential,
} from 'services/cloud-wallet/cloud-wallet.api'

type ErrorResponse = {
  name: string
  traceId: string
  message: string
  details: {
    field: string
    issue: string
    location: string
  }
}
export const getAllCredentials = () => {
  return cloudWalletService.getAllCredentials()
}

export const getCredentialById = (id: string) => {
  return cloudWalletService.getCredentialById(id)
}

export const claimCredential = (token: string) => {
  return cloudWalletService.claimCredential(token)
}

export const deleteCredentialById = (id: string) => {
  return cloudWalletService.deleteCredentialById(id)
}

export const shareCredential = (id: string): Promise<ShareCredentialOutput | undefined> => {
  return cloudWalletService.shareCredential(id)
}

export const retrieveSharedCredential = (hash: string, key: string) => {
  return cloudWalletService.retrieveSharedCredential(hash, key)
}

export const useCredentialsQuery = () => {
  return useQuery<GetCredentialsOutput, ErrorResponse>(['credentials'], () => getAllCredentials())
}

export const useGetCredentialQuery = (id: string) => {
  return useQuery<StoredCredential, ErrorResponse>(['credentials', id], () => getCredentialById(id))
}

export const useRetrieveSharedCredentialQuery = (hash: string, key: string) => {
  return useQuery<AnyData, ErrorResponse>(['sharedCredential', { hash, key }], () =>
    retrieveSharedCredential(hash, key),
  )
}

export const useClaimCredentialQuery = (token: string) => {
  return useQuery<ClaimCredentialOutput, ErrorResponse>(['claimedCredentials', { token }], () =>
    claimCredential(token),
  )
}

export const useShareCredentialMutation = () => {
  return useMutation<ShareCredentialOutput | undefined, ErrorResponse, string, () => void>(
    (id: string) => shareCredential(id),
  )
}

export const useDeleteCredentialMutation = () => {
  return useMutation<any, ErrorResponse, string, () => void>((id: string) =>
    deleteCredentialById(id),
  )
}
