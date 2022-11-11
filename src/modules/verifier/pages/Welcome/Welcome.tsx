import { FC } from 'react'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'
import { Button, Container, Header, Typography } from 'components'
import { BackIcon, VerifierIcon } from 'assets'
import * as S from './Welcome.styled'

export const Welcome: FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header title="Welcome" icon={<BackIcon />} />
      <Container fullWidthLeft>
        <Typography variant="p1">
          Welcome at d.scanner - your decentralized scanner app to verify credentials. Click “scan
          QR code” to start verifying.
        </Typography>
        <S.IconContainer>
          <VerifierIcon />
        </S.IconContainer>
        <Button onClick={() => navigate(PATHS.VERIFIER.SCAN)}>SCAN QR CODE</Button>
      </Container>
    </>
  )
}
