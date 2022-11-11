import { Typography } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'
import { Container } from '../../modules/holder/pages/Home/Card/Card.styled'

export const Card = styled(Container)<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: ${pxToRem(24)};
  min-height: initial;
  align-items: center;
  cursor: pointer;

  @media (min-width: ${pxToRem(500)}) {
    width: auto;
  }
  ${(props) => (props.$disabled ? `opacity: 0.5; cursor: default;` : null)}
`
export const Heading = styled(Typography)`
  margin-bottom: ${pxToRem(8)};
`

export const Details = styled(Typography)`
  width: 83%;
`
