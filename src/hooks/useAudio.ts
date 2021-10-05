import { useCallback, useEffect, useState } from 'react'

type AudioType = [
  isPlaying: boolean,
  currentSrc: string,
  currentSec: number,
  durationSec: number,
  play: (src: string) => void,
  pause: () => void,
  resume: () => void,
  setCurrentSec: (time: number) => void,
  setEndedFunc: (callBack: () => void) => void
]

export const useAudio = (): AudioType => {
  const [audioElm] = useState(new Audio())
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSec, setCurrentSec] = useState(0)
  const [durationSec, setDurationSec] = useState(0)

  useEffect(() => {
    const updatePlayingState = () => setIsPlaying(!audioElm.paused)
    const updateSec = () => setCurrentSec(audioElm.currentTime)

    audioElm.addEventListener('play', updatePlayingState)
    audioElm.addEventListener('pause', updatePlayingState)
    audioElm.addEventListener('timeupdate', updateSec)

    audioElm.onerror = () => {
      audioElm.pause()
      window.api.errorDialog(
        '再生に失敗しました',
        '存在しない、または非公開になった可能性があります。'
      )
    }

    return () => {
      audioElm.removeEventListener('play', updatePlayingState)
      audioElm.removeEventListener('pause', updatePlayingState)
      audioElm.removeEventListener('timeupdate', updateSec)
    }
  }, [audioElm])

  // 再生コントロール
  const play = useCallback(
    async (path: string) => {
      audioElm.src = `https://omocoro.heteml.net/radio/${path}`
      await audioElm.play()

      setDurationSec(audioElm.duration)
    },
    [audioElm]
  )

  const pause = useCallback(() => audioElm.pause(), [audioElm])

  const resume = useCallback(() => audioElm.play(), [audioElm])

  // セッター
  const setCurrentTime = useCallback(
    (sec: number) => (audioElm.currentTime = sec),
    [audioElm]
  )

  const setEndedFunc = useCallback(
    (callBack: () => void) => (audioElm.onended = callBack),
    [audioElm]
  )

  return [
    isPlaying,
    audioElm.src,
    currentSec,
    durationSec,
    play,
    pause,
    resume,
    setCurrentTime,
    setEndedFunc
  ]
}
