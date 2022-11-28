import { FC } from 'react'
import { useNavigate } from 'react-router'

import { Credential } from 'modules/holder/pages/types'
import { PATHS } from 'router/paths'

import { Typography } from 'components'
import * as S from './Card.styled'

export type CardProps = {
  credential: Credential
}

const Card: FC<CardProps> = ({ credential }) => {
  const navigate = useNavigate()
  return (
    <S.Container onClick={() => navigate(`${PATHS.HOLDER.CREDENTIAL}/${credential.credentialId}`)}>
      <Typography variant="b2">{credential.date}</Typography>
      <Typography variant="h7">{credential.title}</Typography>
      {/* <Typography variant="c1">Your entry ticket for {credential.title}</Typography> */}
      <Typography variant="b3">DETAILS</Typography>
    </S.Container>
  )
}

export default Card
