import styled from 'styled-components'
import { pxToRem } from 'utils'
import { Box as styledBox} from 'components'

export const Container = styled.div`
  cursor: pointer;
  width: auto;
  min-height: ${pxToRem(168)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: ${pxToRem(24)};
  border-radius: ${pxToRem(8)};
  box-shadow: 0 ${pxToRem(4)} ${pxToRem(20)} 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow-wrap: anywhere;
  margin-bottom: ${pxToRem(24)};
`

export const Box = styled(styledBox)`
  margin-right: ${pxToRem(32)};
`
