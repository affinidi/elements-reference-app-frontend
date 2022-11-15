import { FC } from 'react'
import {
  StoredCredential,
  StoredW3CCredential,
  UnsignedW3CCredential,
} from 'services/cloud-wallet/cloud-wallet.api'
import { Typography } from 'components'
import * as S from './Credential.styled'

export type CredentialProps = {
  credentialData: StoredCredential | StoredW3CCredential | UnsignedW3CCredential
  qrCode?: string
}

export const Credential: FC<CredentialProps> = ({ credentialData, qrCode }) => {
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

  return (
    <>
      {qrCode && (
        <S.QrCodeContainer>
          <img src={qrCode} alt="QR Code" />
        </S.QrCodeContainer>
      )}
      <div>
        <S.Label>
          <Typography variant="b1">CREDENTIAL</Typography>
        </S.Label>
        {/* TODO decide which field from VC should get p1 Typography variant */}
        {/* <Typography variant="p1">{credential.description}</Typography> */}
        {getDetails(
          (credentialData as StoredW3CCredential)?.credentialSubject.data ||
            (credentialData as StoredW3CCredential)?.credentialSubject,
        )}
      </div>
    </>
  )
}
