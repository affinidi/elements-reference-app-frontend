import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box, Typography } from 'components'

export const Card = styled(Box)<{ $disabled?: boolean }>`
  padding: ${pxToRem(24)};
  min-height: initial;
  border-radius: 8px;
  box-shadow: 0 ${pxToRem(4)} ${pxToRem(20)} 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow-wrap: anywhere;
  cursor: pointer;

  * {
    cursor: pointer;
  }

  @media (min-width: 1024px) {
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
  @media (min-width: 1024px) {
    width: ${pxToRem(48)};
    height: ${pxToRem(48)};
  }
`
