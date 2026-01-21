'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Props = {
  onEnter: (name: string) => void
  enableAudio: () => void
}

export default function EntryGate({ onEnter, enableAudio }: Props) {
  const [name, setName] = useState('')
  const [exiting, setExiting] = useState(false)
  const [granted, setGranted] = useState(false)

  const handleEnter = () => {
    if (!name.trim() || exiting) return

    // unlock audio (browser gesture)
    enableAudio()

    // show "Access granted"
    setGranted(true)

    // short pause for psychological impact
    setTimeout(() => {
      setExiting(true)

      // allow collapse animation to finish
      setTimeout(() => {
        onEnter(name.trim())
      }, 450)
    }, 150)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          {/* Glass Card */}
          <motion.div
            initial={{ scaleY: 1, opacity: 1 }}
            animate={exiting ? { scaleY: 0, opacity: 0 } : {}}
            transition={{
              duration: 0.45,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ originY: 0.5 }}
            className="
              relative w-[90%] max-w-md
              rounded-2xl
              bg-white/5 backdrop-blur-sm
              border border-white/10
              p-8 text-white
            "
          >
            {/* subtle edge glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-cyan-400/20" />

            <h1 className="text-xl font-semibold tracking-wide">
              Welcome
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Enter your name to continue
            </p>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              disabled={granted}
              className="
                mt-6 w-full rounded-lg px-4 py-3
                bg-black/40
                border border-white/10
                outline-none
                focus:border-cyan-400/50
                focus:ring-1 focus:ring-cyan-400/30
                transition
                disabled:opacity-50
              "
            />

            <button
              onClick={handleEnter}
              disabled={granted}
              className="
                mt-6 w-full rounded-lg py-3
                text-sm font-medium
                bg-cyan-500/10 text-cyan-300
                border border-cyan-400/20
                hover:bg-cyan-500/20
                transition
                disabled:opacity-70
              "
            >
              {granted ? 'Access granted' : 'Enter'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
