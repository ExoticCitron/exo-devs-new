'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

// You would typically store these in environment variables
const DISCORD_CLIENT_ID = '1175862600127500388'
const REDIRECT_URI = 'https://exo-devs.tech/callback'

function CustomCaptcha({ onVerify }) {
  const [captchaText, setCaptchaText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [isValid, setIsValid] = useState(false)

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setCaptchaText(result)
    setUserInput('')
    setIsValid(false)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleInputChange = (e) => {
    const input = e.target.value
    setUserInput(input)
    setIsValid(input === captchaText)
    if (input === captchaText) {
      onVerify(true)
    } else {
      onVerify(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-gray-800 p-4 rounded-lg">
        <span className="text-2xl font-bold tracking-wider text-blue-300 select-none">
          {captchaText}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter CAPTCHA"
        />
        <button onClick={generateCaptcha} className="text-blue-300 hover:text-blue-100">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default function DiscordVerification() {
  const [step, setStep] = useState(1)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
      handleDiscordCallback(code)
    }
  }, [])

  const handleDiscordAuth = () => {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`
    window.location.href = discordAuthUrl
  }

  const handleDiscordCallback = async (code) => {
    try {
      const response = await fetch('/api/discord-callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()
      if (response.ok) {
        setStep(2)
      } else {
        throw new Error(data.message || 'Failed to authenticate with Discord')
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during Discord authentication')
    }
  }

  const handleCaptchaVerification = (isValid) => {
    setCaptchaVerified(isValid)
  }

  const handleVerification = async () => {
    if (captchaVerified) {
      try {
        const response = await fetch('/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ captchaVerified }),
        })
        const data = await response.json()
        if (response.ok) {
          setStep(3)
        } else {
          throw new Error(data.message || 'Verification failed')
        }
      } catch (error: any) {
        setError(error.message || 'An error occurred during verification')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex items-center justify-center">
      <motion.div 
        className="bg-gray-900 p-8 rounded-lg shadow-xl border border-blue-500 max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">Discord Verification</h2>
        
        {error && (
          <motion.div
            className="bg-red-500 text-white p-4 rounded-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle className="inline-block mr-2" />
            {error}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-blue-100 mb-6 text-center">To get verified, please authorize your Discord account.</p>
            <button 
              onClick={handleDiscordAuth}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              <Shield className="inline-block mr-2" />
              Authorize Discord
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-blue-100 mb-6 text-center">Great! Now please complete the CAPTCHA below.</p>
            <div className="flex justify-center mb-6">
              <CustomCaptcha onVerify={handleCaptchaVerification} />
            </div>
            <button 
              onClick={handleVerification}
              className={`w-full ${captchaVerified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'} text-white px-6 py-3 rounded-full font-bold text-lg transition-colors`}
              disabled={!captchaVerified}
            >
              Verify
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-blue-300">Verification Complete!</h3>
            <p className="text-blue-100">You are now verified. Enjoy your access to the server!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
