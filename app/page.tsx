'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Shield, Music, Gift, Settings, Users, Star, Twitter, Github, MessageCircle } from 'lucide-react';

const BackgroundBubble = ({ size, position, color }: { size: number, position: { x: string, y: string }, color: string }) => (
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
  "Syncing quantum algorithms...",
  "Calibrating neural networks...",
  "Optimizing AI responses...",
  "Initializing virtual reality...",
  "Decrypting alien transmissions...",
  "Generating holographic interface...",
  "Compiling futuristic code...",
  "Activating time dilation field...",
];

const LoadingPage = ({ progress, onComplete }: { progress: number, onComplete: () => void }) => {
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
      <h1 className="text-4xl font-bold mb-8 text-blue-300 font-mono">Initializing Division</h1>
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

const FeatureCard = ({ icon: Icon, title, description, isHovered, onHover }: { icon: React.ElementType, title: string, description: string, isHovered: boolean, onHover: (isHovered: boolean) => void }) => (
  <motion.div 
    className="bg-gray-900 bg-opacity-80 p-6 rounded-lg cursor-pointer relative overflow-hidden border border-blue-500"
    onHoverStart={() => onHover(true)}
    onHoverEnd={() => onHover(false)}
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="w-12 h-12 mb-4 text-blue-300" />
    <h3 className="text-xl font-bold mb-2 text-blue-100">{title}</h3>
    <p className="text-gray-300">{description}</p>
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 border-4 border-blue-400 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          style={{
            boxShadow: '0 0 10px #7289DA, 0 0 20px #7289DA, 0 0 30px #7289DA, 0 0 40px #7289DA',
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="container mx-auto px-4 py-6 relative">
      <div className="flex justify-center">
        <motion.div
          className="bg-gray-900 bg-opacity-80 rounded-full px-8 py-4 border border-blue-500 shadow-lg"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
              >
                <Settings className="w-6 h-6 text-blue-100" />
              </motion.div>
              <span className="text-2xl font-bold text-blue-300">Division</span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><Link href="/" className="text-blue-200 hover:text-blue-100 transition-colors">Home</Link></li>
                <li><Link href="/dashboard" className="text-blue-200 hover:text-blue-100 transition-colors">Dashboard</Link></li>
                <li><Link href="/docs" className="text-blue-200 hover:text-blue-100 transition-colors">Docs</Link></li>
                <li><Link href="/pricing" className="text-blue-200 hover:text-blue-100 transition-colors">Pricing</Link></li>
              </ul>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-300 focus:outline-none">
                <ChevronDown className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-900 py-2 mt-4 rounded-lg border border-blue-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <nav className="container mx-auto px-4">
            <ul className="space-y-2">
              <li><Link href="/" className="block py-2 text-blue-200 hover:text-blue-100 transition-colors">Home</Link></li>
              <li><Link href="/dashboard" className="block py-2 text-blue-200 hover:text-blue-100 transition-colors">Dashboard</Link></li>
              <li><Link href="/docs" className="block py-2 text-blue-200 hover:text-blue-100 transition-colors">Docs</Link></li>
              <li><Link href="/pricing" className="block py-2 text-blue-200 hover:text-blue-100 transition-colors">Pricing</Link></li>
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default function DiscordBotLanding() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    { icon: Zap, title: 'Lightning Fast', description: 'Division responds instantly to your commands' },
    { icon: Shield, title: 'Advanced Moderation', description: 'Keep your server safe with powerful moderation tools' },
    { icon: Music, title: 'Music Playback', description: 'Play your favorite tunes right in your Discord server' },
    { icon: Gift, title: 'Custom Rewards', description: 'Set up a reward system for your most active members' },
    { icon: Users, title: 'User Engagement', description: 'Boost user activity with fun mini-games and challenges' },
    { icon: Star, title: 'Customizable', description: 'Tailor Division to fit your server\'s unique needs' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/save-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit email');
      }

      setEmail('');
      setEmailSubmitted(true);
      alert('Email added successfully!');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Failed to submit email. Please try again.');
    }
  };

  if (loading) {
    return <LoadingPage progress={loadingProgress} onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden relative">
      <BackgroundBubble size={300} position={{ x: '10%', y: '20%' }} color="bg-blue-900" />
      <BackgroundBubble size={200} position={{ x: '80%', y: '50%' }} color="bg-blue-800" />
      <BackgroundBubble size={150} position={{ x: '50%', y: '70%' }} color="bg-blue-700" />
      
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: `${mousePosition.x / 5}px ${mousePosition.y / 5}px`,
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%237289DA" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-20">
            <motion.h1 
              className="text-5xl font-bold mb-6 text-blue-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Meet Division: Your Discord Sidekick
            </motion.h1>
            <motion.p 
               
              className="text-xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Elevate your Discord server with moderation, music, and more!
            </motion.p>
            <Link href="https://discord.com/oauth2/authorize?client_id=1175862600127500388&permissions=8&integration_type=0&scope=bot+applications.commands" passHref legacyBehavior>
              <motion.a 
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg inline-block"
                  whileHover={{ backgroundColor: '#7289DA', scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Discord
              </motion.a>
            </Link>
          </section>
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Awesome Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  {...feature} 
                  isHovered={activeFeature === index}
                  onHover={(isHovered) => setActiveFeature(isHovered ? index : null)}
                />
              ))}
            </div>
          </section>

          <section className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Ready to get started?</h2>
            <p className="text-xl mb-8 text-blue-100">Join thousands of servers already using Division</p>
            <Link href="https://discord.com/oauth2/authorize?client_id=1175862600127500388&permissions=8&integration_type=0&scope=bot+applications.commands" passHref legacyBehavior>
              <motion.a 
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg inline-block"
                  whileHover={{ backgroundColor: '#7289DA', scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Division Now
              </motion.a>
            </Link>
          </section>
        </main>

        <footer className="bg-gray-950 py-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-300">Division</h3>
                <p className="text-blue-100">Elevate your Discord experience with Division, the ultimate bot companion.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-300">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-blue-200 hover:text-blue-100 transition-colors">Home</Link></li>
                  <li><Link href="/docs" className="text-blue-200 hover:text-blue-100 transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="text-blue-200 hover:text-blue-100 transition-colors">Pricing</Link></li>
                  <li><Link href="/" className="text-blue-200 hover:text-blue-100 transition-colors">Support</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-300">Community</h3>
                <ul className="space-y-2">
                  <li><Link href="https://discord.gg/vRcZHQAUN8" className="text-blue-200 hover:text-blue-100 transition-colors">Discord Server</Link></li>
                  <li><Link href="https://twitter.com" className="text-blue-200 hover:text-blue-100 transition-colors">Twitter</Link></li>
                  <li><Link href="https://github.com/ExoticCitron" className="text-blue-200 hover:text-blue-100 transition-colors">GitHub</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-300">Stay Updated</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={emailSubmitted}
                    className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <motion.button
                    type="submit"
                    className={`w-full bg-blue-600 text-white px-4 py-2 rounded-full font-bold ${emailSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={emailSubmitted}
                    whileHover={emailSubmitted ? {} : { backgroundColor: '#7289DA', scale: 1.05 }}
                    whileTap={emailSubmitted ? {} : { scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
                {emailSubmitted && <div className="mt-2 text-green-500">Email submitted successfully!</div>}
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200">&copy; 2024 Haveen. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-300 hover:text-blue-100 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
