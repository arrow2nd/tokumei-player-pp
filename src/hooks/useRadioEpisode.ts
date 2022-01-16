import { useCallback, useEffect, useState } from 'react'

import { API_BASE_URL } from '../data/constants'
import { Option } from '../types/option'
import { RadioData } from '../types/radioData'
import { fetchTimeout } from './util'

type RadioEpisodeType = [
  episodeOptions: Option[],
  getEpisodePath: (value: string, add: number) => Option,
  getRandomEpisodePath: () => Option
]

export const useRadioEpisode = (radioId: string): RadioEpisodeType => {
  const [episodeOptions, setEpisodeOptions] = useState([] as Option[])

  useEffect(() => {
    if (radioId === '') return

    const func = async () => {
      const res = await fetchTimeout(
        API_BASE_URL + `data/${radioId}.json`
      ).catch(() => {
        window.api.errorDialog(
          'エピソード一覧が取得できませんでした',
          '時間をおいてから再度起動し直してください'
        )
      })
      if (!res) return

      const json: RadioData = await res.json()
      setEpisodeOptions(
        json.episodes.map(
          (e): Option => ({
            label: `#${e.number} : ${e.title}`,
            value: e.path
          })
        )
      )
    }

    func()
  }, [radioId])

  // 現在のエピソード前後のエピソードを取得
  const getEpisodePath = useCallback(
    (value: string, add: number): Option => {
      const idx = episodeOptions.findIndex((opt) => opt.value === value)
      const nextIdx = idx + add

      // 添字が範囲外
      if (nextIdx < 0 || nextIdx >= episodeOptions.length) {
        // 加算数が正なら末尾、負なら先頭の要素を返す
        return add > 0 ? episodeOptions[0] : episodeOptions.slice(-1)[0]
      }

      return episodeOptions[nextIdx]
    },
    [episodeOptions]
  )

  // ランダムなエピソードを取得
  const getRandomEpisodePath = useCallback((): Option => {
    const idx = Math.floor(Math.random() * episodeOptions.length)
    return episodeOptions[idx]
  }, [episodeOptions])

  return [episodeOptions, getEpisodePath, getRandomEpisodePath]
}
