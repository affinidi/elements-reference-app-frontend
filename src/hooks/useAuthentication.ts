import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'
import { cloudWalletService } from 'services/cloud-wallet'
import {
  ConfirmSignInInput,
  ConfirmSignInOutput,
  SignInInput,
} from 'services/cloud-wallet/cloud-wallet.api'
import { AppAuthStateStatus } from 'state/state'

export type ErrorResponse = {
  name: string
  traceId: string
  message: string
  details: {
    field: string
    issue: string
    location: string
  }
}
export const signIn = ({ username }: SignInInput) => {
  return cloudWalletService.signInPasswordless({ username })
}

export const confirmSignin = ({ token, confirmationCode }: ConfirmSignInInput) => {
  return cloudWalletService.confirmSignInPasswordless({ token, confirmationCode })
}

export const logOut = () => {
  return cloudWalletService.logOut()
}

export const getDid = () => {
  return cloudWalletService.getDid()
}

export const useSignInMutation = () => {
  return useMutation<string, ErrorResponse, SignInInput, () => void>((data: SignInInput) =>
    signIn(data),
  )
}

export const useConfirmSignInMutation = () => {
  return useMutation<ConfirmSignInOutput, ErrorResponse, ConfirmSignInInput, () => void>(
    (data: ConfirmSignInInput) => confirmSignin(data),
  )
}

export type UserState = {
  username: string
  refreshToken: string
  accessToken: string
  did: string
  status: AppAuthStateStatus
}

const BASIC_STATE: UserState = {
  username: '',
  accessToken: '',
  did: '',
  refreshToken: '',
  status: AppAuthStateStatus.LOADING,
}

export const useAuthentication = () => {
  const [authState, setAuthState] = useState<UserState>(BASIC_STATE)

  const updatePartiallyState =
    <T>(updateFunction: Dispatch<SetStateAction<T>>) =>
    (newState: Partial<T>) => {
      updateFunction((prev) => ({ ...prev, ...newState }))
    }
  const updateAuthState = updatePartiallyState<typeof authState>(setAuthState)

  const authenticate = async () => {
    try {
      const response = await getDid()
      if (response) {
        updateAuthState({ status: AppAuthStateStatus.AUTHORIZED })
      }
    } catch (error) {
      updateAuthState({ status: AppAuthStateStatus.UNAUTHORIZED })
    }
  }

  return { authState, setAuthState, updateAuthState, authenticate }
}
