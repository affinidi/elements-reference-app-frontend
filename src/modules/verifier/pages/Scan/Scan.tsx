import { FC } from 'react'
import { Container, Header, Typography } from 'components'
import QrScanner from 'modules/verifier/components/QrScanner/QrScanner'
import { BackIcon } from 'assets'

export const Scan: FC = () => {
  return (
    <>
      <Header title="Scan QR Code" icon={<BackIcon />} />
      <Container fullWidthLeft>
        <Typography>Please hold the QR code in front of the camera to scan it.</Typography>
        <QrScanner />
      </Container>
    </>
  )
}
