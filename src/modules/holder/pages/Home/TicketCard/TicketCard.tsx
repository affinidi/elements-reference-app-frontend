import { FC } from 'react'
import { useNavigate } from 'react-router'

import { Credential } from 'modules/holder/pages/types'
import { PATHS } from 'router/paths'

import { Typography, Ticket, Box } from 'components'
import * as S from './TicketCard.styled'

export type TicketCardProps = {
  credential: Credential
  isActive: boolean
}

const TicketCard: FC<TicketCardProps> = ({ credential, isActive }) => {
  const navigate = useNavigate()

  return (
    <Ticket
      isActive={isActive}
      onClick={() => navigate(`${PATHS.HOLDER.CREDENTIAL}/${credential.credentialId}`)}
    >
      <Typography variant="h6">{credential.title}</Typography>
      <Typography variant="s2">Entry Ticket</Typography>

      <Box direction='row'>
        <S.Box>
          <Typography variant="c1">Start Date</Typography>
          <Typography variant="p4">{credential.date}</Typography>
        </S.Box>
        <S.Box>
          <Typography variant="c1">Start Time</Typography>
          <Typography variant="p4">{credential.time}</Typography>
        </S.Box>
      </Box>
    </Ticket>
  )
}

export default TicketCard
