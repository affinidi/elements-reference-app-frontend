import { SyntheticEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import queryString from 'query-string'

import { PATHS } from 'router/paths'
import { useSessionStorage } from 'modules/holder/pages/hooks/useSessionStorage'
import { useConfirmSignIn } from 'modules/shared/ConfirmSignInForm/useConfirmSignIn'
import { useIssuerConfirmSignInMutation, useIssuerSignInMutation } from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'

export const useIssuerConfirmSignIn = () => {
  const storage = useSessionStorage()
  const navigate = useNavigate()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error, mutateAsync, isLoading } = useIssuerConfirmSignInMutation()
  const { data: signInData, mutateAsync: signInMutateAsync } = useIssuerSignInMutation()
  const { computedCode, inputs, isButtonDisabled } = useConfirmSignIn(error?.message)

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault()

    const isSignUp = queryString.parse(window.location.search).signup === 'true'

    await mutateAsync({
      token: storage.getItem('signUpToken') || '',
      confirmationCode: computedCode,
      signup: isSignUp,
    })
  }

  const handleResendCode = async () => {
    if (!authState.username) {
      navigate(PATHS.HOLDER.SIGNIN)
      return
    }
    await signInMutateAsync({ username: authState.username })
  }

  useEffect(() => {
    if (data) {
      updateAuthState({
        ...authState,
        loading: false,
        authorizedAsIssuer: true,
      })

      navigate(PATHS.ISSUER.CREDENTIAL_FORM)
    }

    if (authState.username === '') {
      navigate(PATHS.ISSUER.SIGNIN)
    }
  }, [data, error, authState, updateAuthState, navigate, storage])

  useEffect(() => {
    if (signInData) {
      storage.setItem('signUpToken', signInData.token)
    }
  }, [signInData, storage])

  return { error, onSubmit, inputs, isButtonDisabled, isLoading, handleResendCode }
}
