'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Smile, Music, Shield, Settings, HelpCircle, ChevronDown } from 'lucide-react';

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
  "Compiling documentation...",
  "Indexing commands...",
  "Organizing categories...",
  "Preparing examples...",
  "Loading usage tips...",
];

const LoadingPage = ({ progress, onComplete }) => {
  const [coolText, setCoolText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % coolTextOptions.length);
    }, 1500);

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    setCoolText(coolTextOptions[textIndex]);
  }, [textIndex]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onComplete, 300);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-300 font-mono">Loading Pixel Docs</h1>
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
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

const commands = [
  { name: 'Trivia', description: 'Start a trivia game in your server', category: 'Fun' },
  { name: 'Joke', description: 'Get a random joke', category: 'Fun' },
  { name: 'Meme', description: 'Fetch a random meme', category: 'Fun' },
  { name: 'Ban', description: 'Ban a user from the server', category: 'Moderation' },
  { name: 'Kick', description: 'Kick a user from the server', category: 'Moderation' },
  { name: 'Mute', description: 'Mute a user in the server', category: 'Moderation' },
  { name: 'Play', description: 'Play a song or add it to the queue', category: 'Entertainment' },
  { name: 'Pause', description: 'Pause the current song', category: 'Entertainment' },
  { name: 'Resume', description: 'Resume the paused song', category: 'Entertainment' },
  { name: 'Activate', description: 'Activate premium features', category: 'Premium'},
  { name: 'Safemode', description: 'Enable safe mode for your server', category: 'Premium'},
  { name: 'Help', description: 'Display help information', category: 'FAQs'},
  { name: 'Data Removal', description: 'Request data removal', category: 'FAQs'},
];

const filterCommands = (query, category) => {
  return commands.filter(
    (command) =>
      command.category === category &&
      command.name.toLowerCase().includes(query.toLowerCase())
  );
};

const Header = ({ isMenuOpen, setIsMenuOpen }) => (
  <div className="relative z-10">
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
          <Settings className="w-6 h-6 text-blue-100" />
        </div>
        <span className="text-2xl font-bold text-blue-300">Pixel</span>
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
    </header>

    {isMenuOpen && (
      <div className="md:hidden bg-gray-900 py-2">
        <nav className="container mx-auto px-4">
          <ul className="space-y-2">
            <li><Link href="/" className="block py-2 text-blue-200 hover:text-blue-100 transition-colors">Home</Link></li>
            <li><Link href="/dashboard" className="block py-2 text-blue-200 hover:text-blue-100 transition-colors">Dashboard</Link></li>
            <li><Link href="/docs" className="block py-2 text-blue-200 hover:text-blue-100 transition-colors">Docs</Link></li>
            <li><Link href="/pricing" className="block py-2 text-blue-200 hover:text-blue-100 transition-colors">Pricing</Link></li>
          </ul>
        </nav>
      </div>
    )}
  </div>
);

const Sidebar = ({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) => (
  <div className="w-64 bg-gradient-to-b from-gray-950 to-gray-900 text-white p-6 min-h-screen">
    <h2 className="text-xl font-bold mb-6 text-blue-300">Categories</h2>
    <input
      type="text"
      placeholder="Search commands..."
      className="w-full mb-4 p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <ul className="space-y-2">
      <li>
        <h3 className="text-sm uppercase text-blue-400">INTRODUCTION</h3>
      </li>
      <li key="Introduction">
        <button
          className={`text-left w-full p-2 rounded-lg ${selectedCategory === 'Introduction' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          onClick={() => setSelectedCategory('Introduction')}
        >
          <span className="flex items-center">
            <Star size={16} className="mr-2" />
            Introduction
          </span>
        </button>
      </li>
      <hr className="my-2 border-t-2 border-gray-800" />
      <li>
        <h3 className="text-sm uppercase text-blue-400">COMMANDS</h3>
      </li>
      <li>
        <button
          className={`text-left w-full p-2 rounded-lg ${selectedCategory === 'Fun' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          onClick={() => setSelectedCategory('Fun')}
        >
          <span className="flex items-center">
            <Smile size={16} className="mr-2" />
            Fun
          </span>
        </button>
      </li>
      <li>
        <button
          className={`text-left w-full p-2 rounded-lg ${selectedCategory === 'Entertainment' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          onClick={() => setSelectedCategory('Entertainment')}
        >
          <span className="flex items-center">
            <Music size={16} className="mr-2" />
            Entertainment
          </span>
        </button>
      </li>
      <li>
        <button
          className={`text-left w-full p-2 rounded-lg ${selectedCategory === 'Moderation' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          onClick={() => setSelectedCategory('Moderation')}
        >
          <span className="flex items-center">
            <Shield size={16} className="mr-2" />
            Moderation
          </span>
        </button>
      </li>
      <li>
        <button
          className={`text-left w-full p-2 rounded-lg ${selectedCategory === 'Utility' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          onClick={() => setSelectedCategory('Utility')}
        >
          <span className="flex items-center">
            <Settings size={16} className="mr-2" />
            Utility
          </span>
        </button>
      </li>
      <hr className="my-2 border-t-2 border-gray-800" />
      <li>
        <h3 className="text-sm uppercase text-blue-400">MISCELLANEOUS</h3>
      </li>
      <li>
        <button
          className={`text-left w-full p-2 rounded-lg ${selectedCategory === 'Premium' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          onClick={() => setSelectedCategory('Premium')}
        >
          <span className="flex items-center">
            <HelpCircle size={16} className="mr-2" />
            Premium
          </span>
        </button>
      </li>
      <li>
        <button
          className={`text-left w-full p-2 rounded-lg ${selectedCategory === 'FAQs' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          onClick={() => setSelectedCategory('FAQs')}
        >
          <span className="flex items-center">
            <HelpCircle size={16} className="mr-2" />
            FAQs
          </span>
        </button>
      </li>
    </ul>
  </div>
);

const CommandList = ({ commands }) => (
  <div className="space-y-4">
    {commands.map((command) => (
      <div key={command.name} className="p-4 bg-gray-800 border border-blue-500 rounded-lg">
        <h3 className="text-lg font-bold text-blue-300">{command.name}</h3>
        <p className="text-blue-100">{command.description}</p>
      </div>
    ))}
  </div>
);

const Introduction = ({ goToCommands }) => (
  <div className="p-4 relative h-full">
    <h2 className="text-3xl font-bold mb-4 text-blue-300">Welcome to Pixel Documentation!</h2>
    <p className="mb-4 text-blue-100">
      Pixel is an advanced Discord bot offering a variety of features and commands across different categories, 
      including fun, entertainment, moderation, and utilities. Use Pixel to engage your server with trivia, 
      manage moderation tasks like banning and kicking, and much more.
    </p>
    <h3 className="text-2xl font-bold mb-2 text-blue-300">Content</h3>
    <ul className="list-disc pl-6 space-y-2 text-blue-100">
      <li><strong className="text-blue-200">Getting Started</strong>: Step-by-step guide on setting up Pixel for your server.</li>
      <li><strong className="text-blue-200">Features</strong>: Explore Pixel's various features and how they can be customized for your community.</li>
      <li><strong className="text-blue-200">FAQs</strong>: Frequently aske d questions to help troubleshoot common issues.</li>
      <li><strong className="text-blue-200">Premium</strong>: Learn about Pixel Premium and its additional capabilities.</li>
      <li><strong className="text-blue-200">Commands Overview</strong>: A detailed list of all commands categorized by functionality.</li>
      <li><strong className="text-blue-200">Moderation Tools</strong>: Understand how to use Pixel's powerful moderation features like ban, kick, and mute.</li>
      <li><strong className="text-blue-200">Fun & Entertainment</strong>: Explore Pixel's fun features like trivia, jokes, memes, and more.</li>
    </ul>
    <hr className="my-8 border-t-2 border-gray-800" />
    <h3 className="text-2xl font-bold mb-2 text-blue-300">Community & Support</h3>
    <p className="mb-4 text-blue-100">
      Join our community of users for support, feedback, and sharing ideas. Stay updated with our latest features and improvements by following our social media channels.
    </p>
    <button 
      onClick={goToCommands} 
      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Go to Commands
    </button>
  </div>
);

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Introduction');
  const [searchQuery, setSearchQuery] = useState('');
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
        return prev + Math.random() * 7;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const goToCommands = () => setSelectedCategory('Fun');

  const filteredCommands = filterCommands(searchQuery, selectedCategory);

  if (loading) {
    return <LoadingPage progress={loadingProgress} onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden relative">
      <BackgroundBubble size={300} position={{ x: '10%', y: '20%' }} color="bg-blue-900" />
      <BackgroundBubble size={200} position={{ x: '80%', y: '50%' }} color="bg-blue-800" />
      <BackgroundBubble size={150} position={{ x: '50%', y: '70%' }} color="bg-blue-700" />
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex-1 bg-gray-950 text-white">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="container mx-auto p-6">
          {selectedCategory === 'Introduction' ? (
            <Introduction goToCommands={goToCommands} />
          ) : (
            <CommandList commands={filteredCommands} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
