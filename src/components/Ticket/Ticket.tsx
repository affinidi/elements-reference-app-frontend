import React, { ButtonHTMLAttributes } from 'react'
import * as S from './Ticket.styled'

import { BoxProps } from 'components/Box/Box'

const Ticket: React.FC<BoxProps> = ({ children, ...props }) => (
  <S.Ticket {...props}>
    <S.TicketWrapper>
      <S.TicketHeader />
      <S.Box>{children}</S.Box>
    </S.TicketWrapper>
  </S.Ticket>
)

export default Ticket
