import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'

export const TicketDetailsCardLeft = styled.div`
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: ${pxToRem(40)};
  background-color: ${(props) => props.theme.colors.utility.info['100']};
`

export const TicketDetailsCardRight = styled.div`
  background-color: ${(props) => props.theme.colors.utility.info['100']};
  position: relative;
  border-left: 0.18em dashed #fff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: ${pxToRem(40)};

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 1em;
    height: 1em;
    background: ${(props) => props.theme.colors.neutral.secondary['100']};
    border-radius: 50%;
    left: ${pxToRem(-9)};
  }

  &::before {
    top: ${pxToRem(-8)};
  }

  &::after {
    bottom: ${pxToRem(-8)};
  }

  img {
    height: ${pxToRem(292)};
    border-radius: 16px;
  }
`

export const Data = styled(Typography)`
  color: ${(props) => props.theme.colors.neutral.secondary['100']};
`
