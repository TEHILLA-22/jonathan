'use client'

export default function Footer() {
  return (
    <footer className="py-8 bg-black/30 backdrop-blur-sm flex flex-col items-center text-white">
      <p className="text-center text-white/80 max-w-xs px-4 mb-2">
        Without Luna, this website would not have been possible. 💻✨
      </p>
      <p className="text-center text-white/50 text-sm px-4">
        &copy; {new Date().getFullYear()} – Made with 💖 by Tehilla
      </p>
    </footer>
  )
}
