import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSessionStorage } from 'modules/holder/pages/hooks/useSessionStorage'
import { useAuthContext } from 'hooks/useAuthContext'
import { useIssuerSignInMutation } from 'hooks/useAuthentication'
import { PATHS } from 'router/paths'

export const useIssuerSignIn = () => {
  const [username, setUsername] = useState('')
  const [inputError, setInputError] = useState<string | null>(null)
  const navigate = useNavigate()
  const storage = useSessionStorage()
  const { authState, updateAuthState } = useAuthContext()
  const { data, mutateAsync, error, isLoading } = useIssuerSignInMutation()

  const validateEmail = (email: string) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setInputError(null)
    if (!validateEmail(username)) {
      setInputError('This is not a valid email address.')
      return
    }
    await mutateAsync({ username })
  }

  useEffect(() => {
    if (!data) {
      return
    }

    storage.setItem('signUpToken', data.token)
    updateAuthState({ ...authState, username: username })
    if (!error) {
      navigate(`${PATHS.ISSUER.CONFIRM_SIGNIN}${data.signup ? '?signup=true' : ''}`)
    }
  }, [data, error, storage, navigate, authState, updateAuthState, username])

  const disabled = !username || isLoading

  return {
    disabled,
    error,
    isLoading,

    handleSignIn,
    setUsername,
    inputError,
    setInputError,
  }
}
