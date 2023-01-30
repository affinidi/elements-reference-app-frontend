import styled from 'styled-components'
import { pxToRem } from 'utils'

export const IconContainer = styled.div`
  margin: ${pxToRem(44)} auto ${pxToRem(48)};

  @media (min-width: ${pxToRem(500)}) {
    margin-left: 0;
    margin-right: 0;
  }
`
