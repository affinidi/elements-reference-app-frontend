import { FC } from 'react'
import { AnyData } from 'services/cloud-wallet/cloud-wallet.api'
import { format } from 'date-fns'

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
  return format(d, 'dd.MM.yyyy')
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
    const eventObject = {
      'Start Date': format(new Date(detailsObject.startDate), 'dd.MM.yyy'),
      'End Date': format(new Date(detailsObject.endDate), 'dd.MM.yyy'),
      'Start Time': format(new Date(detailsObject.startDate), 'HH.mm'),
      'End Time': format(new Date(detailsObject.endDate), 'HH.mm'),
      Location: detailsObject.place,
    }

    return Object.entries(eventObject).map(([key, value], index) => {
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
      <S.Div>{getDetails(credentialSubject)}</S.Div>
    </>
  )
}
