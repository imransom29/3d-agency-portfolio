'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, Suspense } from 'react'
import Preloader from '../components/Preloader'
import dynamic from 'next/dynamic'

// Import 3D components dynamically to prevent SSR issues
const Scene3D = dynamic(() => import('../components/3d/Scene3D'), { ssr: false })

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3200)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return <Preloader />

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Scene as Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#0a1718]"></div>}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Header */}
      <header className="fixed w-full z-50 py-6 flex justify-between items-center px-6 md:px-10">
        <div className="flex flex-col items-start">
          <div className="text-white flex items-center">
            <span className="text-primary text-2xl font-medium">/</span>
            <span className="text-primary text-2xl font-extralight">nk</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-light mt-1 ml-0.5">CREATIVITY POWERHOUSE</div>
        </div>
        <div className="flex-1"></div>
        <div className="pr-4 text-right">
          <button className="text-xs uppercase tracking-[0.15em] px-4 py-2 hover:text-primary transition-colors font-light">ENG -</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 h-screen flex items-center">
        <div className="container mx-auto px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-9xl font-extralight tracking-wider mb-12 leading-[1.1]">
              We empower <br />
              brands to <br />
              inspire people
            </h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <button className="text-[11px] uppercase tracking-[0.3em] py-3 px-10 bg-transparent border border-white/15 hover:bg-white/5 hover:border-white/30 transition-all duration-300 font-light">
                EXPLORE OUR UNIVERSE
              </button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Navigation - matching target image */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 py-6 border-t border-white/5">
        <div className="flex justify-center space-x-16 md:space-x-20">
          {['Studio', 'Work', 'Services', 'News', 'Contact'].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs text-white/90 hover:text-primary transition-colors font-light tracking-[0.15em]"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
      
      {/* Gradient overlay at bottom - adjusted to match target image */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#031f1b]/80 to-transparent z-10" />
    </div>
  )
}
