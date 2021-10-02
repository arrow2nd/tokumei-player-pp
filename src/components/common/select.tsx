import React from 'react'
import RSelect, { StylesConfig, OptionsOrGroups, GroupBase } from 'react-select'

type Props = {
  options: OptionsOrGroups<unknown, GroupBase<unknown>>
}

const Select = ({ options }: Props): JSX.Element => {
  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none'
    })
  }

  return <RSelect options={options} styles={customStyles} />
}

export default Select
