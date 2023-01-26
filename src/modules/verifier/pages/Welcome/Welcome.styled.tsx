import { Button } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'

export const IconContainer = styled.div`
  margin: ${pxToRem(44)} 0 ${pxToRem(48)};

  // @media (min-width: 500px) {
  //   margin-left: 0;
  //   margin-right: 0;
  // }
`

export const CenterDiv = styled.div`
  text-align: center;
`

export const ScanButton = styled(Button)`
  width: 100%;
`
