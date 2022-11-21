import { SyntheticEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSessionStorage } from 'modules/holder/pages/hooks/useSessionStorage'
import { useConfirmSignIn } from 'modules/shared/ConfirmSignInForm/useConfirmSignIn'
import { useConfirmSignInMutation, useHolderSignInMutation } from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'

import { PATHS } from 'router/paths'

export const useHolderConfirmSignIn = () => {
  const storage = useSessionStorage()
  const navigate = useNavigate()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error, mutateAsync } = useConfirmSignInMutation()
  const { data: signInData, mutateAsync: signInMutateAsync } = useHolderSignInMutation()
  const { pathTo, computedCode, inputs, isButtonDisabled } = useConfirmSignIn(error?.message)

  const handleResendCode = async () => {
    if (!authState.username) {
      navigate(PATHS.HOLDER.SIGNIN)
      return
    }
    await signInMutateAsync({ username: authState.username })
  }

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault()
    await mutateAsync({
      token: storage.getItem('signUpToken') || '',
      confirmationCode: computedCode,
    })
  }

  useEffect(() => {
    if (data) {
      storage.setItem('accessToken', data.accessToken)
      updateAuthState({
        ...authState,
        loading: false,
        authorizedAsHolder: true,
      })
      if (authState.vcOfferToken) {
        navigate(PATHS.HOLDER.CLAIM_VC)
      } else if (authState.vcHash && authState.vcKey) {
        navigate(PATHS.HOLDER.ONBOARD)
      } else navigate(pathTo(authState.appFlow))
    }
    if (authState.username === '') {
      navigate(PATHS.HOLDER.SIGNIN)
    }
  }, [data, error, authState, updateAuthState, navigate, storage, pathTo])

  useEffect(() => {
    if (signInData) {
      storage.setItem('signUpToken', signInData)
    }
  }, [signInData, storage])

  return { error, onSubmit, inputs, isButtonDisabled, handleResendCode }
}
