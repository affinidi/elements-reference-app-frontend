import { FC } from 'react'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'
import { Container, Header, Typography } from 'components'
import { BackIcon, ScanQr } from 'assets'
import * as S from './Welcome.styled'

export const Welcome: FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header title="Welcome" icon={<BackIcon />} />
      <Container fullWidthCenter>
        <S.CenterDiv>
          <ScanQr />
          <S.WelcomeMessage variant="p1">
            Welcome to the Eventi ticket scanner. Click “scan QR code” to start checking tickets.
          </S.WelcomeMessage>
          <S.ScanButton onClick={() => navigate(PATHS.VERIFIER.SCAN)}>SCAN QR CODE</S.ScanButton>
        </S.CenterDiv>
      </Container>
    </>
  )
}
