import styled from 'styled-components'
import { Box } from 'components'
import { pxToRem } from 'utils'

export const Container = styled(Box)`
  padding: ${pxToRem(40)} ${pxToRem(24)};
  max-width: ${pxToRem(375)};
  margin: 0 auto;
`
