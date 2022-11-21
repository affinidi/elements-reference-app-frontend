import { Input, Typography } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Heading = styled(Typography)`
  margin-top: ${pxToRem(24)};
  margin-bottom: ${pxToRem(12)};
  @media (min-width: ${pxToRem(250)}) {
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(28)};
    margin-top: ${pxToRem(48)};
  }
`
export const Form = styled.form`
  @media (min-width: ${pxToRem(250)}) {
    max-width: ${pxToRem(816)};
    margin: 0 auto;
  }
`
export const FormSection = styled.div`
  @media (min-width: ${pxToRem(250)}) {
    display: flex;
    flex-wrap: wrap;
    column-gap: ${pxToRem(32)};
  }
`

export const LongInput = styled(Input)`
  @media (min-width: ${pxToRem(250)}) {
    width: ${pxToRem(392)};
  }
`
