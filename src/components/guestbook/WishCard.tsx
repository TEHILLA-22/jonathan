'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import ReplyCard from './ReplyCard'
import ReactionMenu from './ReactionMenu'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface Props {
  wish: any
  entryGateName: string
}

export default function WishCard({ wish, entryGateName }: Props) {
  const [replies, setReplies] = useState<any[]>([])
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyMsg, setReplyMsg] = useState('')
  const [reactionMenuOpen, setReactionMenuOpen] = useState(false)

  const fetchReplies = async () => {
    const { data } = await supabase
      .from('wish_replies')
      .select('*')
      .eq('wish_id', wish.id)
      .order('created_at', { ascending: true })

    if (data) setReplies(data)
  }

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null

    const init = async () => {
      await fetchReplies()

      channel = supabase
        .channel(`public:wish_replies_${wish.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'wish_replies',
            filter: `wish_id=eq.${wish.id}`,
          },
          (payload) => {
            const newReply = payload.new

            setReplies((prev) => {
              // prevent duplicate optimistic insert
              if (prev.some((r) => r.created_at === newReply.created_at)) {
                return prev
              }
              return [...prev, newReply]
            })
          }
        )
        .subscribe()
    }

    init()

    // ✅ synchronous cleanup ONLY
    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [wish.id])

  const submitReply = async () => {
    if (!replyMsg.trim()) return

    const optimisticReply = {
      id: Date.now(),
      wish_id: wish.id,
      name: entryGateName,
      message: replyMsg,
      created_at: new Date().toISOString(),
    }

    setReplies((prev) => [...prev, optimisticReply])
    setReplyMsg('')
    setShowReplyInput(false)

    await supabase.from('wish_replies').insert({
      wish_id: wish.id,
      name: entryGateName,
      message: replyMsg,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="bg-black/20 border border-white/10 rounded-lg p-4 text-left text-white"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="font-semibold text-cyan-300">
            {wish.name}:
          </span>{' '}
          {wish.message}
        </div>

        <button
          onClick={() => setReactionMenuOpen(!reactionMenuOpen)}
          className="text-sm text-cyan-400 hover:text-cyan-200"
        >
          😊
        </button>
      </div>

      {reactionMenuOpen && <ReactionMenu wishId={wish.id} />}

      {/* Replies */}
      <div className="mt-2 flex flex-col gap-2">
        {replies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>

      {/* Reply input */}
      {showReplyInput ? (
        <div className="mt-2 flex gap-2 flex-wrap">
          <input
            type="text"
            value={replyMsg}
            onChange={(e) => setReplyMsg(e.target.value)}
            className="flex-1 min-w-0 rounded-lg px-2 py-1 bg-black/30 border border-white/10 text-white outline-none"
            placeholder="Reply..."
          />
          <button
            onClick={submitReply}
            className="px-3 rounded-lg bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20 flex-shrink-0"
          >
            Send
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowReplyInput(true)}
          className="mt-2 text-xs text-cyan-400 hover:text-cyan-200"
        >
          Reply
        </button>
      )}
    </motion.div>
  )
}
