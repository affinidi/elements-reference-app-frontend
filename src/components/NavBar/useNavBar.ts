import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from 'hooks/useAuthContext'
import { logout } from 'hooks/useAuthentication'
import { PATHS } from 'router/paths'

export const useNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { authState, updateAuthState } = useAuthContext()
  const navigate = useNavigate()

  const isAuthorized = authState.authorizedAsIssuer || authState.authorizedAsHolder

  const handleLogOut = useCallback(async () => {
    await logout(authState)
    updateAuthState({
      authorizedAsIssuer: false,
      authorizedAsHolder: false,
    })
    setIsMenuOpen(false)
    navigate(PATHS.HOME)
  }, [authState, navigate, updateAuthState])

  return { isMenuOpen, handleLogOut, setIsMenuOpen, navigate, isAuthorized }
}
