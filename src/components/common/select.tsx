import React from 'react'
import { OptionType } from '../../types/option'
import { truncate } from '../../scripts/util'

type Props = {
  className?: string
  name: string
  options: OptionType[]
  limit: number
}

const Select = ({
  className = '',
  name,
  options,
  limit
}: Props): JSX.Element => {
  const optionItems = options.map((e) => (
    <option key={e.label} value={e.value}>
      {truncate(e.label, limit)}
    </option>
  ))

  return (
    <select className={`border-none outline-none ${className}`} name={name}>
      {optionItems}
    </select>
  )
}

export default Select
