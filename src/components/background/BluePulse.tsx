export default function BluePulse() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute top-1/4 left-1/2 h-[600px] w-[600px]
                   -translate-x-1/2 rounded-full
                   bg-blue-600/40 blur-3xl"
        style={{ animation: 'bluePulse 12s ease-in-out infinite' }}
      />
    </div>
  )
}
