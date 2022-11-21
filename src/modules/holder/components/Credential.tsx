import { FC } from 'react'
import { AnyData } from 'services/cloud-wallet/cloud-wallet.api'
import { Typography } from 'components'

import * as S from './Credential.styled'

export type CredentialProps = {
  credentialSubject: AnyData
  qrCode?: string
}

export const renderLiteral = (value: unknown): string => {
  if (typeof value !== 'string') {
    return `${value}`
  }

  const parsedDate = Date.parse(value)
  if (!parsedDate) {
    return value
  }

  const d = new Date(parsedDate)
  return d.toDateString()
}

const getDetails = (detailsObject: unknown, nested = false) => {
  if (Array.isArray(detailsObject)) {
    return (
      <S.Div nested={nested}>
        {detailsObject.map((value, index) => (
          <S.Div key={index}>{getDetails(value, true)}</S.Div>
        ))}
      </S.Div>
    )
  }

  if (typeof detailsObject === 'object' && detailsObject !== null) {
    return Object.entries(detailsObject)
      .filter(([key]) => key !== '@type')
      .map(([key, value], index) => {
        return (
          <S.Div key={index} nested={nested}>
            <S.SmallHeading variant="c1">{key}</S.SmallHeading>
            <S.Div>{getDetails(value, true)}</S.Div>
          </S.Div>
        )
      })
  }

  return <S.Div>{renderLiteral(detailsObject)}</S.Div>
}

export const Credential: FC<CredentialProps> = ({ credentialSubject, qrCode }) => {
  return (
    <>
      {qrCode && (
        <S.QrCodeContainer>
          <img src={qrCode} alt="QR Code" />
        </S.QrCodeContainer>
      )}
      <S.Div>
        <S.Label>
          <Typography variant="b1">CREDENTIAL</Typography>
        </S.Label>
        {getDetails(credentialSubject)}
      </S.Div>
    </>
  )
}
