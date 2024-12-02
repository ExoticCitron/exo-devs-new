'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Headphones, Mic, Radio, PlayCircle, SkipForward, Volume2, Settings, ChevronDown } from 'lucide-react';

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
        className="absolute w-1 h-1 bg-purple-300 rounded-full"
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

const FeatureCard = ({ icon: Icon, title, description, isHovered, onHover }) => (
  <motion.div 
    className="bg-gray-800 bg-opacity-50 p-6 rounded-lg cursor-pointer relative overflow-hidden border-2 border-purple-500"
    onHoverStart={() => onHover(true)}
    onHoverEnd={() => onHover(false)}
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="w-12 h-12 mb-4 text-purple-300" />
    <h3 className="text-xl font-bold mb-2 text-purple-100">{title}</h3>
    <p className="text-purple-200">{description}</p>
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 border-4 border-purple-400 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: '0 0 10px #9F7AEA, 0 0 20px #9F7AEA, 0 0 30px #9F7AEA, 0 0 40px #9F7AEA',
          }}
        />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {isHovered && <SparkleEffect />}
    </AnimatePresence>
  </motion.div>
);

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      className="container mx-auto px-4 py-6 relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-center">
        <motion.div
          className="bg-gray-900 bg-opacity-80 rounded-full px-8 py-4 border-2 border-purple-500 shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
        >
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
              >
                <Settings className="w-6 h-6 text-purple-100" />
              </motion.div>
              <span className="text-2xl font-bold text-purple-300">Division Music</span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><Link href="/" className="text-purple-200 hover:text-purple-100 transition-colors">Home</Link></li>
                <li><Link href="/dashboard" className="text-purple-200 hover:text-purple-100 transition-colors">Dashboard</Link></li>
                <li><Link href="/docs" className="text-purple-200 hover:text-purple-100 transition-colors">Docs</Link></li>
                <li><Link href="/music" className="text-purple-200 hover:text-purple-100 transition-colors">Music</Link></li>
              </ul>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-purple-300 focus:outline-none">
                <ChevronDown className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900 py-2 mt-4 rounded-lg border-2 border-purple-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-4">
              <ul className="space-y-2">
                <li><Link href="/" className="block py-2 text-purple-200 hover:text-purple-100 transition-colors">Home</Link></li>
                <li><Link href="/dashboard" className="block py-2 text-purple-200 hover:text-purple-100 transition-colors">Dashboard</Link></li>
                <li><Link href="/docs" className="block py-2 text-purple-200 hover:text-purple-100 transition-colors">Docs</Link></li>
                <li><Link href="/music" className="block py-2 text-purple-200 hover:text-purple-100 transition-colors">Music</Link></li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const MusicPage = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    { 
      icon: Music, 
      title: "High-Quality Streaming", 
      description: "Enjoy crystal-clear audio with our advanced streaming technology." 
    },
    { 
      icon: Headphones, 
      title: "Multi-Platform Support", 
      description: "Listen on Discord, web browsers, and mobile devices seamlessly." 
    },
    { 
      icon: Mic, 
      title: "Voice Commands", 
      description: "Control your music hands-free with intuitive voice commands." 
    },
    { 
      icon: Radio, 
      title: "Custom Radio Stations", 
      description: "Create and share personalized radio stations with your community." 
    },
    { 
      icon: PlayCircle, 
      title: "Playlist Management", 
      description: "Organize your favorite tracks into custom playlists with ease." 
    },
    { 
      icon: SkipForward, 
      title: "Smart Queue System", 
      description: "Intelligent queue management for uninterrupted listening experiences." 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden relative">
      <BackgroundBubble size={300} position={{ x: '10%', y: '20%' }} color="bg-purple-900" />
      <BackgroundBubble size={200} position={{ x: '80%', y: '50%' }} color="bg-purple-800" />
      <BackgroundBubble size={150} position={{ x: '50%', y: '70%' }} color="bg-purple-700" />
      
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: `${mousePosition.x / 5}px ${mousePosition.y / 5}px`,
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <motion.section 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.h1 
              className="text-5xl font-bold mb-6 text-purple-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Division Music
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-purple-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Elevate your Discord experience with our free, feature-rich music bot
            </motion.p>
            <Link href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=YOUR_PERMISSIONS&scope=bot" passHref legacyBehavior>
              <motion.a 
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg inline-block border-2 border-purple-400"
                whileHover={{ backgroundColor: '#9F7AEA', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Add to Discord
              </motion.a>
            </Link>
          </motion.section>

          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">Awesome Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <FeatureCard 
                    {...feature} 
                    isHovered={activeFeature === index}
                    onHover={(isHovered) => setActiveFeature(isHovered ? index : null)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-purple-300">Get Started with Division Music</h2>
            <p className="text-lg mb-8 text-purple-100">
              Enhance your Discord server's audio experience in just a few simple steps:
            </p>
            <ol className="list-decimal list-inside text-left max-w-2xl mx-auto space-y-4 text-purple-100">
              <li>Click the "Add to Discord" button above</li>
              <li>Select the server you want to add Division Music to</li>
              <li>Grant the necessary permissions</li>
              <li>Use the <code className="bg-purple-800 px-2 py-1 rounded">/play</code> command to start listening to your favorite tunes</li>
            </ol>
            <p className="text-lg mt-8 text-purple-100">It's that easy! Start enjoying high-quality music with your community today.</p>
          </motion.section>

          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Is Division Music really free?",
                  answer: "Yes, Division Music is completely free to use. We believe in providing high-quality music services to all Discord communities without any cost."
                },
                {
                  question: "What music sources does Division Music support?",
                  answer: "Division Music supports a wide range of sources including YouTube, Spotify, SoundCloud, and more. You can play music from your favorite platforms seamlessly."
                },
                {
                  question: "Can I use Division Music in multiple servers?",
                  answer: "You can add Division Music to as many servers as you like, as long as you have the necessary permissions in those servers."
                },
                {
                  question: "How do I control the music playback?",
                  answer: "Division Music offers intuitive commands for playback control. Use commands like /play, /pause, /skip, /queue to manage your music effortlessly."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border-2 border-purple-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <h3 className="text-xl font-bold mb-2 text-purple-300">{faq.question}</h3>
                  <p className="text-purple-100">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        <motion.footer 
          className="bg-gray-900 py-12 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Division Music</h3>
                <p className="text-purple-100">Elevate your Discord experience with Division Music, the ultimate free music bot companion.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-purple-100 hover:text-purple-300 transition-colors">Home</Link></li>
                  <li><Link href="/docs" className="text-purple-100 hover:text-purple-300 transition-colors">Documentation</Link></li>
                  <li><Link href="#" className="text-purple-100 hover:text-purple-300 transition-colors">Support</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Community</h3>
                <ul className="space-y-2">
                  <li><Link href="https://discord.gg/vRcZHQAUN8" className="text-purple-100 hover:text-purple-300 transition-colors">Discord Server</Link></li>
                  <li><Link href="https://twitter.com" className="text-purple-100 hover:text-purple-300 transition-colors">Twitter</Link></li>
                  <li><Link href="https://github.com/ExoticCitron" className="text-purple-100 hover:text-purple-300 transition-colors">GitHub</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-purple-100">&copy; 2024 Division Music. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className="text-purple-300 hover:text-purple-100 transition-colors">
                  <Volume2 className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-purple-300 hover:text-purple-100 transition-colors">
                  <Settings className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default MusicPage;

