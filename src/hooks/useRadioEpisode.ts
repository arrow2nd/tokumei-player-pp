import { useCallback, useEffect, useState } from 'react'
import { OptionType } from '../types/option'
import { RadioData } from '../types/radioData'

type RadioEpisodeType = [
  episodeOptions: OptionType[],
  getEpisodePath: (value: string, add: number) => string,
  getRandomEpisodePath: () => string
]

export const useRadioEpisode = (radioName: string): RadioEpisodeType => {
  const [episodeOptions, setEpisodeOptions] = useState([] as OptionType[])

  useEffect(() => {
    if (radioName === '') return

    const func = async () => {
      const res = await fetch(
        `https://omkr-radio.vercel.app/data/${radioName}.json`
      )
      if (!res.ok) {
        window.api.errorDialog(
          'エピソード一覧が取得できませんでした',
          '時間をおいてから再度実行してください'
        )
        return
      }

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

  // 現在のエピソード前後のエピソードを取得
  const getEpisodePath = useCallback(
    (value: string, add: number): string => {
      const idx = episodeOptions.findIndex((opt) => opt.value === value)
      const nextIdx = idx + add

      // 添字が範囲外
      if (nextIdx < 0 || nextIdx >= episodeOptions.length) {
        // 加算数が正なら末尾、負なら先頭の要素を返す
        return add > 0
          ? episodeOptions[0].value
          : episodeOptions.slice(-1)[0].value
      }

      return episodeOptions[nextIdx].value
    },
    [episodeOptions]
  )

  // ランダムなエピソードを取得
  const getRandomEpisodePath = useCallback(() => {
    const idx = Math.floor(Math.random() * episodeOptions.length)
    return episodeOptions[idx].value
  }, [episodeOptions])

  return [episodeOptions, getEpisodePath, getRandomEpisodePath]
}
