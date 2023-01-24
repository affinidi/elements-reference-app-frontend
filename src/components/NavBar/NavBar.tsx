import { FC } from 'react'

import { PATHS } from 'router/paths'
import { Typography } from 'components'
import eventiLogoIcon from '../../assets/svg/eventi-logo-icon.svg'
import iconClose from '../../assets/svg/icon-close.svg'
import iconOpen from '../../assets/svg/icon-menu.svg'

import { useNavBar } from './useNavBar'

import * as S from './NavBar.styled'

const NavBar: FC = () => {
  const { isMenuOpen, setIsMenuOpen, handleLogOut, navigate, isAuthorized } = useNavBar()

  return (
    <>
      <S.Container>
        <S.Logo
          onClick={() => navigate(PATHS.HOME)}
          src={eventiLogoIcon}
          aria-label="wallet-logo"
        />

        {isAuthorized && (
          <div>
            {isMenuOpen ? (
              <S.Icon
                aria-label="menu-close-icon"
                onClick={() => setIsMenuOpen(false)}
                src={iconClose}
              />
            ) : (
              <S.Icon
                aria-label="menu-open-icon"
                onClick={() => setIsMenuOpen(true)}
                src={iconOpen}
              />
            )}
          </div>
        )}
      </S.Container>
      {isAuthorized && isMenuOpen && (
        <S.NavBar $isMenuOpen={isMenuOpen}>
        <S.MenuContainer $isOpen={isMenuOpen}>
          <S.ButtonContainer
            onClick={() => {
              setIsMenuOpen(false)
              navigate(PATHS.HOME)
            }}
          >
            <Typography variant="h6">Home</Typography>
          </S.ButtonContainer>
          <S.ButtonContainer onClick={() => handleLogOut()}>
            <Typography variant="h6">Log out</Typography>
          </S.ButtonContainer>
        </S.MenuContainer>
        </S.NavBar>
      )}
    </>
  )
}

export default NavBar
