export default function BluePulse() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="absolute top-1/3 left-1/2
                   h-[600px] w-[600px]
                   -translate-x-1/2 rounded-full
                   bg-blue-600/40 blur-3xl"
        style={{ animation: 'bluePulse 12s ease-in-out infinite' }}
      />
    </div>
  )
}
