import React, { useCallback, useEffect, useState } from 'react'
import Seekbar from './seekbar'
import Control from './control'
import RadioSelect from './radioSelect'
import { useRadioList } from '../../hooks/useRadioList'
import { useRadioEpisode } from '../../hooks/useRadioEpisode'
import { useAudio } from '../../hooks/useAudio'

const UI = (): JSX.Element => {
  const [radioId, setRadioId] = useState('')
  const [radioName, setRadioName] = useState('')
  const [radioPath, setRadioPath] = useState('')
  const [isShuffle, setIsShuffle] = useState(false)

  const radioOptions = useRadioList()
  if (radioOptions.length > 0 && radioId === '' && radioName === '') {
    setRadioId(radioOptions[0].options[0].value)
    setRadioName(radioOptions[0].options[0].label)
  }

  const [episodeOptions, getEpisodePath, getRandomEpisodePath] =
    useRadioEpisode(radioId)

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

  // 自動再生
  useEffect(() => {
    setEndedFunc(() => {
      const path = isShuffle
        ? getRandomEpisodePath()
        : getEpisodePath(radioPath, 1)

      setRadioPath(path)
      play(path)
    })
  }, [
    getEpisodePath,
    getRandomEpisodePath,
    isShuffle,
    play,
    radioPath,
    setEndedFunc
  ])

  // ラジオ名が変更された
  const handlChangeRadio = useCallback((id: string, name: string) => {
    setRadioId(id)
    setRadioName(name)
  }, [])

  // エピソードが変更された
  const handleChangeEpisode = useCallback((path: string) => {
    setRadioPath(path)
  }, [])

  // 再生コントロール
  const handleClickPlay = useCallback(() => {
    switch (true) {
      // 再生
      case !currentSrc.includes(radioPath): {
        play(radioPath)
        break
      }
      // 一時停止
      case isPlaying: {
        pause()
        break
      }
      // 再開
      default: {
        resume()
      }
    }
  }, [currentSrc, isPlaying, pause, play, radioPath, resume])

  // 前のエピソード
  const handleClickPrev = useCallback(() => {
    setRadioPath(getEpisodePath(radioPath, -1))
  }, [getEpisodePath, radioPath])

  // 次のエピソード
  const handleClickNext = useCallback(() => {
    setRadioPath(getEpisodePath(radioPath, 1))
  }, [getEpisodePath, radioPath])

  // シャッフル切り替え
  const handleChangeShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
  }, [])

  // ブラウザを開く
  const handleClickOpen = useCallback(async () => {
    const isOpenWebSite = await window.api.infoDialog(
      'ブラウザを開きますか？',
      `オモコロで「${radioName}」の記事を検索します。`
    )

    if (isOpenWebSite) {
      window.api.openWebSite(radioName)
    }
  }, [radioName])

  return (
    <>
      <RadioSelect
        radioOptions={radioOptions}
        episodeOptions={episodeOptions}
        disabled={isPlaying}
        currentEpisode={radioPath}
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
