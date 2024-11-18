'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, BarChart, Users, Headphones, Code, Twitter, Github, MessageCircle, Settings, ChevronDown, Crown, Mail } from 'lucide-react';

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

const FeatureCard = ({ icon: Icon, title, description, isHovered, onHover }) => (
  <motion.div 
    className="bg-gray-800 bg-opacity-50 p-6 rounded-lg cursor-pointer relative overflow-hidden"
    onHoverStart={() => onHover(true)}
    onHoverEnd={() => onHover(false)}
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="w-12 h-12 mb-4 text-blue-300" />
    <h3 className="text-xl font-bold mb-2 text-blue-100">{title}</h3>
    <p className="text-blue-200">{description}</p>
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 border-4 border-blue-400 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
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

const PricingCard = ({ title, price, features, buttonText, icon: Icon, isPreferred }) => (
  <motion.div 
    className={`bg-gray-800 bg-opacity-40 p-6 rounded-lg cursor-pointer relative overflow-hidden border ${isPreferred ? 'border-gray-600' : 'border-transparent'} flex flex-col h-full`}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold mb-2 text-blue-100 flex items-center">
        {title} <Icon className="w-6 h-6 ml-2 text-yellow-400" />
      </h3>
      {isPreferred && (
        <span className="focus:ring-ring inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent">
          PREFERRED
        </span>
      )}
    </div>
    <p className="text-3xl font-bold mb-4 text-blue-300">{price}</p>
    <ul className="space-y-2 mb-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-blue-200">
          <Check className="w-5 h-5 mr-2 text-green-500" />
          {feature}
        </li>
      ))}
    </ul>
    <div className="mt-auto">
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full font-bold flex items-center justify-center">
        {buttonText} <Mail className="w-5 h-5 ml-2" />
      </button>
    </div>
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
          className="bg-gray-900 bg-opacity-80 rounded-full px-8 py-4 border border-blue-500 shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900 py-2 mt-4 rounded-lg border border-blue-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
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
      </AnimatePresence>
    </motion.header>
  );
};

const PremiumPage = () => {
  const [email, setEmail] = useState('');
  const [activeFeature, setActiveFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showPricingInfo, setShowPricingInfo] = useState(false);

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
      description: "Tailor Division to your needs with custom API access and integrations." 
    },
  ];

  const pricingPlans = [
    {
      title: "Free Tier",
      price: "$0.00",
      features: ["Basic features (they're all basic)", "No hidden fees (i dont have the time to add them)", "No premium support (you're on your own cuh)"],
      buttonText: "Start now",
      icon: Zap,
      isPreferred: false
    },
    {
      title: "Pro Tier",
      price: "$0.00",
      features: ["All Free features (still basic)", "Premium support (we might answer) (we wont)", "erm what the sigma"],
      buttonText: "Go Pro",
      icon: Crown,
      isPreferred: true
    },
    {
      title: "Enterprise",
      price: "$0.00",
      features: ["All Pro features", "24/7 support (that wont fucking happen)", "Custom solutions (this wont happen either)"],
      buttonText: "Contact Us",
      icon: Mail,
      isPreferred: false
    }
  ];

  const handleSubmit = async (e) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden relative">
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
              className="text-5xl font-bold mb-6 text-blue-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Division Premium Plan
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Unlock the full potential of your Discord server with our premium features
            </motion.p>
            <Link href="/docs" passHref legacyBehavior>
              <motion.a 
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg inline-block"
                whileHover={{ backgroundColor: '#7289DA', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Get Started Now
              </motion.a>
            </Link>
          </motion.section>

          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Premium Features</h2>
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
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Ready to Upgrade?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>
            <p className="text-lg mt-8 text-blue-100">Still not convinced? I don't fucking care</p>
            <motion.button
              className="underline text-blue-200 hover:text-blue-100 transition-colors mt-4 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPricingInfo(true)}
            >
              Learn more about our pricing
            </motion.button>
            <AnimatePresence>
              {showPricingInfo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={() => setShowPricingInfo(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="bg-gray-800 p-8 rounded-lg max-w-md m-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-blue-300">Pricing Information</h3>
                    <p className="text-blue-100 mb-4">Nothing to learn about... go back</p>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded font-bold w-full"
                      onClick={() => setShowPricingInfo(false)}
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How do I upgrade to the Premium plan?",
                  answer: "You can upgrade to Premium directly from your Division dashboard. Simply log in, navigate to the 'Subscription' tab, and click 'Upgrade to Premium'."
                },
                {
                  question: "Can I switch back to the free plan later?",
                  answer: "Yes, you can downgrade to the free plan at any time. Your premium features will remain active until the end of your current billing cycle."
                },
                {
                  question: "Is there a limit to how many servers I can use Division Premium on?",
                  answer: "No, your Division Premium subscription can be used on an unlimited number of servers that you own or manage."
                },
                {
                  question: "Do you offer discounts for non-profit or educational organizations?",
                  answer: "Yes, we offer special pricing for verified non-profit and educational institutions. Please contact our support team for more information."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <h3 className="text-xl font-bold mb-2 text-blue-300">{faq.question}</h3>
                  <p className="text-blue-100">{faq.answer}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-300">Division</h3>
                <p className="text-blue-100">Elevate your Discord experience with Division, the ultimate bot companion.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-300">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-blue-100 hover:text-blue-300 transition-colors">Home</Link></li>
                  <li><Link href="/docs" className="text-blue-100 hover:text-blue-300 transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="text-blue-100 hover:text-blue-300 transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="text-blue-100 hover:text-blue-300 transition-colors">Support</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-300">Community</h3>
                <ul className="space-y-2">
                  <li><Link href="https://discord.gg/vRcZHQAUN8" className="text-blue-100 hover:text-blue-300 transition-colors">Discord Server</Link></li>
                  <li><Link href="https://twitter.com" className="text-blue-100 hover:text-blue-300 transition-colors">Twitter</Link></li>
                  <li><Link href="https://github.com/ExoticCitron" className="text-blue-100 hover:text-blue-300 transition-colors">GitHub</Link></li>
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
                {emailSubmitted && <p className="mt-2 text-green-500">Email submitted successfully!</p>}
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-100">&copy; 2024 Haveen. All rights reserved.</p>
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
        </motion.footer>
      </div>
    </div>
  );
};

export default PremiumPage;
