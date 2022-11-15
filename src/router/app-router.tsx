import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthRoute } from 'components/Authorisation/AuthRoute'
import { PATHS } from './paths'
import { useAuthContext } from 'hooks/useAuthContext'
import { AppAuthStateStatus } from 'state/state'

import { Home } from 'pages/Home/Home'
import { Home as HolderHome } from 'modules/holder/pages/Home/Home'
import { SignIn } from 'modules/holder/pages/SignIn/SignIn'
import { ConfirmSignIn } from 'modules/holder/pages/ConfirmSignIn/ConfirmSignIn'
import { CredentialView } from 'modules/holder/pages/CredentialView/CredentialView'
import { Onboarding } from 'modules/holder/pages/Onboarding/Onboarding'
import { ClaimVc } from 'modules/holder/pages/ClaimVc/ClaimVc'
import { Welcome } from 'modules/verifier/pages/Welcome/Welcome'
import { Scan } from 'modules/verifier/pages/Scan/Scan'
import { Result } from 'modules/verifier/pages/Result/Result'
import { Container, NavBar, Spinner } from 'components'

const AppRouter: FC = () => {
  const { authState } = useAuthContext()

  if (authState.status === AppAuthStateStatus.LOADING) {
    return (
      <>
        <Container fullWidthCenter>
          <Spinner />
        </Container>
      </>
    )
  }
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.HOLDER.ONBOARD} element={<Onboarding />} />
        <Route path={PATHS.HOLDER.CLAIM_VC} element={<ClaimVc />} />
        <Route
          path={PATHS.HOLDER.HOME}
          element={
            <AuthRoute>
              <HolderHome />
            </AuthRoute>
          }
        />
        <Route path={PATHS.HOLDER.SIGNIN} element={<SignIn />} />
        <Route path={PATHS.HOLDER.CONFIRM_SIGNIN} element={<ConfirmSignIn />} />
        <Route
          path={`${PATHS.HOLDER.CREDENTIAL}/:credentialId`}
          element={
            <AuthRoute>
              <CredentialView />
            </AuthRoute>
          }
        />
        <Route path={PATHS.VERIFIER.WELCOME} element={<Welcome />} />
        <Route path={PATHS.VERIFIER.SCAN} element={<Scan />} />
        <Route path={PATHS.VERIFIER.RESULT} element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
