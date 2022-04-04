import { useCallback, useEffect, useState } from 'react'

import { API_BASE_URL } from '../data/constants'

import { Option } from '../types/option'
import { Episode } from '../types/radio'

import { fetchTimeout } from './util'

type RadioEpisodeType = [
  epsodes: Episode[],
  episodeOptions: Option[],
  getEpisodePath: (value: string, add: number) => Option,
  getRandomEpisodePath: () => Option
]

export const useRadioEpisode = (radioId: string): RadioEpisodeType => {
  const [episodes, setEpisodes] = useState([] as Episode[])
  const [options, setOptions] = useState([] as Option[])

  useEffect(() => {
    if (radioId === '') return

    const func = async () => {
      const res = await fetchTimeout(
        API_BASE_URL + `json/${radioId}.json`
      ).catch(() => {
        window.api.errorDialog(
          'エピソード一覧が取得できませんでした',
          '時間をおいてから再度起動し直してください'
        )
      })

      if (!res) return

      const episodes: Episode[] = await res.json()

      setEpisodes(episodes)
      setOptions(
        episodes.map(
          (e): Option => ({
            label: `#${e.number} : ${e.title}`,
            value: e.source
          })
        )
      )
    }

    func()
  }, [radioId])

  // 現在のエピソード前後のエピソードを取得
  const getEpisodePath = useCallback(
    (value: string, add: number): Option => {
      const idx = options.findIndex((opt) => opt.value === value)
      const nextIdx = idx + add

      // 添字が範囲外
      if (nextIdx < 0 || nextIdx >= options.length) {
        // 加算数が正なら末尾、負なら先頭の要素を返す
        return add > 0 ? options[0] : options.slice(-1)[0]
      }

      return options[nextIdx]
    },
    [options]
  )

  // ランダムなエピソードを取得
  const getRandomEpisodePath = useCallback((): Option => {
    const idx = Math.floor(Math.random() * options.length)
    return options[idx]
  }, [options])

  return [episodes, options, getEpisodePath, getRandomEpisodePath]
}
