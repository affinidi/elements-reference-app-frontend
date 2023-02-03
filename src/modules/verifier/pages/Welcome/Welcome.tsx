import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATHS } from 'router/paths'
import { ScanQr } from 'assets'
import { Box, Button, Container, Header } from 'components'

import * as S from './Welcome.styled'

export const Welcome: FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header title="Welcome" hasBackIcon />

      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <Box alignItems="center" className="lg:col-start-2">
            <S.ImgWrapper>
              <ScanQr />
            </S.ImgWrapper>

            <S.WelcomeMessage align="center" variant="p1">
              Welcome to the Eventi ticket scanner. Click “scan QR code” to start checking tickets.
            </S.WelcomeMessage>

            <Button fullWidth onClick={() => navigate(PATHS.VERIFIER.SCAN)}>
              SCAN QR CODE
            </Button>
          </Box>
        </div>
      </Container>
    </>
  )
}
