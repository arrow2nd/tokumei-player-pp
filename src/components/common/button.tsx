import React, { ReactNode } from 'react'

type Props = {
  className?: string
  onClick: () => void
  children: ReactNode
}

const Button = ({ className = '', onClick, children }: Props): JSX.Element => (
  <button className={`border-none outline-none ${className}`} onClick={onClick}>
    {children}
  </button>
)

export default Button
