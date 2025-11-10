"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white p-6 relative overflow-hidden">
      {/* Animated floating glow orbs */}
      <div className="absolute w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl top-[-200px] left-[-300px] animate-pulse" />
      <div className="absolute w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-3xl bottom-[-300px] right-[-200px] animate-pulse delay-700" />

      {/* Main content */}
      <div className="z-10 max-w-3xl">
        <span className="inline-block text-sm font-medium bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 mb-5 tracking-wide">
          ⚡ AI-Powered Audio Production
        </span>

        {/* Animated gradient headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text">
          From Text <br /> To Audio Automatically
        </h1>

        <p className="text-gray-300 mt-6 text-lg">
          Transform your manuscripts into polished, lifelike audiobooks in just
          three effortless steps. No manual editing required.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-5">
          <Link
            href="/demo"
            className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-8 py-3 rounded-full transition-transform duration-200 hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.7)]"
          >
            🎧 Try Demo
          </Link>

          <a
            href="https://audiobook-producer-ui.vercel.app/"
            target="_blank"
            className="relative bg-white/10 text-gray-100 border border-white/20 px-8 py-3 rounded-full hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-200 hover:scale-105"
          >
            ▶ Watch Demo
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Audiobook Producer — Demo Mode
      </div>

      {/* Text gradient animation */}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-text {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
      `}</style>
    </main>
  );
}
