import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRetrieveSharedCredential } from 'modules/holder/pages/hooks/useCredentials'
import { getQueryParams } from 'utils'
import { Container, Header, Spinner, Typography } from 'components'
import { CredentialView } from 'modules/holder/pages/CredentialView/CredentialView'

export const Onboarding: FC = () => {
  const [searchParams] = useSearchParams()
  const vcUrl_ = searchParams.get('vcURL')
  const onboardingLink_ = searchParams.get('onboardingLink')
  const params = getQueryParams({ vcURL: vcUrl_, onboardingLink: onboardingLink_ })
  const { data, error, isLoading } = useRetrieveSharedCredential(params!.hash, params!.key)

  return (
    <>
      {(isLoading || error) && (
        <>
          <Header title="Onboarding"></Header>
          <Container>
            {isLoading && <Spinner />}
            {error && <Typography variant="e1">{error.message}</Typography>}
          </Container>
        </>
      )}
      {data?.id && <CredentialView sharedCredentialId={data.id} />}
    </>
  )
}
