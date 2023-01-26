import { Typography } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'
import { Container } from '../../modules/holder/pages/Home/TicketCard/TicketCard.styled'

export const Card = styled(Container)<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: ${pxToRem(24)};
  min-height: initial;
  align-items: center;
  cursor: pointer;

  @media (min-width: ${pxToRem(500)}) {
    width: auto;
    padding: ${pxToRem(32)};
  }
  ${(props) => (props.$disabled ? `opacity: 0.5; cursor: default;` : null)}
`
export const Heading = styled(Typography)`
  margin-bottom: ${pxToRem(8)};
  font-size: ${pxToRem(20)};
  font-weight: bold;
  line-height: 1.4;
  letter-spacing: ${pxToRem(-0.2)};
`
export const Para = styled(Typography)`
  font-size: ${pxToRem(16)};
  font-style: normal;
  line-height: 1.38;
  letter-spacing: ${pxToRem(0.2)};
`

export const Details = styled.div`
  width: 80%;
`

export const Icon = styled.img`
  @media (min-width: ${pxToRem(500)}) {
    width: ${pxToRem(48)};
    height: ${pxToRem(48)};
  }
`
