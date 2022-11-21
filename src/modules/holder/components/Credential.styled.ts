import { Typography } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Label = styled.div`
  width: ${pxToRem(71)};
  height: ${pxToRem(20)};
  display: flex;
  margin: ${pxToRem(40)} 0 ${pxToRem(24)};
  padding: ${pxToRem(4)} ${pxToRem(16)};
  border-radius: 20px;
  background-color: #e9feff;
  display: grid;
  place-content: center;

  p {
    margin: 0;
  }
`
export const Div = styled.div<{ nested?: boolean }>`
  margin-left: ${(props) => (props.nested ? pxToRem(12) : '0')};
`

export const SmallHeading = styled(Typography)`
  margin: ${pxToRem(24)} 0 ${pxToRem(4)};
`

export const QrCodeContainer = styled.div`
  width: ${pxToRem(242)};
  height: ${pxToRem(242)};
  margin: 0 10%;
  @media (min-width: ${pxToRem(500)}) {
    margin: 0 15%;
  }
`
