'use client'

import { motion } from 'framer-motion'
import { Github, BookOpen, Rocket, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Ready to Transform </span>
            <br />
            <span className="text-gradient">Your Text to Audio?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Get started with Audiobook Producer and experience the future of audio content creation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a 
              href="https://github.com/prasadpagade/audiobook-producer"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full font-semibold text-white text-lg shadow-xl hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-white text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Read Documentation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="text-4xl font-bold text-gradient mb-2">3</div>
              <div className="text-slate-300 font-medium">Simple Steps</div>
              <div className="text-slate-500 text-sm mt-1">From text to audio</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="text-4xl font-bold text-gradient mb-2">0</div>
              <div className="text-slate-300 font-medium">Manual Editing</div>
              <div className="text-slate-500 text-sm mt-1">Fully automated</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="text-4xl font-bold text-gradient mb-2">100%</div>
              <div className="text-slate-300 font-medium">Production Ready</div>
              <div className="text-slate-500 text-sm mt-1">Publication quality</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
