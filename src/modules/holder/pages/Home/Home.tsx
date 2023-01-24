import { FC } from 'react'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'modules/holder/pages/hooks/useCredentials'
import { Credential } from 'modules/holder/pages/types'
import { getTitles } from 'utils'

import { Container, Header, Spinner, Typography } from 'components'
import Card from './Card/Card'
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
  return (
    <>
      <Header title="Your tickets" />

      <Container isGrid>
        {data &&
          data.map((credentialItem, index) => {
            const credential: Credential = {
              title: getTitles((credentialItem as StoredW3CCredential)?.type),
              date: (credentialItem as StoredW3CCredential)?.issuanceDate || '',
              credentialId: (credentialItem as StoredW3CCredential)?.id,
            }
            return <Card key={index} credential={credential} />
          })}
      </Container>
    </>
  )
}
