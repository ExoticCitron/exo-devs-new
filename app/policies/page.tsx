'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Lock, FileText } from 'lucide-react';

const BackgroundBubble = ({ size, position, color }) => (
  <motion.div
    className={`absolute rounded-full ${color} opacity-20 blur-xl`}
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
        className="absolute w-1 h-1 bg-white rounded-full"
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
  "Encrypting data...",
  "Securing privacy...",
  "Finalizing policy...",
];

const LoadingPage = ({ progress, onComplete }) => {
  const [coolText, setCoolText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % coolTextOptions.length);
    }, 1000); // Change text every 1 second for quicker loading

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    setCoolText(coolTextOptions[textIndex]);
  }, [textIndex]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onComplete, 200); // Even shorter delay before completion
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <h1 className="text-4xl font-bold mb-8 text-white font-mono">Loading Privacy Policy</h1>
      <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-blue-400 opacity-50 blur-md" 
               style={{clipPath: `inset(0 ${100 - progress}% 0 0)`}} />
        </div>
        <SparkleEffect />
      </div>
      <div className="mt-4 text-xl text-white font-mono">
        {progress.toFixed(0)}%
      </div>
      <div className="mt-8 text-gray-400 text-sm font-mono h-6">
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

const Header = ({ isMenuOpen, setIsMenuOpen }) => (
  <div className="relative z-10">
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
          <Lock className="w-6 h-6 text-gray-300" />
        </div>
        <span className="text-2xl font-bold">Division</span>
      </div>
      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
          <li><Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link></li>
          <li><Link href="/docs" className="hover:text-gray-300 transition-colors">Docs</Link></li>
          <li><Link href="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link></li>
        </ul>
      </nav>
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
          <ChevronDown className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </header>

    {isMenuOpen && (
      <div className="md:hidden bg-gray-800 py-2">
        <nav className="container mx-auto px-4">
          <ul className="space-y-2">
            <li><Link href="/" className="block py-2 hover:text-gray-300 transition-colors">Home</Link></li>
            <li><Link href="/dashboard" className="block py-2 hover:text-gray-300 transition-colors">Dashboard</Link></li>
            <li><Link href="/docs" className="block py-2 hover:text-gray-300 transition-colors">Docs</Link></li>
            <li><Link href="/pricing" className="block py-2 hover:text-gray-300 transition-colors">Pricing</Link></li>
          </ul>
        </nav>
      </div>
    )}
  </div>
);

const PrivacyPolicy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10; // Faster progress increase
      });
    }, 50); // Shorter interval for quicker loading

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <LoadingPage progress={loadingProgress} onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      <BackgroundBubble size={300} position={{ x: '10%', y: '20%' }} color="bg-gray-700" />
      <BackgroundBubble size={200} position={{ x: '80%', y: '50%' }} color="bg-gray-600" />
      <BackgroundBubble size={150} position={{ x: '50%', y: '70%' }} color="bg-gray-500" />

      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you use Division. This may include your Discord user ID, server ID, and any messages or commands you send to the bot.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to operate, maintain, and improve Division. This includes personalizing features and content, and providing you with a better experience.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
            <p>We do not share or sell your personal information to third parties. We may share aggregated, non-personal information for improving our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
            <p>We retain your information for as long as your account is active or as needed to provide you services. We may retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You can also object to processing of your personal information or ask us to restrict processing in certain circumstances.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@Divisionbot.com.</p>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Division Bot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
