import React, { ReactNode } from 'react'

type Props = {
  className?: string
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}

const Button = ({
  className = '',
  disabled,
  onClick,
  children
}: Props): JSX.Element => (
  <button
    className={`border-none outline-none ${
      disabled ? 'cursor-not-allowed' : ''
    } ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
