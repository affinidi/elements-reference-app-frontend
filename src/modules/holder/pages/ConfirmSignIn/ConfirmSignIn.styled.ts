import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Input, Typography } from 'components'
import { InputProps } from 'components/Input/Input'

export const VerificationField = styled(Input)<InputProps>`
  margin: ${pxToRem(10)} ${pxToRem(10)} ${pxToRem(10)} 0;

  input {
    text-align: center;
    padding: ${pxToRem(10)};
  }
`
export const Message = styled(Typography)`
  span {
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
  }
`

export const Label = styled(Typography)<{ $error: boolean }>`
  ${(props) => (props.$error ? `color: #e73c5b` : null)};
`
