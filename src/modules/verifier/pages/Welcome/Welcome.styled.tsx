import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'

export const WelcomeMessage = styled(Typography)`
  margin-top: ${pxToRem(40)};

  @media (min-width: ${pxToRem(500)}) {
    margin: ${pxToRem(48)} 0 ${pxToRem(8)};
  }
`
