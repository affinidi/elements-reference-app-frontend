import { FC } from 'react'

import { PATHS } from 'router/paths'
import { Typography } from 'components'
import { CloseIcon, DWalletLogoIcon, MenuIcon } from 'assets'

import { useNavBar } from './useNavBar'

import * as S from './NavBar.styled'

const NavBar: FC = () => {
  const { isMenuOpen, setIsMenuOpen, handleLogOut, navigate, isAuthorized } = useNavBar()

  return (
    <S.Container $isOpen={isMenuOpen}>
      <S.NavContainer>
        <S.ButtonContainer onClick={() => navigate(PATHS.HOME)}>
          <DWalletLogoIcon aria-label="wallet-logo" />
        </S.ButtonContainer>
        {isAuthorized && (
          <div>
            {isMenuOpen ? (
              <CloseIcon aria-label="menu-close-icon" onClick={() => setIsMenuOpen(false)} />
            ) : (
              <MenuIcon aria-label="menu-open-icon" onClick={() => setIsMenuOpen(true)} />
            )}
          </div>
        )}
      </S.NavContainer>
      {isAuthorized && isMenuOpen && (
        <S.MenuContainer>
          <S.ButtonContainer onClick={() => handleLogOut()}>
            <Typography variant="h6">Log out</Typography>
          </S.ButtonContainer>
        </S.MenuContainer>
      )}
    </S.Container>
  )
}

export default NavBar
