import { FC } from 'react'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'
import { useAuthContext } from 'hooks/useAuthContext'
import { Container, Header, Typography } from 'components'
import { IssuerFlowIcon, HolderFlowIcon, VerifierFlowIcon } from '../../assets'
import * as S from './Home.styled'

export const Home: FC = () => {
  const navigate = useNavigate()
  const { updateAuthState } = useAuthContext()
  return (
    <>
      <Header title="Home" />
      <Container isHome title="Please select one of the following options">
        <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'holder' })
            navigate(PATHS.HOLDER.JOBS)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Apply For a Job</S.Heading>
            <Typography variant="p2">
              use your credentials to apply for job at DSEP                   
            </Typography>
          </S.Details>
          <HolderFlowIcon />
        </S.Card>
        <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'holder' })
            navigate(PATHS.HOLDER.HOME)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Collect credential</S.Heading>
            <Typography variant="p2">
              Collect your credentials or view credentials stored in your wallet
            </Typography>
          </S.Details>
          <HolderFlowIcon />
        </S.Card>
        {/* <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'verifier' })
            navigate(PATHS.VERIFIER.WELCOME)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Verify credential</S.Heading>
            <Typography variant="p2">Verify credentials with a QR code scanner</Typography>
          </S.Details>
          <VerifierFlowIcon />
        </S.Card> */}

        {/* <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'issuer' })
            navigate(PATHS.ISSUER.CREDENTIAL_FORM)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Issue credential</S.Heading>
            <Typography variant="p2">Issue credentials to your customers easily</Typography>
          </S.Details>
          <IssuerFlowIcon />
        </S.Card> */}
      </Container>
    </>
  )
}
