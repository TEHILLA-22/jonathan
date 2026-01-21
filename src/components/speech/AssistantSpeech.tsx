'use client'

import { motion } from 'framer-motion'

type Props = {
  lunaImgSrc: string
}

export default function AssistantSpeech({ lunaImgSrc }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 flex flex-col md:flex-row items-center justify-center my-16 px-4 gap-6"
    >
      <img
        src={lunaImgSrc}
        alt="Luna"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border border-white/10 shadow-md"
      />

      <div className="max-w-2xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-semibold text-cyan-300/80">
          From the Assistant Course Rep
        </h2>
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
          “Hey Jonathan, even though we sometimes clash, I want to say your leadership 
          genuinely motivates the department. Keep shining, and don’t forget we’re cheering for you!”
        </p>
      </div>
    </motion.section>
  )
}
