import { FC } from 'react'
import { useNavigate } from 'react-router'
import { useAuthContext } from 'hooks/useAuthContext'
import { PATHS } from 'router/paths'
import { Box, Container, Header, Spinner, Typography } from 'components'
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
          title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Ticket Issued'}
          hasBackIcon
        />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  const checkValidity = isValid && !error
  return (
    <>
      <Header
        title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Ticket issued'}
        hasBackIcon
      />
      <Container>
        <Box alignItems="center">
          <ResultContent isValid={checkValidity} isIssuance={authState.appFlow === 'issuer'} />
          <S.ResultPara variant="p1">
            {authState.appFlow === 'verifier'
              ? checkValidity
                ? 'Ticket successfully checked.'
                : 'Ticket is invalid'
              : 'Your ticket has been issued.'}
          </S.ResultPara>

          <S.IssueTicketButton variant="outlined" onClick={() => navigate(pathTo)}>
            {authState.appFlow === 'verifier' ? 'SCAN NEXT QR CODE' : 'ISSUE NEXT TICKET'}
          </S.IssueTicketButton>
        </Box>
      </Container>
    </>
  )
}

export default Result
