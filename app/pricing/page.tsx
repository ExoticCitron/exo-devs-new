'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, BarChart, Users, Headphones, Code, Twitter, Github, MessageCircle } from 'lucide-react';

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
  "Initializing virtual reality...",
  "Decrypting alien transmissions...",
  "Generating holographic interface...",
  "Compiling futuristic code...",
  "Activating time dilation field...",
];

const LoadingPage = ({ progress, onComplete }) => {
  const [coolText, setCoolText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % coolTextOptions.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    setCoolText(coolTextOptions[textIndex]);
  }, [textIndex]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onComplete, 500); // Shorter delay before completion
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <h1 className="text-4xl font-bold mb-8 text-white font-mono">Initializing Pixel Premium</h1>
      <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden relative">
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

const FeatureCard = ({ icon: Icon, title, description, isHovered, onHover }) => (
  <motion.div 
    className="bg-gray-800 bg-opacity-50 p-6 rounded-lg cursor-pointer relative overflow-hidden"
    onHoverStart={() => onHover(true)}
    onHoverEnd={() => onHover(false)}
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="w-12 h-12 mb-4 text-gray-300" />
    <h3 className="text-xl font-bold mb-2 text-gray-100">{title}</h3>
    <p className="text-gray-300">{description}</p>
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 border-4 border-white rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          style={{
            boxShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff',
          }}
        />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {isHovered && <SparkleEffect />}
    </AnimatePresence>
  </motion.div>
);

const PremiumPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
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
        return prev + Math.random() * 5; // Faster progress increase
      });
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const features = [
    { 
      icon: Shield, 
      title: "Advanced Moderation", 
      description: "Keep your server safe with our powerful AI-driven moderation tools." 
    },
    { 
      icon: Zap, 
      title: "Lightning Fast Performance", 
      description: "Experience instant responses and seamless integration with your server." 
    },
    { 
      icon: BarChart, 
      title: "Detailed Analytics", 
      description: "Gain insights into your server's activity with comprehensive analytics." 
    },
    { 
      icon: Users, 
      title: "Unlimited Members", 
      description: "Scale your community without limits. Our premium plan supports servers of any size." 
    },
    { 
      icon: Headphones, 
      title: "24/7 Support", 
      description: "Get priority support from our dedicated team whenever you need it." 
    },
    { 
      icon: Code, 
      title: "Custom Integrations", 
      description: "Tailor Pixel to your needs with custom API access and integrations." 
    },
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

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setEmail('');
      setEmailSubmitted(true);
      alert('Email added successfully!');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  if (loading) {
    return <LoadingPage progress={loadingProgress} onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      <BackgroundBubble size={300} position={{ x: '10%', y: '20%' }} color="bg-gray-700" />
      <BackgroundBubble size={200} position={{ x: '80%', y: '50%' }} color="bg-gray-600" />
      <BackgroundBubble size={150} position={{ x: '50%', y: '70%' }} color="bg-gray-500" />
      
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: `${mousePosition.x / 5}px ${mousePosition.y / 5}px`,
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Pixel</Link>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
              <li><Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link></li>
              <li><Link href="/docs" className="hover:text-gray-300 transition-colors">Docs</Link></li>
              <li><Link href="" className="hover:text-gray-300 transition-colors">Pricing</Link></li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-20">
            <motion.h1 
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Pixel Premium Plan
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Unlock the full potential of your Discord server with our premium features
            </motion.p>
            <Link href="/docs" passHref legacyBehavior>
              <motion.button 
                className="bg-gray-700 text-white px-8 py-3 rounded-full font-bold text-lg"
                whileHover={{ backgroundColor: '#ffffff', color: '#1F2937' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>
            </Link>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Premium Features</h2>
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

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Premium?</h2>
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg">
              <ul className="space-y-4">
                {[
                  "Unlimited audio channels for 24/7 music playback",
                  "Custom bot branding to match your server's theme",
                  "Advanced auto-moderation with customizable rules",
                  "Exclusive premium-only commands and features",
                  "Early access to new features and updates",
                  "Increased rate limits for high-traffic servers",
                  "Premium support with guaranteed response times",
                  "Regular feature updates based on community feedback"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-6 h-6 mr-2 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-6">Ready to Upgrade?</h2>
            <p className="text-xl mb-8">Join thousands of servers already enjoying Pixel Premium</p>
            <motion.button 
              className="bg-gray-700 text-white px-8 py-3 rounded-full font-bold text-lg"
              whileHover={{ backgroundColor: '#ffffff', color: '#1F2937' }}
              whileTap={{ scale: 0.95 }}
            >
              Upgrade to Premium
            </motion.button>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How do I upgrade to the Premium plan?",
                  answer: "You can upgrade to Premium directly from your Pixel dashboard. Simply log in, navigate to the 'Subscription' tab, and click 'Upgrade to Premium'."
                },
                {
                  question: "Can I switch back to the free plan later?",
                  answer: "Yes, you can downgrade to the free plan at any time. Your premium features will remain active until the end of your current billing cycle."
                },
                {
                  question: "Is there a limit to how many servers I can use Pixel Premium on?",
                  answer: "No, your Pixel Premium subscription can be used on an unlimited number of servers that you own or manage."
                },
                {
                  question: "Do you offer discounts for non-profit or educational organizations?",
                  answer: "Yes, we offer special pricing for verified non-profit and educational institutions. Please contact our support team for more information."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 py-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Pixel</h3>
                <p className="text-gray-400">Elevate your Discord experience with Pixel, the ultimate bot companion.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Community</h3>
                <ul className="space-y-2">
                  <li><Link href="https://discord.gg/vRcZHQAUN8" className="text-gray-400 hover:text-white transition-colors">Discord Server</Link></li>
                  <li><Link href="twitter.com" className="text-gray-400 hover:text-white transition-colors">Twitter</Link></li>
                  <li><Link href="https://github.com/ExoticCitron" className="text-gray-400 hover:text-white transition-colors">GitHub</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={emailSubmitted}
                    className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    required
                  />
                  <motion.button
                    type="submit"
                    className={`w-full bg-gray-700 text-white px-4 py-2 rounded-full font-bold ${emailSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={emailSubmitted}
                    whileHover={emailSubmitted ? {} : { backgroundColor: '#ffffff', color: '#1F2937' }}
                    whileTap={emailSubmitted ? {} : { scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
                {emailSubmitted && <p className="mt-2 text-green-500">Email submitted successfully!</p>}
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2024 Haveen. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PremiumPage;
