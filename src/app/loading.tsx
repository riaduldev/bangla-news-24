export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl animate-pulse delay-500" />
      </div>

      {/* Loader content */}
      <div className="relative flex flex-col items-center gap-8 px-4">
        {/* Spinner ring with gradient */}
        <div className="relative h-24 w-24 sm:h-32 sm:w-32">
          {/* Outer glow ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-purple-400 border-r-pink-400 [animation-duration:1.5s]" />
          {/* Inner reverse spinner */}
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-b-blue-400 border-l-cyan-400 [animation-duration:2s] [animation-direction:reverse]" />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-ping rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold tracking-wide text-white/90 sm:text-2xl">
            Loading
          </h2>
          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
          </div>
          <p className="mt-2 text-sm text-white/50">Please wait a moment...</p>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400" />
        </div>
      </div>

      {/* Custom keyframes via style tag */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}