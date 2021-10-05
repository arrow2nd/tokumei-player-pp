import React, { ChangeEvent } from 'react'

type Props = {
  className?: string
  value?: string
  disabled: boolean
  options: JSX.Element[]
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({
  className = '',
  value,
  disabled,
  options,
  onChange
}: Props): JSX.Element => {
  const isLoaded = options.length > 0

  return (
    <select
      className={`border-none outline-none ${
        isLoaded ? 'cursor-pointer' : 'cursor-wait'
      } ${className}`}
      value={value}
      disabled={disabled || !isLoaded}
      onChange={onChange}
    >
      {isLoaded ? options : <option>Loading...</option>}
    </select>
  )
}

export default Select
