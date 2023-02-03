import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'

export const WelcomeMessage = styled(Typography)`
  margin: ${pxToRem(48)} 0;
`

export const ImgWrapper = styled.div`
  svg {
    max-width: 100%;
    height: auto;
  }
`
