import { FC } from 'react'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'
import { Box, Container, Header } from 'components'
import { ScanQr } from 'assets'
import * as S from './Welcome.styled'

export const Welcome: FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header title="Welcome" hasBackIcon />

      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <Box alignItems="center" className="lg:col-start-2">
            <ScanQr />
            <S.WelcomeMessage variant="p1">
              Welcome to the Eventi ticket scanner. Click “scan QR code” to start checking tickets.
            </S.WelcomeMessage>
            <S.ScanButton onClick={() => navigate(PATHS.VERIFIER.SCAN)}>SCAN QR CODE</S.ScanButton>
          </Box>
        </div>
      </Container>
    </>
  )
}
