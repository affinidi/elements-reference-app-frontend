import { FC } from 'react'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'
import { useAuthContext } from 'hooks/useAuthContext'
import { Container, Header, Ticket } from 'components'
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

        <Ticket>ticket</Ticket>
        <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'holder' })
            navigate(PATHS.HOLDER.HOME)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Collect tickets</S.Heading>
            <S.Para variant="p2">Collect your tickets or view tickets stored in your wallet</S.Para>
          </S.Details>
          <S.Icon src={holderFlowIcon} />
        </S.Card>

        <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'verifier' })
            navigate(PATHS.VERIFIER.WELCOME)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Verify tickets</S.Heading>
            <S.Para variant="p2">Verify tickets with a QR code scanner</S.Para>
          </S.Details>
          <S.Icon src={verifierFlowIcon} />
        </S.Card>

        <S.Card
          onClick={() => {
            updateAuthState({ appFlow: 'issuer' })
            navigate(PATHS.ISSUER.CREDENTIAL_FORM)
          }}
        >
          <S.Details>
            <S.Heading variant="h7">Issue ticket</S.Heading>
            <S.Para variant="p2">Issue tickets to your customers easily</S.Para>
          </S.Details>
          <S.Icon src={issuerFlowIcon} />
        </S.Card>
      </Container>
    </>
  )
}
