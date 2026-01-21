'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import ReactionMenu from './ReactionMenu'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

type Props = {
  reply: any
}

export default function ReplyCard({ reply }: Props) {
  const [reactions, setReactions] = useState<any[]>([])
  const [reactionMenuOpen, setReactionMenuOpen] = useState(false)

  // Fetch reactions for this reply
  const fetchReactions = async () => {
    const { data } = await supabase
      .from('wish_reactions')
      .select('*')
      .eq('reply_id', reply.id)
    if (data) setReactions(data)
  }

  useEffect(() => {
    fetchReactions()

    // Subscribe to new reactions for this reply
    const sub = supabase
      .channel(`public:wish_reactions_reply_${reply.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'wish_reactions',
          filter: `reply_id=eq.${reply.id}`,
        },
        (payload) => {
          setReactions((prev) => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => supabase.removeChannel(sub)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.4 }}
      className="bg-black/10 border border-white/20 rounded-lg p-3 ml-4 text-left text-white flex flex-col gap-1"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="font-semibold text-cyan-300">{reply.name}:</span> {reply.message}
        </div>
        <button
          onClick={() => setReactionMenuOpen(!reactionMenuOpen)}
          className="text-xs text-cyan-400 hover:text-cyan-200"
        >
          😊
        </button>
      </div>

      {/* Reaction menu */}
      {reactionMenuOpen && <ReactionMenu replyId={reply.id} />}

      {/* Display reaction counts */}
      {reactions.length > 0 && (
        <div className="flex gap-1 mt-1">
          {reactions.map((r) => (
            <span key={r.id} className="text-sm animate-pulse">
              {r.type === 'love'
                ? '❤️'
                : r.type === 'thumb'
                ? '👍'
                : r.type === 'laugh'
                ? '😆'
                : r.type === 'sad'
                ? '😢'
                : '😮'}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
