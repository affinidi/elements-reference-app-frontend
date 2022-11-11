import { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'

import { cloudWalletService } from 'services/cloud-wallet'
import { useAuthContext } from 'hooks/useAuthContext'

import { Typography } from 'components'
import { CloseIcon, DWalletLogoIcon, MenuIcon } from 'assets'
import * as S from './NavBar.styled'
import { AppAuthStateStatus } from 'state/state'

const NavBar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { authState, updateAuthState } = useAuthContext()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    await cloudWalletService.logOut()
    updateAuthState({ refreshToken: '' })
    setIsMenuOpen(false)
    window.location.reload()
  }

  return (
    <S.Container $isOpen={isMenuOpen}>
      <S.NavContainer>
        <S.ButtonContainer onClick={() => navigate(PATHS.HOME)}>
          <DWalletLogoIcon aria-label="wallet-logo" />
        </S.ButtonContainer>
        {authState.status === AppAuthStateStatus.AUTHORIZED && (
          <div>
            {isMenuOpen ? (
              <CloseIcon aria-label="menu-close-icon" onClick={() => setIsMenuOpen(false)} />
            ) : (
              <MenuIcon aria-label="menu-open-icon" onClick={() => setIsMenuOpen(true)} />
            )}
          </div>
        )}
      </S.NavContainer>
      {authState.status === AppAuthStateStatus.AUTHORIZED && isMenuOpen && (
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
