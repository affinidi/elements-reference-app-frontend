import styled from 'styled-components'
import { pxToRem } from 'utils'
import Typography from '../Typography/Typography'

export const IconWrapper = styled.div`
  position: absolute;
  top: ${pxToRem(80)};
  left: ${pxToRem(24)};
  cursor: pointer;

  @media (min-width: ${pxToRem(500)}) {
    left: ${pxToRem(100)};
  }
`

export const Container = styled.div`
  background: #262c47;
  position: relative;
  padding-top: ${pxToRem(2)};
`

export const Title = styled(Typography)`
padding: ${pxToRem(84)} ${pxToRem(24)} ${pxToRem(24)}};

@media (min-width: ${pxToRem(500)}) {
  padding-left: ${pxToRem(100)}};
}`
