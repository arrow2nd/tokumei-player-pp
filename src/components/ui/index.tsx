import React from 'react'
import Select from '../common/select'

const UI = (): JSX.Element => {
  const options = [
    { value: 'chocolate', label: 'ありっちゃありスパーク・マシュ' },
    { value: 'strawberry', label: 'ARuFa・恐山の匿名ラジオ' },
    { value: 'vanilla', label: '長島・加藤のイうてるマにイっちゃってる' }
  ]

  return (
    <div>
      <Select options={options} />
    </div>
  )
}

export default UI
