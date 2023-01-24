import { FC } from 'react'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'
import { Button, Container, Header, Typography } from 'components'
import { BackIcon, ScanQr } from 'assets'
import * as S from './Welcome.styled'

export const Welcome: FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header title="Welcome" icon={<BackIcon />} />
      <Container fullWidthCenter>
        <S.IconContainer>
          <ScanQr />
        </S.IconContainer>
        <Typography variant="p1">
          Welcome to the Eventi ticket scanner. Click “scan QR code” to start checking tickets.
        </Typography>
        <Button onClick={() => navigate(PATHS.VERIFIER.SCAN)}>SCAN QR CODE</Button>
      </Container>
    </>
  )
}
