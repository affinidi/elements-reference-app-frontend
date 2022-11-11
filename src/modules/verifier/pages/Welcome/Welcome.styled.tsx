import styled from 'styled-components'
import { pxToRem } from 'utils'

export const IconContainer = styled.div`
  margin: ${pxToRem(64)} auto ${pxToRem(34)};

  @media (min-width: ${pxToRem(500)}) {
    margin-left: 0;
    margin-right: 0;
  }
`
