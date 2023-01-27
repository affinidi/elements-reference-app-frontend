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

import { formatDate } from 'utils'

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

  const tickets = data.filter((credentialItem) => {
    const credentialSchema = (credentialItem as StoredW3CCredential).credentialSchema
    return credentialSchema?.id === 'https://schema.affinidi.com/EventEligibilityV1-0.json'
  })

  if (tickets.length === 0) {
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
      date: formatDate(new Date(credentialSubject?.startDate).toISOString().substring(0, 10)),
      time: new Date(credentialSubject?.startDate).toISOString().substring(11, 16),
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
