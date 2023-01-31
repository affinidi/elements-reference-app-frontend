import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'

export const Heading = styled(Typography)`
  margin-bottom: ${pxToRem(12)};
  @media (min-width: 250px) {
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(28)};
    margin-top: ${pxToRem(27)};
  }
`
