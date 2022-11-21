import { FC } from 'react'

import { SignInForm } from 'modules/shared/SignInForm'

import { useIssuerSignIn } from './useIssuerSignIn'

export const IssuerSignIn: FC = () => {
  const { handleSignIn, setSignInInput, disabled, error, isLoading } = useIssuerSignIn()

  return (
    <SignInForm
      handleSignIn={handleSignIn}
      setSignInInput={setSignInInput}
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      role="issuer"
    />
  )
}
