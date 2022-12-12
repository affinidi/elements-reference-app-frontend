import { FC } from 'react'
import { useNavigate } from 'react-router'

import { JobTile } from 'modules/holder/pages/types'
import { PATHS } from 'router/paths'

import { Typography } from 'components'
import { ButtonContainer } from 'components/NavBar/NavBar.styled'
import * as S from './JobCard.styled'

export type CardProps = {
  jobtile: JobTile
}

const JobCard: FC<CardProps> = ({ jobtile }) => {
  const navigate = useNavigate()
  return (
    
      <ButtonContainer
        onClick={() => navigate(`${PATHS.HOLDER.JOBDETAIL}/${jobtile.jobId}`)}
      >
        <S.Container>
        <Typography variant="h7" align="center">{jobtile.hiringOrganization}</Typography>
        <Typography variant="b3" >{jobtile.Locations}</Typography>
      <Typography >{jobtile.title}</Typography>
      <Typography variant="c1">{jobtile.date}</Typography>
      
      
        </S.Container>
      </ButtonContainer>
   
  )
}

export default JobCard
