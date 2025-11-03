'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [sparkPosition, setSparkPosition] = useState({ y: 0, scaleX: 1, scaleY: 1 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = 'auto'
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Animation for the bouncing effect
  useEffect(() => {
    let animationFrame: number
    
    const animate = () => {
      // Faster animation with elastic effect
      const time = Date.now() / 300; // Even faster animation
      const y = Math.sin(time) * 15; // Higher bounce
      
      // Add squash and stretch effect for elasticity
      // When the ball is at the bottom of bounce, it should be wider and shorter
      // When the ball is at the top, it should be taller and narrower
      const velocity = Math.cos(time); // Rate of change indicates direction and speed
      
      // Apply more squash at the bottom of bounce
      const scaleX = 1 + Math.max(0, -velocity * 0.2); // Widen at bottom
      const scaleY = 1 + Math.max(0, velocity * 0.3);  // Stretch at top
      
      setSparkPosition({ y, scaleX, scaleY })
      animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#0a1718' }}>
      <div className="flex items-center gap-8 relative">
        <motion.div 
          className="w-2 h-2 rounded-full bg-primary" 
          style={{ 
            y: sparkPosition.y,
            scaleX: sparkPosition.scaleX,
            scaleY: sparkPosition.scaleY,
            boxShadow: '0 0 10px 5px rgba(32, 231, 183, 0.6), 0 0 20px 8px rgba(32, 231, 183, 0.3)',
            transformOrigin: 'center'
          }}
        />
        <div className="text-2xl md:text-4xl font-extralight tracking-wider text-white">
          It all starts with a spark
        </div>
      </div>
    </div>
  )
}
