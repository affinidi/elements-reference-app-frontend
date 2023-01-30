import styled from 'styled-components'
import Typography from '../Typography/Typography'
import { pxToRem } from 'utils'

export const TicketDetailsCardLeft = styled.div`
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: ${pxToRem(840)};
  height: ${pxToRem(372)};
  padding: ${pxToRem(40)};
  background-color: ${(props) => props.theme.colors.utility.info['100']};
`
export const TicketDetailsCardRight = styled.div`
  background-color: ${(props) => props.theme.colors.utility.info['100']};
  position: relative;
  border-left: 0.18em dashed #fff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  height: ${pxToRem(372)};
  padding: ${pxToRem(56)};
  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 1em;
    height: 1em;
    background: ${(props) => props.theme.colors.neutral.secondary['100']};
    border-radius: 50%;
    left: -0.6em;
  }
  &::before {
    top: -0.4em;
  }
  &::after {
    bottom: -0.4em;
  }
`

export const Data = styled(Typography)`
  color: ${(props) => props.theme.colors.neutral.secondary['100']};
`
