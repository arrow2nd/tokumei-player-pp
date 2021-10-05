import React, { useCallback, useState } from 'react'
import Seekbar from './seekbar'
import Control from './control'
import RadioSelect from './radioSelect'
import { useRadioList } from '../../hooks/useRadioList'
import { useRadioEpisode } from '../../hooks/useRadioEpisode'
import { useAudio } from '../../hooks/useAudio'

const UI = (): JSX.Element => {
  const [radioName, setRadioName] = useState('')
  const [radioPath, setRadioPath] = useState('')
  const [durationSec, setDurationSec] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)

  const [
    isPlaying,
    currentSec,
    currentSrc,
    play,
    pause,
    resume,
    handleSeek,
    setEndedFunc
  ] = useAudio()

  // 選択肢
  const radioOptions = useRadioList()
  const episodeOptions = useRadioEpisode(radioName)

  if (radioOptions.length > 0 && radioName === '') {
    setRadioName(radioOptions[0].options[0].label)
  }

  // ラジオ名が変更された
  const handlChangeRadio = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setRadioName(e.currentTarget.value),
    []
  )

  // エピソードが変更された
  const handleChangeEpisode = useCallback(
    (path: string) => setRadioPath(path),
    []
  )

  // 再生コントロール
  const handleClickPlay = useCallback(() => {
    switch (true) {
      // 再生
      case !currentSrc.includes(radioPath): {
        play(radioPath).then((sec) => setDurationSec(sec))
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

  // シャッフル切り替え
  const handleChangeShuffle = useCallback(
    () => setIsShuffle((prev) => !prev),
    []
  )

  return (
    <>
      <RadioSelect
        radioOptions={radioOptions}
        episodeOptions={episodeOptions}
        disabled={isPlaying}
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
        onChangeShuffle={handleChangeShuffle}
      />
    </>
  )
}

export default UI
