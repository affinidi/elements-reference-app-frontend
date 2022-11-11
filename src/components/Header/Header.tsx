import { FC, SVGAttributes } from 'react'
import { useNavigate } from 'react-router-dom'

import * as S from './Header.styled'

export type HeaderProps = {
  title: string
  icon?: SVGAttributes<SVGElement>
  path?: string
}

const Header: FC<HeaderProps> = ({ title, icon, path }) => {
  const navigate = useNavigate()
  return (
    <S.Container>
      <S.IconWrapper onClick={() => (path ? navigate(path) : icon ? navigate(-1) : null)}>
        {icon}
      </S.IconWrapper>
      <S.Title variant="h1">{title}</S.Title>
    </S.Container>
  )
}

export default Header
