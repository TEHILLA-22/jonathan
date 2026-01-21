'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const galleryImages = [
  '/gallery1.jpg',
  '/gallery2.jpg',
  '/gallery3.jpg',
  '/images/jonathan/2.jpg',
  '/images/jonathan/1.jpg',
  '/images/jonathan/3.jpg',
]

export default function GallerySection() {
  const [images, setImages] = useState<string[]>([])

  // Shuffle function
  const shuffleImages = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5)

  // Shuffle on mount
  useEffect(() => {
    setImages(shuffleImages(galleryImages))
  }, [])

  return (
    <section className="my-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-cyan-300 mb-6 text-center animate-pulse">
        Memories & Vibes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm cursor-pointer shadow-lg shadow-cyan-500/10 relative"
            whileHover={{ scale: 1.08, rotate: [-1, 0, 1], zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6, type: 'spring' }}
          >
            <img
              src={img}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-64 object-cover rounded-2xl border border-white/20"
            />
            {/* Lively overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: idx * 0.15 }}
            />
            <div className="absolute bottom-2 w-full text-center text-white text-sm font-semibold">
              Throwback {idx + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
