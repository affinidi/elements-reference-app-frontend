import { Button } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'

export const IconContainer = styled.div`
  margin: ${pxToRem(44)} 0 ${pxToRem(48)};
`

export const CenterDiv = styled.div`
  text-align: center;
`

export const ScanButton = styled(Button)`
  width: 100%;
`
