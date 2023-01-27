import { FC } from 'react'
import {
  StoredCredential,
  StoredW3CCredential,
  UnsignedW3CCredential,
} from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'modules/holder/pages/hooks/useCredentials'
import { Credential } from 'modules/holder/pages/types'
import { AnyData } from 'services/cloud-wallet/cloud-wallet.api'

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

  // @ts-ignore
  const validTickets: StoredW3CCredential[] = data.filter((credentialItem) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject
    return Date.parse(credentialSubject?.eventDate) > Date.now()
  })

  // @ts-ignore
  const expiredTickets: StoredW3CCredential[] = data.filter((credentialItem) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject
    return Date.parse(credentialSubject?.eventDate) <= Date.now()
  })

  const getCredential = (credentialSubject: AnyData, credentialItem: StoredW3CCredential) => {
    const credential: Credential = {
      title: credentialSubject?.eventName,
      date: credentialSubject?.eventDate,
      time: credentialSubject?.eventTime,
      credentialId: credentialItem?.id,
    }

    return credential
  }

  const getTicketCards = (array: StoredW3CCredential[], object: { isValid: boolean }) =>
    array.map((credentialItem: StoredW3CCredential) => {
      const credentialSubject = credentialItem?.credentialSubject

      const credential = getCredential(credentialSubject, credentialItem)
      return <TicketCard key={credentialItem.id} credential={credential} isValid={object.isValid} />
    })

  return (
    <>
      <Header title="Your tickets" />

      <Container isGrid>
        {validTickets && getTicketCards(validTickets, { isValid: true })}
      </Container>

      {expiredTickets.length !== 0 && <Header title="Expired tickets" />}

      <Container isGrid>
        {expiredTickets && getTicketCards(expiredTickets, { isValid: false })}
      </Container>
    </>
  )
}
