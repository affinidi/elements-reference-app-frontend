import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Credential } from 'modules/holder/pages/types'
import { PATHS } from 'router/paths'

import { Box, Ticket, Typography } from 'components'

export type TicketCardProps = {
  credential: Credential
  isValid: boolean
}

const TicketCard: FC<TicketCardProps> = ({ credential, isValid }) => {
  const navigate = useNavigate()

  return (
    <Ticket
      isValid={isValid}
      onClick={() => navigate(`${PATHS.HOLDER.CREDENTIAL}/${credential.credentialId}`)}
    >
      <Box gap={32}>
        <Box>
          <Typography variant="h6">{credential.title}</Typography>
          <Typography variant="s2">Entry Ticket</Typography>
        </Box>

        <Box direction="row" gap={32}>
          <Box>
            <Typography variant="c1">Start Date</Typography>
            <Typography variant="p4">{credential.date}</Typography>
          </Box>
          <Box>
            <Typography variant="c1">Start Time</Typography>
            <Typography variant="p4">{credential.time}</Typography>
          </Box>
        </Box>
      </Box>
    </Ticket>
  )
}

export default TicketCard
