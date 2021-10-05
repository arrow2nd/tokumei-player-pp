import React, { useCallback, useEffect, useState } from 'react'
import Seekbar from './seekbar'
import Control from './control'
import RadioSelect from './radioSelect'
import { useRadioList } from '../../hooks/useRadioList'
import { useRadioEpisode } from '../../hooks/useRadioEpisode'
import { useAudio } from '../../hooks/useAudio'

const UI = (): JSX.Element => {
  const [radioName, setRadioName] = useState('')
  const [radioPath, setRadioPath] = useState('')
  const [isShuffle, setIsShuffle] = useState(false)

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

  const radioOptions = useRadioList()
  if (radioOptions.length > 0 && radioName === '') {
    setRadioName(radioOptions[0].options[0].label)
  }

  const [episodeOptions, getEpisodePath, getRandomEpisodePath] =
    useRadioEpisode(radioName)

  // ラジオ名が変更された
  const handlChangeRadio = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRadioName(e.currentTarget.value)
    },
    []
  )

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
        onChangeShuffle={handleChangeShuffle}
      />
    </>
  )
}

export default UI
