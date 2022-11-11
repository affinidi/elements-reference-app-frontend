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
import * as S from './CredentialView.styled'

export type CredentialViewProps = {
  sharedCredentialId?: string
}

export const CredentialView: FC<CredentialViewProps> = ({ sharedCredentialId }) => {
  const { credentialId } = useParams()
  const { data, error, isLoading } = useGetCredentialQuery(sharedCredentialId || credentialId || '')
  const { data: shareCredentialData, mutateAsync } = useShareCredentialMutation()

  const getDetails = (detailsObject: Record<string, string>) => {
    return Object.entries(detailsObject).map(([key, value], index) => {
      if (key !== '@type') {
        if (value.constructor === Array) {
          return (
            <div key={index}>
              <S.SmallHeading variant="c1">{key}</S.SmallHeading>
              <Typography variant="p4">{JSON.stringify(value)}</Typography>
            </div>
          )
        }
        if (typeof value === 'string') {
          return (
            <div key={index}>
              <S.SmallHeading variant="c1">{key}</S.SmallHeading>
              <Typography variant="p4">{value}</Typography>
            </div>
          )
        }
      }

      return null
    })
  }

  useEffect(() => {
    if (sharedCredentialId) mutateAsync(sharedCredentialId)
    else if (credentialId) mutateAsync(credentialId)
  }, [mutateAsync, credentialId, sharedCredentialId])

  return (
    <>
      <Header
        title={getTitles((data as StoredW3CCredential)?.type) || ''}
        icon={<BackIcon />}
        path={PATHS.HOLDER.HOME}
      />
      {isLoading && <Spinner />}
      {data && (
        <Container fullWidth>
          <S.QrCodeContainer>
            <img src={shareCredentialData?.qrCode} alt="QR Code" />
          </S.QrCodeContainer>
          <div>
            <S.Label>
              <Typography variant="b1">CREDENTIAL</Typography>
            </S.Label>
            {/* TODO decide which field from VC should get p1 Typography variant */}
            {/* <Typography variant="p1">{credential.description}</Typography> */}
            {getDetails((data as StoredW3CCredential)?.credentialSubject.data)}
          </div>
        </Container>
      )}

      {error && (
        <Container>
          <Typography variant="e1">{error.message}</Typography>
        </Container>
      )}
    </>
  )
}
