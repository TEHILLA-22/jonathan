'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { heroImages } from './heroImages'

type TrailItem = {
  id: number
  text: string
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [trail, setTrail] = useState<TrailItem[]>([])
  const [idCounter, setIdCounter] = useState(0)

  // auto slide
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  // update trail on slide change
  useEffect(() => {
    setTrail((prev) => {
      const next = [
        ...prev,
        { id: idCounter, text: heroImages[index].text }
      ].slice(-3) // keep only last 3

      return next
    })
    setIdCounter((c) => c + 1)
  }, [index])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Image layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.02, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[index].src}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Memory trail */}
      <div className="absolute bottom-12 left-12 space-y-2">
        <AnimatePresence>
          {trail.map((item, i) => (
            <motion.p
              key={item.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{
                opacity: 1 - i * 0.25,
                y: i * 6
              }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.6 }}
              className="
                text-sm tracking-wide
                text-cyan-300/80
                select-none
              "
            >
              {item.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {/* Constellation navigation */}
      <div className="absolute bottom-10 right-12 flex gap-4">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="relative"
          >
            <span
              className={`
                block h-3 w-3 rotate-45
                border border-cyan-400/50
                transition
                ${i === index
                  ? 'animate-pulse border-cyan-300'
                  : 'opacity-40'}
              `}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
