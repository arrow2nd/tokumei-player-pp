import { OptionType } from '../../types/option'
import React from 'react'
import Select from '../common/select'

const UI = (): JSX.Element => {
  const optionsA: OptionType[] = [
    { value: 'chocolate', label: 'ありっちゃありスパーク・マシュ' },
    { value: 'strawberry', label: 'ARuFa・恐山の匿名ラジオ' },
    { value: 'vanilla', label: '長島・加藤のイうてるマにイっちゃってる' }
  ]

  const optionsB: OptionType[] = [
    { value: 'chocolate', label: '#001 : キックボード' },
    {
      value: 'strawberry',
      label: '#041 : ビジネス本の『ありがたい言葉』を学んで年収1000万になろう！'
    },
    {
      value: 'vanilla',
      label:
        '#239 : 今までに無かった二ッチなランキングの1位と50位を考えよう！【カービィ食べ放題あるあるランキング】'
    }
  ]

  return (
    <div className="flex flex-col w-96">
      <Select className="text-sm" name="A" options={optionsA} limit={20} />
      <Select className="mt-1 text-xs" name="B" options={optionsB} limit={30} />
    </div>
  )
}

export default UI
