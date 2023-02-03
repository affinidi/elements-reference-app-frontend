import { FC, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from 'hooks/useAuthContext'
import { useClaimCredentialQuery } from 'modules/holder/pages/hooks/useCredentials'
import { Container, Header, Spinner } from 'components'
import { PATHS } from 'router/paths'

export const ClaimVc: FC = () => {
  const { authState, updateAuthState } = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const credentialOfferRequestToken = searchParams.get('credentialOfferRequestToken')
  const { data, refetch } = useClaimCredentialQuery(authState.vcOfferToken)

  useEffect(() => {
    if (credentialOfferRequestToken !== null) {
      updateAuthState({ vcOfferToken: credentialOfferRequestToken as string })
    }

    if (!authState.authorizedAsHolder) {
      navigate(PATHS.HOLDER.SIGNIN)
    }

    refetch()
  }, [
    searchParams,
    refetch,
    credentialOfferRequestToken,
    updateAuthState,
    navigate,
    authState.authorizedAsHolder,
  ])

  useEffect(() => {
    if (data) {
      navigate(`${PATHS.HOLDER.CREDENTIAL}/${data.credentialIds[0]}`)
    }
  }, [data, navigate])

  return (
    <>
      <Header title="Claim credential" />

      <Container>
        <Spinner />
      </Container>
    </>
  )
}
