import { Dispatch, FC, FormEvent, SetStateAction } from 'react'

import {
  Button,
  Container,
  ContainerForm,
  Header,
  Input,
  Spinner,
  Typography,
} from '../../../components'

type SignInFormProps = {
  handleSignIn(e: FormEvent): void
  setSignInInput(data: { username: string }): void
  disabled: boolean
  isLoading: boolean
  error: Error | null
  inputError: string | null
  setInputError: Dispatch<SetStateAction<string | null>>
  role: 'holder' | 'issuer'
}

export const SignInForm: FC<SignInFormProps> = ({
  handleSignIn,
  setSignInInput,
  disabled,
  error,
  inputError,
  setInputError,
  isLoading,
  role,
}) => {
  return (
    <>
      <Header title={`Sign in as ${role}`} />
      <Container fullWidthCenter>
        <ContainerForm onSubmit={handleSignIn}>
          <Typography variant="p1">Please enter your email address to sign in.</Typography>
          <Input
            autoComplete="off"
            id="username"
            label="Email address"
            placeholder="Enter your email address"
            onChange={(e) => {
              setInputError(null)
              setSignInInput({ username: e.target.value })
            }}
            error={inputError || error?.message}
          ></Input>
          <Button disabled={disabled} type="submit">
            send verification code
          </Button>
          {isLoading && <Spinner />}
        </ContainerForm>
      </Container>
    </>
  )
}
