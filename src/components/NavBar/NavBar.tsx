import { FC } from 'react'
import { CloseIcon, MenuIcon } from 'assets'
import eventiLogoIcon from 'assets/svg/eventi-logo-icon.svg'
import { Container, Modal, Typography } from 'components'

import { useNavBar } from './useNavBar'

import * as S from './NavBar.styled'

const NavBar: FC = () => {
  const { isMenuOpen, setIsMenuOpen, handleLogOut, handleGoHomePage, isAuthorized } = useNavBar()

  return (
    <>
      <Container>
        <S.Container justifyContent="space-between" alignItems="center" direction="row">
          <S.Logo onClick={handleGoHomePage} src={eventiLogoIcon} aria-label="app-logo" />

          {isAuthorized && (
            <>
              {isMenuOpen ? (
                <S.IconWrapper>
                  <CloseIcon onClick={() => setIsMenuOpen(false)} aria-label="menu-close-icon" />
                </S.IconWrapper>
              ) : (
                <S.IconWrapper>
                  <MenuIcon onClick={() => setIsMenuOpen(true)} aria-label="menu-open-icon" />
                </S.IconWrapper>
              )}
            </>
          )}
        </S.Container>
      </Container>

      {isAuthorized && (
        <Modal open={isMenuOpen} onClose={() => setIsMenuOpen(false)} position="rightSide">
          <S.Content alignItems="flex-end">
            <S.ButtonContainer onClick={handleLogOut}>
              <Typography variant="b1">Log out</Typography>
            </S.ButtonContainer>
          </S.Content>
        </Modal>
      )}
    </>
  )
}

export default NavBar
