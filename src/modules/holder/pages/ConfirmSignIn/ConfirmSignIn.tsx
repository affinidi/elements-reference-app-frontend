import {
  FC,
  ClipboardEventHandler,
  KeyboardEvent,
  SyntheticEvent,
  useMemo,
  useRef,
  useState,
  useEffect,
  RefObject,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useSessionStorage } from 'modules/holder/pages/hooks/useSessionStorage'
import { useConfirmSignInMutation, useSignInMutation } from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'

import { Keys } from 'enums/keys'
import { PATHS } from 'router/paths'

import { Box, Button, Container, Header, Typography } from 'components'
import * as S from './ConfirmSignIn.styled'
import { AppAuthStateStatus } from 'state/state'

const CODE_LENGTH = 6
const INPUT_ELEMENTS_AMOUNT = 6
const FROM_ZERO_TO_NINE = Array(10)
  .fill(undefined)
  .map((_, idx) => idx.toString())

type OTPCode = Record<number, string | null>

const CodeObjectToString = (objectCode: OTPCode) =>
  Object.values(objectCode).filter(Boolean).join('')

export const ConfirmSignIn: FC = () => {
  const storage = useSessionStorage()
  const navigate = useNavigate()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error, mutateAsync } = useConfirmSignInMutation()
  const { data: signInData, mutateAsync: signInMutateAsync } = useSignInMutation()

  const inputRef = useRef<HTMLInputElement>(null)

  const [verifyCode, setVerifyCode] = useState<OTPCode>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  })

  const computedCode = useMemo(() => CodeObjectToString(verifyCode), [verifyCode])

  const refInputs: RefObject<HTMLInputElement>[] = Array.from(
    { length: INPUT_ELEMENTS_AMOUNT },
    () => inputRef,
  )

  const partialUpdate = (newState: OTPCode) =>
    setVerifyCode((prev: OTPCode) => {
      const newCode = { ...prev, ...newState }
      return newCode
    })

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault()
    await mutateAsync({
      token: storage.getItem('signUpToken') || '',
      confirmationCode: computedCode,
    })
  }

  const handleResendCode = async () => {
    if (!authState.username) {
      navigate(PATHS.HOLDER.SIGNIN)
      return
    }
    await signInMutateAsync({ username: authState.username })
  }

  const onKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    const isBackspacePressed = e.key === Keys.Backspace
    const isArrowLeft = e.key === Keys.ArrowLeft
    const isArrowRight = e.key === Keys.ArrowRight

    if (isBackspacePressed) {
      if (index !== 0) {
        refInputs[index - 1].current?.focus()
      }

      partialUpdate({ [index]: null })
    } else if (isArrowRight || isArrowLeft) {
      const nextIndex = isArrowRight ? index + 1 : index - 1

      if (nextIndex >= 0 && nextIndex < INPUT_ELEMENTS_AMOUNT) {
        refInputs[nextIndex].current?.focus()
      }
    } else {
      if (!FROM_ZERO_TO_NINE.includes(e.key)) return

      if (index !== INPUT_ELEMENTS_AMOUNT - 1) {
        refInputs[index + 1].current?.focus()
      }

      partialUpdate({ [index]: e.key })
    }
  }

  const onPaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
    const pastedText = e.clipboardData.getData('text')?.split('')
    const firstSix = pastedText.slice(0, INPUT_ELEMENTS_AMOUNT)
    const verifyCodePasted = firstSix.reduce(
      (acc, curr, idx) => ({
        ...acc,
        [idx]: curr,
      }),
      {},
    )

    partialUpdate(verifyCodePasted)
    refInputs[firstSix.length - 1].current?.focus()
  }

  const isButtonDisabled = computedCode.length < CODE_LENGTH

  const inputs = Array.from({ length: INPUT_ELEMENTS_AMOUNT }, (_, index) => {
    return (
      <S.VerificationField
        defaultValue={verifyCode[index] || ''}
        onPaste={onPaste}
        key={index}
        autoFocus={index === 0}
        type="text"
        ref={refInputs[index]}
        error={error?.message}
        maxLength={1}
        onKeyDown={onKeyDown(index)}
        isGroup
      />
    )
  })

  useEffect(() => {
    if (data) {
      storage.setItem('accessToken', data.accessToken)
      updateAuthState({
        ...authState,
        status: AppAuthStateStatus.AUTHORIZED,
      })
      if (!error) navigate(PATHS.HOLDER.HOME)
    }
    if (authState.username === '') {
      navigate(PATHS.HOLDER.SIGNIN)
    }
  }, [data, error, authState, updateAuthState, navigate, storage])

  useEffect(() => {
    if (signInData) {
      storage.setItem('signUpToken', signInData)
    }
  }, [signInData, storage])

  return (
    <>
      <Header title="Signin" />
      <Container fullWidthCenter>
        <Typography variant="p1">
          Please enter the verification code you received in your email.
        </Typography>
        <S.Label $error={!!error} variant="p4">
          Verification code
        </S.Label>
        <form id="confirmation" onSubmit={onSubmit}>
          <Box justifyContent="center" direction="row">
            {inputs}
          </Box>
          {error && <Typography variant="e1">{error?.message}</Typography>}
        </form>
        <Button form="confirmation" type="submit" disabled={isButtonDisabled}>
          Sign in
        </Button>

        <S.Message variant="p2">
          Didn’t receive a code? Click{' '}
          <span
            onClick={() => handleResendCode()}
            onKeyPress={() => handleResendCode()}
            role="button"
            tabIndex={0}
          >
            here
          </span>{' '}
          to send it again
        </S.Message>
      </Container>
    </>
  )
}
