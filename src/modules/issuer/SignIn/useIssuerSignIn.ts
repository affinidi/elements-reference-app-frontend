import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignInInput } from 'services/cloud-wallet/cloud-wallet.api'
import { useSessionStorage } from 'modules/holder/pages/hooks/useSessionStorage'
import { useAuthContext } from 'hooks/useAuthContext'
import { useIssuerSignInMutation } from 'hooks/useAuthentication'
import { PATHS } from 'router/paths'

export const useIssuerSignIn = () => {
  const [signInInput, setSignInInput] = useState<SignInInput>({ username: '' })
  const navigate = useNavigate()
  const storage = useSessionStorage()
  const { authState, updateAuthState } = useAuthContext()
  const { data, mutateAsync, error, isLoading } = useIssuerSignInMutation()

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    await mutateAsync(signInInput)
  }

  useEffect(() => {
    if (!data) {
      return
    }

    storage.setItem('signUpToken', data.token)
    updateAuthState({ ...authState, username: signInInput.username })
    if (!error) {
      navigate(`${PATHS.ISSUER.CONFIRM_SIGNIN}${data.signup ? '?signup=true' : ''}`)
    }
  }, [data, error, storage, navigate, authState, updateAuthState, signInInput])

  const disabled = !signInInput.username || isLoading

  return {
    disabled,
    error,
    isLoading,

    handleSignIn,
    setSignInInput,
  }
}
