'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Music, Gift, Users } from 'lucide-react';
import Link from 'next/link';

const FeatureIcon = ({ icon: Icon, delay }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay, type: 'spring', stiffness: 260, damping: 20 }}
  >
    <Icon className="w-8 h-8 text-blue-300" />
  </motion.div>
);

const BackgroundBubble = ({ size, position, color }) => (
  <motion.div
    className={`absolute rounded-full ${color} opacity-10 blur-xl`}
    style={{
      width: size,
      height: size,
      top: position.y,
      left: position.x,
    }}
    animate={{
      x: [0, 10, -10, 0],
      y: [0, -10, 10, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

const SparkleEffect = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-blue-300 rounded-full"
        initial={{
          opacity: 0,
          x: "50%",
          y: "50%",
        }}
        animate={{
          opacity: [0, 1, 0],
          x: ["50%", `${Math.random() * 200 - 50}%`],
          y: ["50%", `${Math.random() * 200 - 50}%`],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 0.6,
          delay: Math.random() * 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 2 + 1,
        }}
      />
    ))}
  </div>
);

const coolTextOptions = [
  "Synchronizing server data...",
  "Optimizing bot performance...",
  "Analyzing community trends...",
  "Calibrating moderation tools...",
  "Preparing custom commands...",
];

const LoadingPage = ({ progress, onComplete }) => {
  const [coolText, setCoolText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % coolTextOptions.length);
    }, 2000);

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    setCoolText(coolTextOptions[textIndex]);
  }, [textIndex]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onComplete, 500);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-300 font-mono">Loading Division Dashboard</h1>
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-blue-400 opacity-50 blur-md" 
               style={{clipPath: `inset(0 ${100 - progress}% 0 0)`}} />
        </div>
        <SparkleEffect />
      </div>
      <div className="mt-4 text-xl text-blue-300 font-mono">
        {progress.toFixed(0)}%
      </div>
      <div className="mt-8 text-blue-200 text-sm font-mono h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={coolText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {coolText}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function LoginWithDiscord() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const features = [
    { icon: Zap, name: 'Fast' },
    { icon: Shield, name: 'Secure' },
    { icon: Music, name: 'Music' },
    { icon: Gift, name: 'Rewards' },
    { icon: Users, name: 'Community' },
  ];

  if (loading) {
    return <LoadingPage progress={loadingProgress} onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden">
      <BackgroundBubble size={300} position={{ x: '10%', y: '20%' }} color="bg-blue-900" />
      <BackgroundBubble size={200} position={{ x: '80%', y: '50%' }} color="bg-blue-800" />
      <BackgroundBubble size={150} position={{ x: '50%', y: '70%' }} color="bg-blue-700" />

      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: `${mousePosition.x / 5}px ${mousePosition.y / 5}px`,
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%237289DA" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 bg-gray-800 bg-opacity-50 p-8 pt-16 rounded-2xl shadow-2xl backdrop-blur-sm max-w-md w-full">
        <Link href="/" className="absolute top-4 left-4 text-blue-300 hover:text-blue-100 transition-colors">
          &larr; Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-blue-300">Welcome to Division</h1>
          <p className="text-blue-100 mb-8">Login with Discord to access your dashboard and unleash the full power of Division in your server.</p>
        </motion.div>

        <motion.button
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-full font-bold text-lg flex items-center justify-center space-x-3 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          <span>Login with Discord</span>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-blue-500"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        <div className="mt-12 grid grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <div key={feature.name} className="flex flex-col items-center text-center">
              <FeatureIcon icon={feature.icon} delay={index * 0.1} />
              <motion.p
                className="text-xs mt-2 text-blue-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {feature.name}
              </motion.p>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center text-blue-200 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          By logging in, you agree to our{' '}
          <a href="/tos" className="text-blue-400 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/policies" className="text-blue-400 hover:underline">Privacy Policy</a>
        </motion.div>
      </div>
    </div>
  );
}
