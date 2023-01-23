import { FC } from 'react'
import { useNavigate } from 'react-router'
import { useAuthContext } from 'hooks/useAuthContext'
import { PATHS } from 'router/paths'
import { Button, Container, Header, Spinner, Typography } from 'components'
import { BackIcon } from 'assets'
import { ResultContent } from './ResultContent'
import { ErrorResponse } from 'hooks/useAuthentication'
import * as S from './Result.styled'

export type ResultProps = {
  isLoading: boolean
  error: ErrorResponse | null
  isValid: boolean
  pathTo: string
}

const Result: FC<ResultProps> = ({ isLoading, isValid, error, pathTo }) => {
  const navigate = useNavigate()
  const { authState } = useAuthContext()

  if (authState.appFlow === null || authState.appFlow === 'holder') {
    navigate(PATHS.HOME)
  }

  if (isLoading) {
    return (
      <>
        <Header
          title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Credential Issued'}
          icon={<BackIcon />}
        />
        <Container fullWidthLeft>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header
          title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Credential Issued'}
          icon={<BackIcon />}
        />
        <Container fullWidthLeft>
          <Typography variant="e1">There was an error, please try again.</Typography>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header
        title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Credential Issued'}
        icon={<BackIcon />}
      />
      <Container fullWidthCenter>
        <ResultContent isValid={isValid} isIssuance={authState.appFlow === 'issuer'} />
        <S.ResultPara variant="p4">
          {authState.appFlow === 'verifier'
            ? isValid
              ? 'Ticket successfully checked.'
              : 'Ticket is invalid'
            : 'Your credential has been issued.'}
        </S.ResultPara>

        <Button variant="outlined" onClick={() => navigate(pathTo)}>
          {authState.appFlow === 'verifier' ? 'SCAN NEXT QR CODE' : 'ISSUE NEXT CREDENTIAL'}
        </Button>
      </Container>
    </>
  )
}

export default Result
