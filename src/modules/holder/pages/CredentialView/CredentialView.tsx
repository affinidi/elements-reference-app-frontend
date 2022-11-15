import { FC, useEffect } from 'react'
import { useParams } from 'react-router'

import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import {
  useGetCredentialQuery,
  useShareCredentialMutation,
} from 'modules/holder/pages/hooks/useCredentials'
import { getTitles } from 'utils'
import { PATHS } from 'router/paths'

import { BackIcon } from 'assets'
import { Container, Header, Spinner, Typography } from 'components'
import { Credential } from 'modules/holder/components/Credential'

export const CredentialView: FC = () => {
  const { credentialId } = useParams()
  const { data, error, isLoading } = useGetCredentialQuery(credentialId || '')
  const { data: shareCredentialData, mutateAsync } = useShareCredentialMutation()

  useEffect(() => {
    if (credentialId) mutateAsync(credentialId)
  }, [mutateAsync, credentialId])

  if (isLoading) {
    return (
      <>
        <Header title="" icon={<BackIcon />} path={PATHS.HOLDER.HOME} />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }
  if (error) {
    return (
      <>
        <Header
          title={getTitles((data as StoredW3CCredential)?.type) || ''}
          icon={<BackIcon />}
          path={PATHS.HOLDER.HOME}
        />
        <Container>
          <Typography variant="e1">{error.message}</Typography>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header
        title={getTitles((data as StoredW3CCredential)?.type) || ''}
        icon={<BackIcon />}
        path={PATHS.HOLDER.HOME}
      />
      {/* {isLoading && <Spinner />} */}

      {data && (
        <Container fullWidth>
          <Credential credentialData={data} qrCode={shareCredentialData?.qrCode} />
        </Container>
      )}

      {/* {error && (
        <Container>
          <Typography variant="e1">{error.message}</Typography>
        </Container>
      )} */}
    </>
  )
}
