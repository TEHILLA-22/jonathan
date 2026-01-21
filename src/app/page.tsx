'use client'

import { useRef, useState, useEffect } from 'react'
import BluePulse from '@/components/background/BluePulse'
import EntryGate from '@/components/entry/EntryGate'
import AudioToggle from '@/components/audio/AudioToggle'
import Hero from '@/components/hero/Hero'
import DepartmentSpeech from '@/components/speech/DepartmentSpeech'
import AssistantSpeech from '@/components/speech/AssistantSpeech'
import Guestbook from '@/components/guestbook/Guestbook'
import GallerySection from '@/components/GallerySection'
import BuyMeACoffee from '@/components/BuyMeACoffee'
import Footer from '@/components/Footer'

export default function Page() {
  const [entered, setEntered] = useState(false)
  const [name, setName] = useState('')
  const [showHero, setShowHero] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const enableAudio = () => {
    if (!audioRef.current) return
    audioRef.current.muted = false
    audioRef.current.volume = 0.4
    audioRef.current.play().catch(() => {})
  }

  // delay mounting Hero by 3s after entry
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (entered) {
      timer = setTimeout(() => setShowHero(true), 3000)
    }
    return () => clearTimeout(timer)
  }, [entered])

  return (
    <>
      {/* Background pulse */}
      <BluePulse />

      {/* Background audio */}
      <audio
        ref={audioRef}
        src="/audio/track1.mp3"
        loop
        muted
      />

      <AudioToggle audioRef={audioRef} />

      {/* Entry gate */}
      {!entered && (
        <EntryGate
          enableAudio={enableAudio}
          onEnter={(username) => {
            setName(username)
            setEntered(true)
          }}
        />
      )}

      {/* Hero section with depth transition */}
      {showHero && <Hero userName={name} />}

      <DepartmentSpeech />
    <AssistantSpeech lunaImgSrc="/images/luna.jpg" />

    <Guestbook entryGateName={name} />

    <GallerySection />

<BuyMeACoffee />

      <Footer />
    </>
  )
}
