import { FC } from 'react'
import { format } from 'date-fns'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'modules/holder/pages/hooks/useCredentials'
import { Credential } from 'modules/holder/pages/types'

import { Container, Header, Spinner, Typography, Box } from 'components'
import NoTicket from 'assets/noTicket'

import { JSON_SCHEMA_URL } from 'utils'

import TicketCard from './TicketCard/TicketCard'
import * as S from './Home.styled'

export const Home: FC = () => {
  const { data, error, isLoading } = useCredentialsQuery()

  if (isLoading) {
    return (
      <>
        <Header title="Your tickets" />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title="Your tickets" />
        <Container>
          <div className="grid justify-content-center">
            {error && <Typography variant="e1">{error?.message}</Typography>}
          </div>
        </Container>
      </>
    )
  }

  const tickets = data.filter((credentialItem) => {
    const credentialSchema = (credentialItem as StoredW3CCredential).credentialSchema
    return credentialSchema?.id === JSON_SCHEMA_URL
  })

  if (tickets.length === 0) {
    return (
      <>
        <Header title="Your tickets" />
        <Container>
          <div className="grid justify-content-center">
            <Typography align="center" variant="p2">
              You don't have any tickets yet.
            </Typography>
            <S.IconContainer>
              <NoTicket />
            </S.IconContainer>
          </div>
        </Container>
      </>
    )
  }

  // @ts-ignore
  const validTickets: StoredW3CCredential[] = tickets.filter((credentialItem) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject
    return Date.parse(credentialSubject?.startDate) >= Date.now()
  })

  // @ts-ignore
  const expiredTickets: StoredW3CCredential[] = tickets.filter((credentialItem) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject
    return Date.parse(credentialSubject?.startDate) < Date.now()
  })

  const getTicketCards = ({
    tickets,
    isValid,
  }: {
    tickets: StoredW3CCredential[]
    isValid: boolean
  }) =>
    tickets.map((credentialItem: StoredW3CCredential) => {
      const credential: Credential = {
        title: credentialItem?.credentialSubject?.eventName,
        date: format(new Date(credentialItem?.credentialSubject?.startDate), 'dd.MM.yyyy'),
        time: format(new Date(credentialItem?.credentialSubject?.startDate), 'HH:mm'),
        credentialId: credentialItem?.id,
      }

      return <TicketCard key={credentialItem.id} credential={credential} isValid={isValid} />
    })

  return (
    <>
      <Header title="Your tickets" />

      <Container>
        {validTickets && getTicketCards({ tickets: validTickets, isValid: true })}
      </Container>

      {expiredTickets.length !== 0 && <Header title="Expired tickets" />}

      <Container>
        {expiredTickets && getTicketCards({ tickets: expiredTickets, isValid: false })}
      </Container>
    </>
  )
}
