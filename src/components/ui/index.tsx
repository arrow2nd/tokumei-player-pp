import React, { useCallback, useEffect, useState } from 'react'

import { useAudio } from '../../hooks/useAudio'
import { useRadioEpisode } from '../../hooks/useRadioEpisode'
import { useRadioList } from '../../hooks/useRadioList'

import { Option } from '../../types/option'

import Control from './control'
import RadioSelect from './radioSelect'
import Seekbar from './seekbar'

const UI = (): JSX.Element => {
  const [currentRadio, setCurrentRadio] = useState({} as Option)
  const [currentEpisode, setCurrentEpisode] = useState({} as Option)
  const [isShuffle, setIsShuffle] = useState(false)

  const radioOptions = useRadioList()
  if (radioOptions.length > 0 && !currentRadio.label && !currentRadio.value) {
    setCurrentRadio(radioOptions[0].options[0])
  }

  const [episodeOptions, getEpisodePath, getRandomEpisodePath] =
    useRadioEpisode(currentRadio.value || '')

  const [
    isPlaying,
    currentSrc,
    currentSec,
    durationSec,
    play,
    pause,
    resume,
    handleSeek,
    setEndedFunc
  ] = useAudio()

  // 再生
  const playEpisode = useCallback(
    ({ label, value }: Option) => {
      document.title = label // タイトルにエピソード名を設定
      play(value)
    },
    [play]
  )

  // 自動再生
  useEffect(() => {
    setEndedFunc(() => {
      // シャッフル再生が有効ならランダムで取得
      const nextEpisode = isShuffle
        ? getRandomEpisodePath()
        : getEpisodePath(currentEpisode.value, 1)

      // カレントに設定して再生
      setCurrentEpisode(nextEpisode)
      playEpisode(nextEpisode)
    })
  }, [
    currentEpisode.value,
    getEpisodePath,
    getRandomEpisodePath,
    isShuffle,
    playEpisode,
    setEndedFunc
  ])

  // ラジオ名が変更された
  const handlChangeRadio = useCallback((current: Option) => {
    setCurrentRadio(current)
  }, [])

  // エピソードが変更された
  const handleChangeEpisode = useCallback((current: Option) => {
    setCurrentEpisode(current)
  }, [])

  // 再生コントロール
  const handleClickPlay = useCallback(() => {
    if (!currentSrc.includes(currentEpisode.value)) {
      // 再生
      playEpisode(currentEpisode)
    } else if (isPlaying) {
      // 一時停止
      pause()
    } else {
      // 再開
      resume()
    }
  }, [currentEpisode, currentSrc, isPlaying, pause, playEpisode, resume])

  // 前のエピソード
  const handleClickPrev = useCallback(() => {
    setCurrentEpisode(getEpisodePath(currentEpisode.value, -1))
  }, [currentEpisode.value, getEpisodePath])

  // 次のエピソード
  const handleClickNext = useCallback(() => {
    setCurrentEpisode(getEpisodePath(currentEpisode.value, 1))
  }, [currentEpisode.value, getEpisodePath])

  // シャッフル切り替え
  const handleChangeShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
  }, [])

  // ブラウザを開いて記事を検索
  const handleClickOpen = useCallback(async () => {
    // ラベル内のエピソード番号を削除
    const episodeTitle = currentEpisode.label.replace(/^#\d+\s:\s/, '')
    const keyword = `${currentRadio.label} ${episodeTitle}`

    // ダイアログを開く
    const isOpenWebSite = await window.api.infoDialog(
      'ブラウザを開きますか？',
      `「${keyword}」の記事を検索します。`
    )

    // ブラウザを起動
    if (isOpenWebSite) {
      window.api.openWebSite(keyword)
    }
  }, [currentEpisode.label, currentRadio.label])

  return (
    <>
      <RadioSelect
        radioOptions={radioOptions}
        episodeOptions={episodeOptions}
        disabled={isPlaying}
        currentEpisode={currentEpisode.value}
        onChangeRadio={handlChangeRadio}
        onChangeEpisode={handleChangeEpisode}
      />
      <Seekbar
        className="mt-2"
        currentSec={currentSec}
        durationSec={durationSec}
        onSeek={handleSeek}
      />
      <Control
        className="mt-2"
        isPlaying={isPlaying}
        isShuffle={isShuffle}
        onClickPlay={handleClickPlay}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
        onClickOpen={handleClickOpen}
        onChangeShuffle={handleChangeShuffle}
      />
    </>
  )
}

export default UI
