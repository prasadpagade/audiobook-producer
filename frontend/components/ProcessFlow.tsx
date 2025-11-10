'use client'

import { motion } from 'framer-motion'
import { FileText, Scissors, Mic, Music, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Clean & Prepare',
    description: 'Smartly cleans your source .txt, removes artifacts, trims whitespace, and prepares it for voice synthesis.',
    color: 'from-blue-500 to-cyan-500',
    details: ['Text formatting', 'Artifact removal', 'Intelligent preprocessing']
  },
  {
    icon: Scissors,
    title: 'Chunk & Generate',
    description: 'Splits the book into optimized segments and sends each to the TTS engine for natural-sounding narration.',
    color: 'from-purple-500 to-pink-500',
    details: ['Smart segmentation', 'TTS processing', 'Voice synthesis']
  },
  {
    icon: Music,
    title: 'Merge & Polish',
    description: 'Automatically stitches all audio parts back together into one continuous, high-quality .mp3',
    color: 'from-pink-500 to-rose-500',
    details: ['Seamless merging', 'Quality optimization', 'Production-ready output']
  }
]

export default function ProcessFlow() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
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
            <span className="text-gradient">Three Simple Steps</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Our intelligent pipeline handles everything from raw text to production-ready audio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector arrow - desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                  <ArrowRight className="w-6 h-6 text-primary-400" />
                </div>
              )}

              <div className="relative h-full group">
                {/* Card */}
                <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-4 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-full backdrop-blur-sm">
            <Mic className="w-5 h-5 text-primary-400" />
            <span className="text-slate-200 font-medium">
              Zero manual editing required • Production-ready in minutes
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
