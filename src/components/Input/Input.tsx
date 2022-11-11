import React, { forwardRef, InputHTMLAttributes } from 'react'

import Typography from '../Typography/Typography'

import * as S from './Input.styled'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  units?: string
  isGroup?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isGroup, className, units, ...props }, ref) => (
    <S.Wrapper direction="column" gap={4} className={className}>
      {label && <Typography variant="p4">{label}</Typography>}

      {props.type === 'range' && (
        <S.Range alignItems="flex-end">
          {props.value} {units}
        </S.Range>
      )}

      <S.Input
        $hasError={!!error}
        ref={ref}
        {...(props.type === 'range' && {
          style: {
            backgroundSize: `${
              // @ts-ignore
              ((props.value - props.min) * 100) / (props.max - props.min)
            }% 100%`,
          },
        })}
        {...props}
      />

      {!isGroup && error && <S.Error variant="p3">{error}</S.Error>}
    </S.Wrapper>
  ),
)

export default Input
