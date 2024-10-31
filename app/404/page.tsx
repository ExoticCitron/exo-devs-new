'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home } from 'lucide-react'

const Star = ({ delay, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition)
  const [opacity, setOpacity] = useState(Math.random() * 0.5 + 0.3)

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => ({
        x: (prev.x + 0.05) % 100,
        y: prev.y
      }))
    }, 50)

    const twinkleInterval = setInterval(() => {
      setOpacity(Math.random() * 0.5 + 0.3)
    }, 500)

    return () => {
      clearInterval(moveInterval)
      clearInterval(twinkleInterval)
    }
  }, [initialPosition])

  return (
    <div 
      className="absolute rounded-full bg-white"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '2px',
        height: '2px',
        opacity: opacity,
        transition: 'left 0.05s linear, opacity 0.5s ease-in-out',
      }}
    />
  )
}

const TypewriterText = ({ text, color }) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(intervalId)
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [text])

  return (
    <p className={color}>
      {displayText}
    </p>
  )
}

export default function NotFound() {
  const [errorCode, setErrorCode] = useState("404")
  const [stars, setStars] = useState([])

  useEffect(() => {
    setStars(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        position: {
          x: Math.random() * 100,
          y: Math.random() * 100
        }
      }))
    )
  }, [])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setErrorCode(prev => 
        prev.split('').map(char => Math.random() < 0.1 ? String.fromCharCode(48 + Math.floor(Math.random() * 10)) : char).join('')
      )
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden flex flex-col items-center justify-center relative">
      {stars.map((star) => (
        <Star key={star.id} delay={star.id * 0.1} initialPosition={star.position} />
      ))}

      <h1 className="text-8xl font-bold mb-8 glitch-text" data-text={errorCode}>
        {errorCode}
      </h1>

      <p className="text-2xl mb-8 text-center max-w-md">
        Oops! Looks like you've drifted into a <span className="text-blue-400">cosmic void</span>. 
        This sector of space is <span className="text-red-400">uncharted</span>.
      </p>

      <div className="bg-gray-800 p-4 rounded-lg mb-8 w-80 font-mono">
        <TypewriterText text="> ERROR: Page not found" color="text-green-400" />
        <TypewriterText text="> SYSTEM: Initiating return sequence" color="text-yellow-400" />
        <TypewriterText text="> STATUS: Preparing wormhole..." color="text-blue-400" />
      </div>

      <Link href="/">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            <Home className="mr-2" />
            Return to Base
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
        </Button>
      </Link>

      <div className="absolute bottom-10 right-10 w-40 h-40">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping"></div>
        <div className="absolute inset-4 border-4 border-green-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-8 border-4 border-red-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0%, 100% {
            text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
                        -0.05em -0.025em 0 rgba(0,255,0,0.75),
                        -0.025em 0.05em 0 rgba(0,0,255,0.75);
          }
          50% {
            text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75),
                        0.025em 0.025em 0 rgba(0,255,0,0.75),
                        -0.05em -0.05em 0 rgba(0,0,255,0.75);
          }
        }

        .glitch-text {
          animation: glitch 1s infinite;
        }
      `}</style>
    </div>
  )
}
