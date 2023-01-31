import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoute } from 'components/Authorisation/AuthRoute'
import { PATHS } from './paths'
import { useAuthContext } from 'hooks/useAuthContext'

import { Home } from 'pages/Home/Home'
import { Home as HolderHome } from 'modules/holder/pages/Home/Home'
import { HolderConfirmSignIn } from 'modules/holder/pages/ConfirmSignIn/HolderConfirmSignIn'
import { CredentialView } from 'modules/holder/pages/CredentialView/CredentialView'
import { Onboarding } from 'modules/holder/pages/Onboarding/Onboarding'
import { ClaimVc } from 'modules/holder/pages/ClaimVc/ClaimVc'
import { Welcome } from 'modules/verifier/pages/Welcome/Welcome'
import { Scan } from 'modules/verifier/pages/Scan/Scan'
import { ScanResult } from 'modules/verifier/pages/ScanResult/ScanResult'
import { CredentialForm } from 'modules/issuer/CredentialForm/CredentialForm'
import { IssuanceResult } from 'modules/issuer/IssuanceResult/IssuanceResult'
import { Container, NavBar, Spinner } from 'components'
import { HolderSignIn } from 'modules/holder/pages/SignIn/HolderSignIn'
import { IssuerSignIn } from 'modules/issuer/SignIn/IssuerSignIn'
import { IssuerConfirmSignIn } from 'modules/issuer/ConfirmSignIn/IssuerConfirmSignIn'

const AppRouter: FC = () => {
  const { authState } = useAuthContext()

  if (authState.loading) {
    return (
      <>
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.ISSUER.SIGNIN} element={<IssuerSignIn />} />
        <Route path={PATHS.HOLDER.SIGNIN} element={<HolderSignIn />} />

        <Route path={PATHS.ISSUER.CONFIRM_SIGNIN} element={<IssuerConfirmSignIn />} />
        <Route path={PATHS.HOLDER.CONFIRM_SIGNIN} element={<HolderConfirmSignIn />} />

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
        <Route path={PATHS.VERIFIER.RESULT} element={<ScanResult />} />

        <Route
          path={PATHS.ISSUER.CREDENTIAL_FORM}
          element={
            <AuthRoute>
              <CredentialForm />
            </AuthRoute>
          }
        />
        <Route
          path={PATHS.ISSUER.RESULT}
          element={
            <AuthRoute>
              <IssuanceResult />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  )
}

export default AppRouter
