import { FC } from 'react'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'modules/holder/pages/hooks/useCredentials'
import { Credential } from 'modules/holder/pages/types'

import { Container, Header, Spinner, Typography } from 'components'
import TicketCard from './TicketCard/TicketCard'
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
        <Container fullWidth>
          {error && <Typography variant="e1">{error?.message}</Typography>}
        </Container>
      </>
    )
  }

  if (data.length === 0) {
    return (
      <>
        <Header title="Your tickets" />
        <Container fullWidth>
          <Typography variant="p2">You don't have any tickets yet.</Typography>
        </Container>
      </>
    )
  }

  const validTickets = data.filter((credentialItem, index) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject
    if (Date.parse(credentialSubject?.eventDate) > Date.now()) {
      return credentialItem
    }
  })

  const expiredTickets = data.filter((credentialItem, index) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject
    if (Date.parse(credentialSubject?.eventDate) <= Date.now()) {
      return credentialItem
    }
  })

  const getCredential = (credentialSubject: any, credentialItem: any) => {
    const credential: Credential = {
      title: credentialSubject?.eventName,
      date: credentialSubject?.eventDate,
      time: credentialSubject?.eventTime,
      credentialId: (credentialItem as StoredW3CCredential)?.id,
    }

    return credential
  }

  const getTicketCards = (array: any, isActive: boolean) =>
    array.map((credentialItem: any, index: any) => {
      const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject

      const credential = getCredential(credentialSubject, credentialItem)
      return <TicketCard key={index} credential={credential} isActive={isActive} />
    })

  return (
    <>
      <Header title="Your tickets" />

      <Container isGrid>{validTickets && getTicketCards(validTickets, true)}</Container>

      {expiredTickets.length !== 0 && <Header title="Expired tickets" />}

      <Container isGrid>{expiredTickets && getTicketCards(expiredTickets, false)}</Container>
    </>
  )
}
