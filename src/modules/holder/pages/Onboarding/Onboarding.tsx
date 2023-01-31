import { FC, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from 'hooks/useAuthContext'
import {
  useRetrieveSharedCredentialQuery,
  useStoreCredentialMutation,
} from 'modules/holder/pages/hooks/useCredentials'
import { getQueryParams } from 'utils'
import { Button, Container, Header, Spinner, Typography } from 'components'
import { Credential } from 'modules/holder/components/Credential'
import { PATHS } from 'router/paths'
import * as S from './Onboarding.styled'

export const Onboarding: FC = () => {
  const { authState, updateAuthState } = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const vcUrl_ = searchParams.get('vcURL')
  const onboardingLink_ = searchParams.get('onboardingLink')
  const params = getQueryParams({ vcURL: vcUrl_, onboardingLink: onboardingLink_ })
  const { data, error, isLoading } = useRetrieveSharedCredentialQuery(
    authState.vcHash,
    authState.vcKey,
  )
  const {
    data: storedCredentialData,
    error: storedCredentialError,
    mutateAsync,
  } = useStoreCredentialMutation()

  const handleStoreCredential = async () => {
    if (data) await mutateAsync({ data: [data] })
  }

  const handleDeleteCredential = () => {
    navigate(PATHS.HOLDER.HOME)
  }
  useEffect(() => {
    if (storedCredentialData) {
      navigate(PATHS.HOLDER.HOME)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedCredentialData])

  const handleLink = () => {
    if (!params) return
    if (params!.hash && params!.key) {
      updateAuthState({ vcHash: params!.hash, vcKey: params!.key })
      if (!authState.authorizedAsHolder) {
        navigate(PATHS.HOLDER.SIGNIN)
      }
    }
  }

  useEffect(() => {
    handleLink()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isLoading) {
    return (
      <>
        <Header title="Onboarding" />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title="Onboarding" />
        <Container>{error && <Typography variant="e1">{error.message}</Typography>}</Container>
      </>
    )
  }

  return (
    <>
      <Header title="Onboarding" />
      <Container>
        {data && (
          <>
            <Credential credentialSubject={data.credentialSubject} />
            <S.ButtonContainer direction="row" justifyContent="space-between">
              <Button onClick={() => handleStoreCredential()}>Save</Button>
              <Button variant="outlined" onClick={() => handleDeleteCredential()}>
                Reject
              </Button>
            </S.ButtonContainer>
          </>
        )}

        {storedCredentialError && (
          <Typography variant="e1">{storedCredentialError.message}</Typography>
        )}
      </Container>
    </>
  )
}
