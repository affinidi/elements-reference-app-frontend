import { FC } from 'react'
import { Container, Header } from 'components'
import QrScanner from 'modules/verifier/components/QrScanner/QrScanner'
import { BackIcon } from 'assets'
import * as S from './Scan.styled'

export const Scan: FC = () => {
  return (
    <>
      <Header title="Scan QR Code" icon={<BackIcon />} />
      <Container fullWidthLeft>
        <S.ScannerText variant="p1">
          Please hold the QR code in front of the camera to scan it.
        </S.ScannerText>
        <QrScanner />
      </Container>
    </>
  )
}
