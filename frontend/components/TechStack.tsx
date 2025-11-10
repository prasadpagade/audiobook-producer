'use client'

import { motion } from 'framer-motion'

const technologies = [
  { name: 'Python 3.10+', category: 'Core' },
  { name: 'LangChain', category: 'AI Framework' },
  { name: 'ElevenLabs', category: 'TTS Engine' },
  { name: 'Inworld AI', category: 'TTS Engine' },
  { name: 'NLTK', category: 'NLP' },
  { name: 'pydub', category: 'Audio Processing' },
  { name: 'FFmpeg', category: 'Media' },
  { name: 'OpenAI', category: 'AI Models' },
]

const modules = [
  { name: 'text_cleaner.py', desc: 'Formatting & cleanup' },
  { name: 'chunker.py', desc: 'Intelligent segmentation' },
  { name: 'tts_inworld.py', desc: 'Voice generation' },
  { name: 'merge_audio.py', desc: 'Seamless merging' },
]

export default function TechStack() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">Technical Architecture</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Built with industry-leading technologies and modular design patterns
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-primary-500/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-sm text-primary-400 font-medium mb-1">
                    {tech.category}
                  </div>
                  <div className="text-white font-semibold group-hover:text-gradient transition-all duration-300">
                    {tech.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Modular Components */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Modular Pipeline</h3>
            <div className="space-y-4">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5 hover:border-accent-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <code className="text-accent-400 font-mono text-sm font-semibold">
                        {module.name}
                      </code>
                      <p className="text-slate-400 text-sm mt-1">{module.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                      <span className="text-accent-400 text-lg">→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Pipeline Flow</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {['TXT Input', 'Clean Text', 'Chunker', 'TTS Engine', 'Audio Merge', 'Final MP3'].map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="px-6 py-3 bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-xl text-white font-mono text-sm whitespace-nowrap">
                  {step}
                </div>
                {index < 5 && (
                  <div className="hidden md:block text-primary-400 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
