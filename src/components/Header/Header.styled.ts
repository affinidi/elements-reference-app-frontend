import styled from 'styled-components'
import { pxToRem } from 'utils'
import Typography from '../Typography/Typography'

export const IconWrapper = styled.div`
  position: absolute;
  top: ${pxToRem(20)};
  left: ${pxToRem(24)};
  cursor: pointer;

  @media (min-width: ${pxToRem(500)}) {
    top: ${pxToRem(24)};
    left: ${pxToRem(100)};
  }
`

export const Container = styled.div`
  position: relative;
  height: ${pxToRem(164)};

  @media (min-width: ${pxToRem(500)}) {
    height: ${pxToRem(144)};
  }
`

export const Title = styled(Typography)`
padding: ${pxToRem(84)} ${pxToRem(24)} ${pxToRem(24)}};
color: #313a55;
font-weight: bold;

@media (min-width: ${pxToRem(500)}) {
  padding-left: ${pxToRem(100)};
  font-size: ${pxToRem(32)};
}`
