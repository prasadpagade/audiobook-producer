'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Volume2, Download } from 'lucide-react'
import { useState } from 'react'

const audioSamples = [
  {
    title: 'Fiction Sample',
    description: 'Dramatic narration with emotional depth',
    genre: 'Fiction',
    duration: '2:34',
    waveformColor: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Non-Fiction Sample',
    description: 'Clear, professional tone for educational content',
    genre: 'Non-Fiction',
    duration: '1:58',
    waveformColor: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Thriller Sample',
    description: 'Suspenseful pacing with dynamic range',
    genre: 'Thriller',
    duration: '3:12',
    waveformColor: 'from-rose-500 to-orange-500'
  }
]

export default function AudioShowcase() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-slate-800 relative overflow-hidden">
      {/* Background elements */}
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
            <span className="text-white">Experience the </span>
            <span className="text-gradient">Result</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Real audiobook samples generated automatically by Audiobook Producer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audioSamples.map((sample, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10">
                {/* Genre tag */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-xs font-medium">
                    {sample.genre}
                  </span>
                </div>

                {/* Waveform visualization */}
                <div className="relative h-32 mb-6 bg-slate-900/50 rounded-xl p-4 overflow-hidden">
                  <div className="flex items-center justify-center h-full gap-1">
                    {[...Array(40)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 bg-gradient-to-t ${sample.waveformColor} rounded-full`}
                        initial={{ height: '20%' }}
                        animate={{
                          height: playingIndex === index 
                            ? `${Math.random() * 80 + 20}%` 
                            : '20%'
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: playingIndex === index ? Infinity : 0,
                          delay: i * 0.02
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Play overlay */}
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
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {sample.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {sample.description}
                </p>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Volume2 className="w-4 h-4" />
                    <span>{sample.duration}</span>
                  </div>
                  <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Each clip was automatically generated from text source, chunked, processed, and merged using InWorld TTS. 
            <span className="text-primary-400 font-medium"> The final output is production-ready audio — no manual editing required.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
