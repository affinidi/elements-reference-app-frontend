import { FC, ReactNode } from 'react'

import { Box, Button, Container, Header, Typography } from 'components'

import * as S from './ConfirmSignInForm.styled'

type ConfirmSignInFormProps = {
  error: Error | null
  onSubmit(): void
  inputs: ReactNode
  isButtonDisabled: boolean
  handleResendCode(): void
}

export const ConfirmSignInForm: FC<ConfirmSignInFormProps> = ({
  error,
  onSubmit,
  inputs,
  isButtonDisabled,
  handleResendCode,
}) => {
  return (
    <>
      <Header title="Signin" />
      <Container fullWidthCenter>
        <Typography variant="p1">
          Please enter the verification code you received in your email.
        </Typography>
        <S.Label $error={!!error} variant="p4">
          Verification code
        </S.Label>
        <form id="confirmation" onSubmit={onSubmit}>
          <Box justifyContent="center" direction="row">
            {inputs}
          </Box>
          {error && (
            <Typography variant="e1">
              {error?.message || 'Verification code is incorrect, please try again'}
            </Typography>
          )}
        </form>
        <Button form="confirmation" type="submit" disabled={isButtonDisabled}>
          Sign in
        </Button>

        <S.Message variant="p2">
          Didn’t receive a code? Click{' '}
          <span
            onClick={() => handleResendCode()}
            onKeyPress={() => handleResendCode()}
            role="button"
            tabIndex={0}
          >
            here
          </span>{' '}
          to send it again
        </S.Message>
      </Container>
    </>
  )
}
