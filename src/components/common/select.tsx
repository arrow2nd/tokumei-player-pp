import React, { ChangeEvent } from 'react'

import { Option } from '../../types/option'

type Props = {
  className?: string
  value?: string
  disabled: boolean
  options: JSX.Element[]
  onChange: (current: Option) => void
}

const Select = ({
  className = '',
  value,
  disabled,
  options,
  onChange
}: Props): JSX.Element => {
  const isLoaded = options.length > 0

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLSelectElement>) => {
    const idx = currentTarget.selectedIndex
    onChange({
      label: currentTarget.innerText.split('\n')[idx],
      value: currentTarget.value
    })
  }

  return (
    <select
      className={`border-none outline-none truncate ${
        isLoaded ? 'cursor-pointer' : 'cursor-wait'
      } ${className}`}
      value={value}
      disabled={disabled || !isLoaded}
      onChange={handleChange}
    >
      {isLoaded ? options : <option>Loading...</option>}
    </select>
  )
}

export default Select
