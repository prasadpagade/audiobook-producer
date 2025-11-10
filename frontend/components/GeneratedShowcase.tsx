'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Volume2, Download } from 'lucide-react'
import { useState } from 'react'

const emotionStyles: Record<
  string,
  {
    label: string
    tag: string
    gradient: string
    glow: string
  }
> = {
  calm: {
    label: 'Calm',
    tag: 'bg-cyan-500/10 border border-cyan-400/30 text-cyan-200',
    gradient: 'from-cyan-400 to-blue-400',
    glow: 'hover:shadow-cyan-500/10',
  },
  happy: {
    label: 'Happy',
    tag: 'bg-yellow-500/10 border border-yellow-400/30 text-yellow-200',
    gradient: 'from-yellow-400 to-pink-400',
    glow: 'hover:shadow-yellow-500/10',
  },
  sad: {
    label: 'Melancholy',
    tag: 'bg-indigo-500/10 border border-indigo-400/30 text-indigo-200',
    gradient: 'from-indigo-400 to-blue-600',
    glow: 'hover:shadow-indigo-500/10',
  },
  excited: {
    label: 'Excited',
    tag: 'bg-red-500/10 border border-red-400/30 text-red-200',
    gradient: 'from-red-400 to-orange-500',
    glow: 'hover:shadow-red-500/10',
  },
  dramatic: {
    label: 'Dramatic',
    tag: 'bg-purple-500/10 border border-purple-400/30 text-purple-200',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'hover:shadow-purple-500/10',
  },
  suspenseful: {
    label: 'Suspenseful',
    tag: 'bg-amber-500/10 border border-amber-400/30 text-amber-200',
    gradient: 'from-amber-300 to-red-600',
    glow: 'hover:shadow-amber-500/10',
  },
  neutral: {
    label: 'Neutral',
    tag: 'bg-slate-500/10 border border-slate-400/30 text-slate-200',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'hover:shadow-slate-500/10',
  },
  default: {
    label: 'Custom',
    tag: 'bg-primary-500/10 border border-primary-500/20 text-primary-300',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'hover:shadow-primary-500/10',
  },
}

export default function GeneratedShowcase({ generatedAudios }: { generatedAudios: any[] }) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  if (!generatedAudios?.length) return null

  return (
    <section className="py-16 bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Your Emotion-Infused Audio</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Generated in real time using mood-adaptive voice selection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {generatedAudios.map((sample, index) => {
            const style = emotionStyles[sample.emotion] ?? emotionStyles.default

            return (
              <motion.div
              key={sample.id ?? index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:border-slate-600/50 hover:shadow-xl ${style.glow}`}>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${style.tag}`}>
                    {style.label}
                  </span>
                </div>

                <div className="relative h-32 mb-6 bg-slate-900/50 rounded-xl p-4 overflow-hidden">
                  <div className="flex items-center justify-center h-full gap-1">
                    {[...Array(40)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 bg-gradient-to-t ${style.gradient} rounded-full`}
                        initial={{ height: '20%' }}
                        animate={{
                          height: playingIndex === index ? `${Math.random() * 80 + 20}%` : '20%',
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: playingIndex === index ? Infinity : 0,
                          delay: i * 0.02,
                        }}
                      />
                    ))}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setPlayingIndex(playingIndex === index ? null : index)}
                      className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group-hover:scale-110"
                    >
                      {playingIndex === index ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                  </div>
                  {playingIndex === index && (
                    <audio autoPlay src={sample.audio_url} onEnded={() => setPlayingIndex(null)} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {sample.title ?? 'Generated Clip'}
                </h3>
                <p className="text-slate-400 text-sm mb-2">{sample.description}</p>
                {sample.preview && (
                  <p className="text-slate-500 text-xs italic mb-4">“{sample.preview}”</p>
                )}
                {sample.voice && (
                  <p className="text-slate-500 text-xs mb-4">Voice: {sample.voice}</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Volume2 className="w-4 h-4" />
                    <span>{sample.duration ?? '—:––'}</span>
                  </div>
                  <a
                    href={sample.audio_url}
                    download
                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </motion.div>
          )
        })}
        </div>
      </div>
    </section>
  )
}
