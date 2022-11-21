import { FC } from 'react'

import { SignInForm } from 'modules/shared/SignInForm'

import { useHolderSignIn } from './useHolderSignIn'

export const HolderSignIn: FC = () => {
  const { handleSignIn, setSignInInput, disabled, error, isLoading } = useHolderSignIn()

  return (
    <SignInForm
      handleSignIn={handleSignIn}
      setSignInInput={setSignInInput}
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      role="holder"
    />
  )
}
