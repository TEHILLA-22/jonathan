'use client'

import { motion } from 'framer-motion'

export default function BuyMeACoffee() {
  const accounts = [
    {
      bank: 'Opay',
      accountName: 'Tehilla Odjoji',
      accountNumber: '9137136447',
    },
  ]

  return (
    <section className="my-16 px-4 max-w-3xl mx-auto text-center">
      {/* Hook / Heartfelt message */}
      <motion.h2
        className="text-2xl font-semibold text-cyan-300 mb-6 animate-pulse"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Loved the vibes? Here's a little way to say thanks!
      </motion.h2>

      <motion.p
        className="text-white/80 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Every bit you contribute helps keep this site alive and makes Jonathan’s birthday extra special. No pressure, any amount counts! 💻✨
      </motion.p>

      {/* Account cards */}
      <div className="flex flex-col gap-4">
        {accounts.map((acc, idx) => (
          <motion.div
            key={idx}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 + 0.5, duration: 0.6 }}
          >
            <p className="text-cyan-300 font-semibold text-lg">{acc.bank}</p>
            <p className="mt-1 text-white/80">{acc.accountName}</p>
            <p className="mt-1 text-white/70 font-mono">{acc.accountNumber}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
