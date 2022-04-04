import { useEffect, useState } from 'react'

import { API_BASE_URL } from '../data/constants'

import { Option, OptionGroup } from '../types/option'
import { Radio } from '../types/radio'

import { fetchTimeout } from './util'

function createOptions(radio: Radio[], nowOnAir: boolean): Option[] {
  return radio
    .filter((e) => e.nowOnAir === nowOnAir)
    .map(
      (e): Option => ({
        label: e.title,
        value: e.id
      })
    )
}

export const useRadioList = (): OptionGroup[] => {
  const [radioOptions, setRadioOptions] = useState([] as OptionGroup[])

  useEffect(() => {
    const func = async () => {
      const res = await fetchTimeout(API_BASE_URL + 'list.json').catch(() => {
        window.api.errorDialog(
          'ラジオ一覧が取得できませんでした',
          '時間をおいてから再度起動し直してください'
        )
      })
      if (!res) return

      const json: Radio[] = await res.json()

      setRadioOptions([
        {
          label: '更新中',
          options: createOptions(json, true)
        },
        {
          label: '更新終了',
          options: createOptions(json, false)
        }
      ])
    }

    func()
  }, [])

  return radioOptions
}
