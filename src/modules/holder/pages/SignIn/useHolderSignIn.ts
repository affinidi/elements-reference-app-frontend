import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignInInput } from 'services/cloud-wallet/cloud-wallet.api'
import { useSessionStorage } from 'modules/holder/pages/hooks/useSessionStorage'
import { useAuthContext } from 'hooks/useAuthContext'
import { useHolderSignInMutation } from 'hooks/useAuthentication'
import { PATHS } from 'router/paths'

export const useHolderSignIn = () => {
  const [signInInput, setSignInInput] = useState<SignInInput>({ username: '' })
  const navigate = useNavigate()
  const storage = useSessionStorage()
  const { authState, updateAuthState } = useAuthContext()
  const { data, mutateAsync, error, isLoading } = useHolderSignInMutation()

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    await mutateAsync(signInInput)
  }

  useEffect(() => {
    if (data) {
      storage.setItem('signUpToken', data)
      updateAuthState({ ...authState, username: signInInput.username })
      if (!error) navigate(PATHS.HOLDER.CONFIRM_SIGNIN)
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
