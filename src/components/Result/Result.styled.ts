import styled from 'styled-components'
import Typography from '../Typography/Typography'
import { pxToRem } from 'utils'

export const ResultTitle = styled(Typography)<{ $isVerified?: boolean }>`
  color: ${(props) => (props.$isVerified ? '#21ab68' : '#e42648')};
  margin: ${pxToRem(12)} 0;
`
