import { FC, useEffect } from 'react'
import { useLocation } from 'react-router'
import { PATHS } from 'router/paths'
import { W3CCredential } from 'services/verifier/verifier.api'
import { useVerifyCredentialsMutation } from 'modules/verifier/hooks/useVerification'
import { useRetrieveSharedCredentialQuery } from 'modules/holder/pages/hooks/useCredentials'
import { Result } from 'components'

export const ScanResult: FC = () => {
  const location = useLocation()

  const { data, isLoading, error } = useRetrieveSharedCredentialQuery(
    location.state.hash,
    location.state.key,
  )
  const {
    data: verifyCredentialData,
    mutateAsync,
    isLoading: verifyCredentialIsLoading,
    error: verifyCredentialError,
  } = useVerifyCredentialsMutation()

  useEffect(() => {
    if (data) {
      mutateAsync(data as W3CCredential)
    }
  }, [data, mutateAsync])

  return (
    <>
      <Result
        isLoading={isLoading || verifyCredentialIsLoading}
        error={error || verifyCredentialError}
        isValid={!!verifyCredentialData?.isValid}
        pathTo={PATHS.VERIFIER.SCAN}
      />
    </>
  )
}
