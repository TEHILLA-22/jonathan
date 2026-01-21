'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import WishCard from './WishCard'

type Wish = {
  id: number
  name: string
  message: string
  created_at: string
}

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface Props {
  entryGateName: string
}

export default function Guestbook({ entryGateName }: Props) {
  const [message, setMessage] = useState('')
  const [wishes, setWishes] = useState<Wish[]>([])

  // Fetch initial wishes
  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (!error && data) {
      setWishes(data)
    }
  }

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null

    const init = async () => {
      await fetchWishes()

      channel = supabase
        .channel('public:wishes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'wishes',
          },
          (payload) => {
            const newWish = payload.new as Wish

            setWishes((prev) => {
              // prevent duplicate optimistic inserts
              if (prev.some((w) => w.id === newWish.id)) {
                return prev
              }
              return [newWish, ...prev]
            })
          }
        )
        .subscribe()
    }

    init()

    // ✅ MUST be synchronous (no Promise returned)
    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  // Submit new wish (optimistic UI)
  const submitWish = async () => {
    if (!message.trim()) return

    const optimisticWish: Wish = {
      id: Date.now(), // temporary
      name: entryGateName,
      message,
      created_at: new Date().toISOString(),
    }

    // Show instantly
    setWishes((prev) => [optimisticWish, ...prev])
    setMessage('')

    // Persist to DB
    await supabase.from('wishes').insert({
      name: entryGateName,
      message,
    })
  }

  return (
    <motion.section
      className="relative z-10 flex flex-col items-center my-16 px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-semibold text-cyan-300/80">
          Guestbook – Leave a Wish for Jonathan
        </h2>

        {/* Input */}
        <div className="mt-6 flex flex-col gap-3">
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full rounded-lg px-4 py-2 bg-black/30 border border-white/10 text-white outline-none focus:ring-1 focus:ring-cyan-400/40"
          />

          <button
            onClick={submitWish}
            className="mt-2 w-full rounded-lg py-2 bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-500/20 transition"
          >
            Submit Wish
          </button>
        </div>

        {/* Wishes */}
        <div className="mt-6 flex flex-col gap-3">
          <AnimatePresence>
            {wishes.map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
                entryGateName={entryGateName}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
