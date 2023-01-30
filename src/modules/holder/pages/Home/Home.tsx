import { FC } from 'react'
import { format } from 'date-fns'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'modules/holder/pages/hooks/useCredentials'
import { Credential } from 'modules/holder/pages/types'
import { AnyData } from 'services/cloud-wallet/cloud-wallet.api'

import { Container, Header, Spinner, Typography } from 'components'
import NoTicket from 'assets/noTicket'
import TicketCard from './TicketCard/TicketCard'
import * as S from './Home.styled'

import { JSON_SCHEMA_URL } from 'utils'

export const Home: FC = () => {
  const { data, error, isLoading } = useCredentialsQuery()

  if (isLoading) {
    return (
      <>
        <Header title="Your tickets" />
        <Container fullWidth>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title="Your tickets" />
        <Container fullWidthCenter>
          {error && <Typography variant="e1">{error?.message}</Typography>}
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
        <Container fullWidthCenter>
          <Typography variant="p2">You don't have any tickets yet.</Typography>
          <S.IconContainer>
            <NoTicket />
          </S.IconContainer>
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

  const getCredential = (credentialSubject: AnyData, credentialItem: StoredW3CCredential) => {
    const credential: Credential = {
      title: credentialSubject?.eventName,
      date: format(new Date(credentialSubject?.startDate), 'dd.MM.yyyy'),
      time: new Date(credentialSubject?.startDate).toISOString().substring(11, 16),
      credentialId: credentialItem?.id,
    }

    return credential
  }

  const getTicketCards = (params: { tickets: StoredW3CCredential[]; isValid: boolean }) =>{
    const { tickets, isValid } = params
    tickets.map((credentialItem: StoredW3CCredential) => {
      const credentialSubject = credentialItem?.credentialSubject

      const credential = getCredential(credentialSubject, credentialItem)
      return <TicketCard key={credentialItem.id} credential={credential} isValid={isValid} />
    })

  return (
    <>
      <Header title="Your tickets" />

      <Container isGrid>
        {validTickets && getTicketCards({ tickets: validTickets, isValid: true })}
      </Container>

      {expiredTickets.length !== 0 && <Header title="Expired tickets" />}

      <Container isGrid>
        {expiredTickets && getTicketCards({ tickets: expiredTickets, isValid: false })}
      </Container>
    </>
  )
}
