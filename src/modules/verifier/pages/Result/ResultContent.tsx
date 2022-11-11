import { FC } from 'react'
import { NegResultIcon, PosResultIcon } from 'assets'
import * as S from './Result.styled'

export type ResultContentProps = {
  isValid: boolean
}
export const ResultContent: FC<ResultContentProps> = ({ isValid }) => {
  return (
    <>
      {isValid ? <PosResultIcon /> : <NegResultIcon />}
      <S.ResultTitle variant="h5" $isVerified={isValid}>
        {isValid ? 'Valid Credential' : 'Invalid Credential'}
      </S.ResultTitle>
    </>
  )
}
