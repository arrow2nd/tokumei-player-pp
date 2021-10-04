import React, { useCallback, useState } from 'react'
import Seekbar from '../seekbar'
import Buttons from '../buttons'
import RadioSelect from '../radioSelect'
import { useRadioList } from '../../hooks/useRadioList'
import { useRadioEpisode } from '../../hooks/useRadioEpisode'
// import { useAudio } from '../../hooks/useAudio'

const UI = (): JSX.Element => {
  const [radioName, setRadioName] = useState('')

  // const [
  //   isPlaying,
  //   currentTime,
  //   currentSrc,
  //   play,
  //   handlePause,
  //   handleResume,
  //   handleSeek,
  //   setEndedFunc
  // ] = useAudio()

  const radioOptions = useRadioList()
  if (radioOptions.length > 0 && radioName === '') {
    setRadioName(radioOptions[0].options[0].label)
  }

  const episodeOptions = useRadioEpisode(radioName)

  // ラジオ名が変更された
  const handlChangeRadio = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setRadioName(e.currentTarget.value),
    []
  )

  return (
    <>
      <RadioSelect
        radioOptions={radioOptions}
        episodeOptions={episodeOptions}
        onChangeRadio={handlChangeRadio}
      />
      <Seekbar className="mt-2" currentSec={0} durationSec={3600} />
      <Buttons className="mt-2" />
    </>
  )
}

export default UI
