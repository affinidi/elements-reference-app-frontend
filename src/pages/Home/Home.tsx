import { FC } from 'react'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'
import { useAuthContext } from 'hooks/useAuthContext'
import { Container, Header } from 'components'
import holderFlowIcon from '../../assets/svg/holderFlowIcon.svg'
import issuerFlowIcon from '../../assets/svg/issuerFlowIcon.svg'
import verifierFlowIcon from '../../assets/svg/verifierFlowIcon.svg'
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
            <S.Para variant="p2">
              Collect your credentials or view credentials stored in your wallet
            </S.Para>
          </S.Details>
          <S.Icon src={holderFlowIcon} />
        </S.Card>
        {/* <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'verifier' })
            navigate(PATHS.VERIFIER.WELCOME)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Verify credential</S.Heading>
            <S.Para variant="p2">Verify credentials with a QR code scanner</S.Para>
          </S.Details>


        {/* <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'issuer' })
            navigate(PATHS.ISSUER.CREDENTIAL_FORM)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Issue credential</S.Heading>
            <S.Para variant="p2">Issue credentials to your customers easily</S.Para>
          </S.Details>

      </Container>
    </>
  )
}
