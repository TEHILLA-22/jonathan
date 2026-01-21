'use client'

import { RefObject } from 'react'

// Accept multiple refs
type Props = {
  audioRefs: RefObject<HTMLAudioElement | null>[]
}

export default function AudioToggle({ audioRefs }: Props) {
  const toggleAudio = () => {
    audioRefs.forEach((ref) => {
      if (!ref.current) return
      if (ref.current.paused) ref.current.play()
      else ref.current.pause()
    })
  }

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-4 right-4 bg-cyan-500/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-cyan-500/40 transition"
    >
      🔊 Toggle Music
    </button>
  )
}
