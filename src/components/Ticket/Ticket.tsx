import React, { HTMLAttributes } from 'react'
import * as S from './Ticket.styled'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  children: React.ReactNode
}

const Ticket: React.FC<BoxProps> = ({ children, ...props }) => (
  <S.Ticket {...props}>{children}</S.Ticket>
)


export default Ticket
