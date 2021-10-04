import { useEffect, useState } from 'react'
import { OptionType } from '../types/option'
import { RadioData } from '../types/radioData'

export const useRadioEpisode = (radioName: string): OptionType[] => {
  const [episodeOptions, setEpisodeOptions] = useState([] as OptionType[])

  useEffect(() => {
    if (radioName === '') return

    const func = async () => {
      const baseUrl = 'https://arrow2nd.github.io/omkr-radio/data'
      const res = await fetch(`${baseUrl}/${radioName}.json`)
      // TODO: ステータスコードを確認

      const json: RadioData = await res.json()

      setEpisodeOptions(
        json.episodes.map(
          (e): OptionType => ({
            label: `#${e.number} : ${e.title}`,
            value: e.path
          })
        )
      )
    }

    func()
  }, [radioName])

  return episodeOptions
}
