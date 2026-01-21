'use client'

import { motion } from 'framer-motion'

export default function DepartmentSpeech() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 flex justify-center my-16 px-4"
    >
      <div className="max-w-3xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-semibold text-cyan-300/80">
          Message from the Cybersecurity Department
        </h2>
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
          “On behalf of the 100 Level Cybersecurity Department, we celebrate Jonathan today. 
          Your dedication and leadership as Course Representative inspire us all. Wishing you 
          continued success and memorable moments this year.”
        </p>
      </div>
    </motion.section>
  )
}
