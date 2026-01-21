'use client'

import { motion } from 'framer-motion'
import HeroSlider from './HeroSlider'

type Props = {
  userName: string
}

export default function Hero({ userName }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 min-h-screen flex items-center justify-center text-white"
    >
      {/* Slider in background */}
      <HeroSlider />

      {/* Glass card overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="
          relative rounded-2xl
          bg-white/5 backdrop-blur-sm
          border border-white/10
          px-10 py-8 text-center
        ">
          <p className="text-xs tracking-widest text-cyan-300/70">
            100 LEVEL — CYBERSECURITY
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-wide">
            Jonathan
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Course Representative · Uniport
          </p>

          <p className="mt-2 text-cyan-300/80 text-sm">
            Welcome, {userName}
          </p>

          <p className="mt-6 text-[11px] text-slate-500">
            Built by Tehilla
          </p>
        </div>
      </div>
    </motion.section>
  )
}
