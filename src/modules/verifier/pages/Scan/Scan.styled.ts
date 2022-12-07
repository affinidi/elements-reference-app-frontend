import styled from 'styled-components'
import { pxToRem } from 'utils'
import { Typography } from 'components'

export const ScannerText = styled(Typography)`
  @media (max-width: ${pxToRem(500)}) {
    color: #ffffff;
    position: absolute;
    top: ${pxToRem(40)};
    left: ${pxToRem(24)};
    width: calc(100% - 48px);
    margin-left: auto;
    margin-right: auto;
    z-index: 200;
  } ;
`
