import styled from 'styled-components'
import Typography from '../Typography/Typography'
import { pxToRem } from 'utils'

export const ResultTitle = styled(Typography)<{ $isVerified?: boolean; $isIssuance?:boolean }>`
  color: ${(props) => (props.$isIssuance ? '#313a55' : props.$isVerified ? '#21ab68' : '#e42648')};
  margin: ${pxToRem(48)} 0 ${pxToRem(16)};
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.2px;
`

export const ResultPara = styled(Typography)`
  margin-bottom: ${pxToRem(48)};
`
