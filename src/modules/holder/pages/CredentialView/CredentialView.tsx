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
import { Container, Header, Spinner } from 'components'
import { Credential } from 'modules/holder/components/Credential'

export const CredentialView: FC = () => {
  const { credentialId } = useParams()
  const { data, isLoading } = useGetCredentialQuery(credentialId || '')
  const { data: shareCredentialData, mutateAsync } = useShareCredentialMutation()

  useEffect(() => {
    if (credentialId) {
      mutateAsync(credentialId)
    }
  }, [mutateAsync, credentialId])

  if (isLoading) {
    return <Spinner />
  }

  if (!(data as StoredW3CCredential).type) {
    return null
  }

  const credential = data as StoredW3CCredential

  return (
    <>
      <Header
        title={getTitles(credential.type) || ''}
        icon={<BackIcon />}
        path={PATHS.HOLDER.HOME}
      />
      <Container fullWidth>
        <Credential
          credentialSubject={credential.credentialSubject}
          qrCode={shareCredentialData?.qrCode}
        />
      </Container>
    </>
  )
}
