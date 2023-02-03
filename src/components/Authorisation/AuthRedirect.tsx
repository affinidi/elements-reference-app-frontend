import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATHS } from 'router/paths'
import { useAuthContext } from 'hooks/useAuthContext'
import Loading from 'assets/loading'

export const AuthRedirect: FC = ({ children }) => {
  const { authState } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const isIssuer = location.pathname.includes('/issuer')
    const isHolder = location.pathname.includes('/holder')

    if (isIssuer && !authState.authorizedAsIssuer) {
      navigate(PATHS.ISSUER.SIGNIN)
    }

    if (isHolder && !authState.authorizedAsHolder) {
      navigate(PATHS.HOLDER.SIGNIN)
    }
  }, [navigate, location, authState])

  if (authState.loading) {
    return <Loading />
  }

  return <>{children}</>
}
