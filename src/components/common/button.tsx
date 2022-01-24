import React, { ReactNode } from 'react'

type Props = {
  className?: string
  title?: string
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}

const Button = ({
  className = '',
  title = '',
  disabled,
  onClick,
  children
}: Props): JSX.Element => (
  <button
    className={`border-none outline-none ${
      disabled ? 'cursor-not-allowed' : ''
    } ${className}`}
    title={title}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
