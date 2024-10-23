'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle } from 'lucide-react'
import ReCAPTCHA from "react-google-recaptcha"

export default function DiscordVerification() {
  const [step, setStep] = useState(1)
  const [captchaValue, setCaptchaValue] = useState(null)

  const handleDiscordAuth = () => {
    // In a real implementation, this would redirect to Discord OAuth
    console.log("Redirecting to Discord OAuth...")
    setTimeout(() => setStep(2), 1000) // Simulate OAuth completion
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value)
  }

  const handleVerification = () => {
    if (captchaValue) {
      // In a real implementation, you would verify the captcha server-side
      console.log("Verifying captcha...")
      setStep(3)
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
            <p className="text-blue-100 mb-6 text-center">Great! Now please complete the captcha below.</p>
            <div className="flex justify-center mb-6">
              <ReCAPTCHA
                sitekey="YOUR_RECAPTCHA_SITE_KEY"
                onChange={handleCaptchaChange}
                theme="dark"
              />
            </div>
            <button 
              onClick={handleVerification}
              className={`w-full ${captchaValue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'} text-white px-6 py-3 rounded-full font-bold text-lg transition-colors`}
              disabled={!captchaValue}
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
