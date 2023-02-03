import { FC } from 'react'
import { PATHS } from 'router/paths'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'hooks/useAuthContext'
import { Result } from 'components'

export const IssuanceResult: FC = () => {
  const navigate = useNavigate()
  const { authState, updateAuthState } = useAuthContext()

  const isLoading = false
  const error = null
  const isValid = true
  const pathTo = PATHS.ISSUER.CREDENTIAL_FORM

  if (authState.appFlow !== 'issuer') {
    updateAuthState({ appFlow: null })
    navigate(PATHS.HOME)
  }

  return <Result isLoading={isLoading} error={error} isValid={isValid} pathTo={pathTo} />
}
