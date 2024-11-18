'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Lock, FileText, Check, X } from 'lucide-react';

const Header = ({ isMenuOpen, setIsMenuOpen }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/portfolio/haveen" className="text-2xl font-bold text-white mr-8">Division</Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Docs</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
        <div className="hidden md:block">
          <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md font-bold transition-colors">
            Wassup :D
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white transition-colors">
            <ChevronDown className={`w-6 h-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-black py-2 mt-4 rounded-lg border border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4">
            <ul className="space-y-2">
              <li><Link href="/" className="block py-2 text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/dashboard" className="block py-2 text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/docs" className="block py-2 text-gray-400 hover:text-white transition-colors">Docs</Link></li>
              <li><Link href="/pricing" className="block py-2 text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
);

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left font-medium transition-all hover:text-gray-300"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-2 text-gray-400">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PrivacyPolicy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 w-full h-screen">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cg fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath opacity=%22.5%22 d=%22M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z%22/%3E%3Cpath d=%22M6 5V0H5v5H0v1h5v94h1V6h94V5H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-black bg-fixed opacity-20" />
      </div>

      <div className="relative z-10">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <main className="container mx-auto px-4 py-16 pt-24 max-w-3xl">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-white">
            Our Privacy Policy
            <span className="inline-flex select-none items-center rounded-full border border-white/10 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black text-gray-400 ml-2 align-middle">
              (sort of)
            </span>
          </h1>

          <div className="bg-white/5 text-white rounded-lg p-6 mb-8 shadow-lg">
            <p className="text-xl mb-4">In summary:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We collect as much data as possible.</li>
              <li>Your secrets are safe with us. If everything is public, nothing can be leaked!</li>
              <li>Our respect for your privacy is somewhat existent.</li>
            </ul>
          </div>

          <div className="mb-8">
            <AccordionItem title="What data do we collect?">
              <p>We collect all the data we can get our hands on, including but not limited to your deepest thoughts, dreams, and that embarrassing thing you did in third grade.</p>
            </AccordionItem>
            <AccordionItem title="How do we use your data?">
              <p>We use your data for everything from improving our services to predicting the next meme trend. Don't worry, we won't sell it... unless someone offers us a really good deal.</p>
            </AccordionItem>
            <AccordionItem title="How do we protect your data?">
              <p>We protect your data with the latest security measures, including a very intimidating "Keep Out" sign on our server room door.</p>
            </AccordionItem>
          </div>

          <div className="bg-white/5 p-4 rounded-lg mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
              <FileText className="w-6 h-6 mr-2" />
              Cookie Policy
            </h2>
            <p className="text-gray-400">There are no fucking cookies you donut. I mean there are, in your appdata because it's a fucking browser. This website though doesn't store shit.</p>
          </div>

          <div className="bg-white/5 p-4 rounded-lg mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
              <Lock className="w-6 h-6 mr-2" />
              Fingerprinting Policy
            </h2>
            <p className="text-gray-400">WHAT THE FUCK DO YOU MEAN FINGERPRINTING POLICY</p>
          </div>

          <div className="text-center">
            <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md font-bold animate-bounce transition-colors">
              No devious trickery, pinkie promise
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
