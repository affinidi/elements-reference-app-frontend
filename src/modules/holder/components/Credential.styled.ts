import styled from 'styled-components'

import { pxToRem } from 'utils'

export const Div = styled.div<{ nested?: boolean }>`
  margin-left: ${(props) => (props.nested ? pxToRem(12) : '0')};
`
