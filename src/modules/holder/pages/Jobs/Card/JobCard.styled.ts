import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Container = styled.div`
  width: auto;
  min-height: ${pxToRem(168)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: ${pxToRem(24)} ${pxToRem(12)};
  border-radius: ${pxToRem(2)};
  box-shadow: 0 ${pxToRem(4)} ${pxToRem(20)} 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow-wrap: anywhere;
  margin-bottom: ${pxToRem(24)};

  @media (min-width: ${pxToRem(500)}) {
    width: ${pxToRem(328)};
  }
`
