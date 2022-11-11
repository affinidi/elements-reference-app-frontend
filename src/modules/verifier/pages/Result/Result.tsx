import { FC, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { PATHS } from 'router/paths'
import { W3CCredential } from 'services/verifier/verifier.api'
import { useVerifyCredentialsMutation } from 'modules/verifier/hooks/useVerification'
import { useRetrieveSharedCredential } from 'modules/holder/pages/hooks/useCredentials'
import { Button, Container, Header, Spinner, Typography } from 'components'
import { BackIcon } from 'assets'
import { ResultContent } from './ResultContent'

export const Result: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { data, isLoading, error } = useRetrieveSharedCredential(
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

  if (isLoading || verifyCredentialIsLoading) {
    return (
      <>
        <Header title="QR code scanned" icon={<BackIcon />} />
        <Container fullWidthLeft>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error || verifyCredentialError) {
    return (
      <>
        <Header title="QR code scanned" icon={<BackIcon />} />
        <Container fullWidthLeft>
          <Typography variant="e1">There was an error, please try again.</Typography>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header title="QR code scanned" icon={<BackIcon />} />
      <Container fullWidthLeft>
        <ResultContent isValid={!!verifyCredentialData?.isValid} />
        <Typography variant="p4">Credential successfully checked.</Typography>
        <Button variant="outlined" onClick={() => navigate(PATHS.VERIFIER.SCAN)}>
          SCAN NEXT QR CODE
        </Button>
      </Container>
    </>
  )
}
