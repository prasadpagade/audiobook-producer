'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Layers, 
  Settings,
  Cloud,
  Code
} from 'lucide-react'

const features = [
  {
    icon: Layers,
    title: 'Formatting-Aware',
    description: 'Preserves structure and paragraphs intelligently, maintaining the flow of your narrative.'
  },
  {
    icon: Settings,
    title: 'Voice-Flexible',
    description: 'Works with configurable TTS providers including ElevenLabs, Inworld, and more.'
  },
  {
    icon: Shield,
    title: 'Fail-Safe Merging',
    description: 'Handles large text sources without hitting token or API limits. Rock solid reliability.'
  },
  {
    icon: Zap,
    title: 'Zero Setup Friction',
    description: 'One command — python src/main.py — runs the full production pipeline instantly.'
  },
  {
    icon: Cloud,
    title: 'Modular Architecture',
    description: 'Each stage is independently testable: chunker, cleaner, TTS, and audio merger.'
  },
  {
    icon: Code,
    title: 'Production Ready',
    description: 'Clean, documented code following best practices. Easy to extend and customize.'
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Built for </span>
            <span className="text-gradient">Scale</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Enterprise-grade features designed for reliability and performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
