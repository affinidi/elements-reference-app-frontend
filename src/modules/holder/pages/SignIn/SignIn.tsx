import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignInInput } from 'services/cloud-wallet/cloud-wallet.api'
import { useSignInMutation } from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'
import { useSessionStorage } from 'modules/holder/pages/hooks/useSessionStorage'
import { PATHS } from 'router/paths'

import { Button, Container, Header, Input, Spinner, Typography } from '../../../../components'

export const SignIn: FC = () => {
  const [signInInput, setSignInInput] = useState<SignInInput>({ username: '' })
  const navigate = useNavigate()
  const storage = useSessionStorage()
  const { authState, updateAuthState } = useAuthContext()
  const { data, mutateAsync, error, isLoading } = useSignInMutation()

  const handleSignIn = async (input: SignInInput) => {
    await mutateAsync(input)
  }

  useEffect(() => {
    if (data) {
      storage.setItem('signUpToken', data)
      updateAuthState({ ...authState, username: signInInput.username })
      if (!error) navigate(PATHS.HOLDER.CONFIRM_SIGNIN)
    }
  }, [data, error, storage, navigate, authState, updateAuthState, signInInput])

  return (
    <>
      <Header title="Signin" />
      <Container fullWidthCenter>
        <Typography variant="p1">Please enter your email address to sign in.</Typography>
        <Input
          autoComplete="off"
          id="username"
          label="Email address"
          placeholder="Enter your email address"
          onChange={(e) => setSignInInput({ username: e.target.value })}
          error={error?.message}
        ></Input>
        <Button onClick={() => handleSignIn(signInInput)}>send verification code</Button>
        {isLoading && <Spinner />}
      </Container>
    </>
  )
}
