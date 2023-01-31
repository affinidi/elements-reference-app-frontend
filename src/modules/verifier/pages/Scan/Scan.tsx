import { FC } from 'react'

import { Container, Header } from 'components'
import QrScanner from 'modules/verifier/components/QrScanner/QrScanner'

export const Scan: FC = () => (
  <>
    <Header title="Scan QR Code" hasBackIcon />

    <Container title="Please hold the QR code in front of the camera to scan it.">
      <div className="grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 lg:col-start-4">
          <QrScanner />
        </div>
      </div>
    </Container>
  </>
)
