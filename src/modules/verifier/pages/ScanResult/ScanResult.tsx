import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { PATHS } from 'router/paths'
import { W3CCredential } from 'services/verifier/verifier.api'
import { Result } from 'components'
import { useVerifyCredentialsMutation } from 'modules/verifier/hooks/useVerification'
import { useRetrieveSharedCredentialQuery } from 'modules/holder/pages/hooks/useCredentials'

export const ScanResult: FC = () => {
  const location = useLocation()

  const { data, isLoading, error } = useRetrieveSharedCredentialQuery(
    location.state?.hash,
    location.state?.key,
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
    <Result
      isLoading={isLoading || verifyCredentialIsLoading}
      error={error || verifyCredentialError}
      isValid={!!verifyCredentialData?.isValid}
      pathTo={PATHS.VERIFIER.SCAN}
    />
  )
}
