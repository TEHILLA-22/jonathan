'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { motion } from 'framer-motion'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const emojis = [
  { type: 'love', symbol: '❤️' },
  { type: 'thumb', symbol: '👍' },
  { type: 'laugh', symbol: '😆' },
  { type: 'sad', symbol: '😢' },
  { type: 'wow', symbol: '😮' },
]

type Props = {
  wishId?: number
  replyId?: number
}

export default function ReactionMenu({ wishId, replyId }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const sendReaction = async (type: string) => {
    setSelected(type)
    await supabase.from('wish_reactions').insert({
      wish_id: wishId ?? null,
      reply_id: replyId ?? null,
      type,
      name: 'Tehilla', // optionally replace with actual guest name
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="flex gap-2 mt-1 bg-black/40 backdrop-blur-sm p-2 rounded-full"
    >
      {emojis.map((emoji) => (
        <motion.button
          key={emoji.type}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1.1 }}
          onClick={() => sendReaction(emoji.type)}
          className={`text-lg ${selected === emoji.type ? 'animate-pulse' : ''}`}
        >
          {emoji.symbol}
        </motion.button>
      ))}
    </motion.div>
  )
}
