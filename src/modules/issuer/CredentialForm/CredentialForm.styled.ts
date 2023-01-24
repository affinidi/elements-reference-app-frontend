import { Input, Textarea, Typography } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Heading = styled(Typography)`
  margin-bottom: ${pxToRem(12)};
  @media (min-width: 250px) {
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(28)};
    margin-top: ${pxToRem(27)};
  }
`
export const Form = styled.form`
  @media (min-width: 250px) {
    max-width: ${pxToRem(816)};
    margin: 0 auto;
  }
`
export const FormSection = styled.div`
  @media (min-width: 250px) {
    display: flex;
    flex-wrap: wrap;
    column-gap: ${pxToRem(32)};
  }
`

export const LongInput = styled(Input)`
  @media (min-width: 250px) {
    width: ${pxToRem(392)};
  }
`

export const TextAreaInput = styled(Textarea)`
  resize: none;
  width: 100%;
`
