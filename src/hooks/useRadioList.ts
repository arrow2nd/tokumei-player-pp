import { useEffect, useState } from 'react'
import { GroupOptionType, OptionType } from '../types/option'
import { ListItem } from '../types/radioData'

function createOptions(items: ListItem[], onAir: boolean): OptionType[] {
  return items
    .filter((e) => e.onAir === onAir)
    .map(
      (e): OptionType => ({
        label: e.name,
        value: e.name
      })
    )
}

export const useRadioList = (): GroupOptionType[] => {
  const [radioOptions, setRadioOptions] = useState([] as GroupOptionType[])

  useEffect(() => {
    const func = async () => {
      const res = await fetch('https://arrow2nd.github.io/omkr-radio/list.json')
      const json: ListItem[] = await res.json()

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