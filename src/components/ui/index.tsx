import React from 'react'
import Select from 'react-select'

const UI = (): JSX.Element => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return <Select className="" options={options} />
}

export default UI
