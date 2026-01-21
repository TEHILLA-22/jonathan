'use client'

import { useState, useRef, useEffect } from 'react'

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>
}

export default function AudioToggle({ audioRef }: Props) {
  const [muted, setMuted] = useState(true)

  const toggle = () => {
    if (!audioRef.current) return
    if (muted) {
      audioRef.current.muted = false
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.muted = true
    }
    setMuted(!muted)
  }

  return (
    <button
      onClick={toggle}
      className={`
        fixed bottom-6 right-6
        z-50
        bg-white/5 backdrop-blur-sm
        border border-white/10
        px-4 py-2 rounded-full
        text-sm text-cyan-300
        hover:bg-cyan-500/20 transition
      `}
    >
      {muted ? 'Unmute 🔊' : 'Mute 🔇'}
    </button>
  )
}
