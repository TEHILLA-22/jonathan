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

  // Two audio refs
  const track1Ref = useRef<HTMLAudioElement | null>(null)
  const track2Ref = useRef<HTMLAudioElement | null>(null)

  const enableAudio = () => {
    if (track1Ref.current) {
      track1Ref.current.muted = false
      track1Ref.current.volume = 0.4
      track1Ref.current.play().catch(() => {})
    }
    if (track2Ref.current) {
      track2Ref.current.muted = false
      track2Ref.current.volume = 0.4
      track2Ref.current.play().catch(() => {})
    }
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
      <audio ref={track1Ref} src="/audio/track1.mp3" loop muted />
      <audio ref={track2Ref} src="/audio/track2.mp3" loop muted />

      {/* Audio toggle */}
      <AudioToggle audioRefs={[track1Ref, track2Ref]} />

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
      <AssistantSpeech lunaImgSrc="/images/luna.JPG" />

      <Guestbook entryGateName={name} />

      <GallerySection />

      <BuyMeACoffee />

      <Footer />
    </>
  )
}
