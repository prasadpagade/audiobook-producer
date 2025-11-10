'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-3">
              Audiobook Producer
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered audiobook generation from text. Built with modern tech stack and best practices.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/prasadpagade/audiobook-producer" className="text-slate-400 hover:text-primary-400 transition-colors text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/prasadpagade/audiobook-producer" className="text-slate-400 hover:text-primary-400 transition-colors text-sm">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors text-sm">
                  Examples
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/prasadpagade" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://linkedin.com/in/prasadpagade" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="mailto:prasad@example.com"
                className="w-10 h-10 bg-slate-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 Prasad Pagade. Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-primary-400 transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-slate-500 hover:text-primary-400 transition-colors text-sm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
