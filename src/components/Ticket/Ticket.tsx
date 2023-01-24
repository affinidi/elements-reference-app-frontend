import React, { HTMLAttributes } from 'react'
import * as S from './Ticket.styled'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  children: React.ReactNode
}

const Ticket: React.FC<BoxProps> = ({ children, isActive = true, ...props }) => (
  <S.Ticket {...props}>
    <S.TicketWrapper>
      <S.TicketLine $isActive={isActive} />
      <S.TicketHeader $isActive={isActive} />
      <S.Box>{children}</S.Box>
    </S.TicketWrapper>
  </S.Ticket>
)

export default Ticket
