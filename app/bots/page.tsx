'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid, List, Sparkles, CheckCircle2, Globe, ChevronDown, Settings } from "lucide-react"

const initialBots = [
  {
    id: 1,
    name: "xDefender",
    description: "The Best Discord Bot. No questions asked...",
    memberCount: 3500,
    image: "https://cdn.discordapp.com/avatars/1175862600127500388/822fb1ca0db2897b2e3ee6d265f20e7b.png?height=100&width=100",
    verified: false,
    website: "https://exo-devs.tech"
  },
  {
    id: 2,
    name: "FluxBackup",
    description: "Keep your server safe with advanced backup tools - soon",
    memberCount: 0,
    image: "https://i.pinimg.com/736x/4f/f7/7b/4ff77b4cadd5ef2e596b25f2cc5b1b8a.jpg?height=100&width=100",
    verified: false
    },
  {
    id: 3,
    name: "Division",
    description: "Algorithm powered anti-nuke service.",
    memberCount: 750,
    image: "https://cdn.discordapp.com/avatars/1175862600127500388/822fb1ca0db2897b2e3ee6d265f20e7b.png?height=100&width=100",
    verified: true,
    website: "https://exo-devs.tech/"
  },
  {
    id: 4,
    name: "Sequence [SOON]",
    description: "Greet new members with customizable welcome messages.",
    memberCount: 0,
    image: "https://i.pinimg.com/736x/4f/f7/7b/4ff77b4cadd5ef2e596b25f2cc5b1b8a.jpg?height=100&width=100",
    verified: false
  }
]

const ParticleBackground = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        duration: `${Math.random() * 10 + 5}s`
      }))
    }

    setParticles(generateParticles())
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gray-300 opacity-10"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.width,
            height: particle.height,
            animation: `float ${particle.duration} linear infinite`
          }}
        />
      ))}
    </div>
  )
}

export default function MetallicDiscordBotDashboard() {
  const [bots, setBots] = useState(initialBots)
  const [searchTerm, setSearchTerm] = useState('')
  const [isGridView, setIsGridView] = useState(true)
  const [sortBy, setSortBy] = useState('name')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const filteredAndSortedBots = bots
    .filter(bot =>
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'members') return b.memberCount - a.memberCount
      return 0
    })

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 flex-grow">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4 transition-all duration-300 ease-in-out"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
            <div 
              className={`w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${isLogoHovered ? 'scale-110 shadow-lg shadow-blue-500/50' : ''}`}
            >
              <Settings className={`w-6 h-6 text-blue-100 transition-all duration-300 ease-in-out ${isLogoHovered ? 'animate-spin-slow' : ''}`} />
            </div>
            <span className={`text-2xl font-bold text-blue-300 transition-all duration-300 ease-in-out ${isLogoHovered ? 'scale-110' : ''}`}>Division</span>
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

        <div className="container mx-auto p-4 relative">
          <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300">
            Discord Bot Showcase
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search bots..."
                className="pl-10 bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-gray-300 focus:ring-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="members">Sort by Members</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsGridView(!isGridView)}
                className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-800 hover:border-white hover:text-white transition-colors duration-200"
              >
                {isGridView ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredAndSortedBots.map(bot => (
              <Card key={bot.id} className="bg-gradient-to-br from-gray-900 to-black border-0 transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden shadow-[0_0_0_3px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_3px_rgba(255,255,255,0.2),0_0_20px_rgba(255,255,255,0.2)]">
                <CardHeader className={`flex ${isGridView ? 'flex-col' : 'flex-row'} items-center space-y-4 md:space-y-0 md:space-x-4`}>
                  <div className="relative">
                    <img src={bot.image} alt={bot.name} className="w-24 h-24 rounded-full border-2 border-gray-300 p-1 bg-gray-900 object-cover" />
                    {bot.verified && (
                      <div className="absolute bottom-0 right-0">
                        <div className="group/verified relative">
                          <CheckCircle2 className="w-6 h-6 text-blue-400 bg-gray-900 rounded-full p-1 border-2 border-gray-300 glow-white" />
                          <span className="absolute bottom-full right-0 mb-2 hidden group-hover/verified:block bg-gray-700 text-white text-xs py-1 px-2 rounded pointer-events-none">Division LLC</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`${isGridView ? 'text-center' : 'text-left'} flex-grow`}>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                      {bot.name}
                    </CardTitle>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        <Sparkles className="w-4 h-4 mr-1" />
                        {bot.memberCount.toLocaleString()} members
                      </Badge>
                      {bot.website && (
                        <div className="relative group/website">
                          <a
                            href={bot.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors duration-200"
                          >
                            <Globe className="w-5 h-5 hover:glow-white" />
                          </a>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover/website:block bg-gray-700 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none">Website</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{bot.description}</p>
                </CardContent>
                <CardFooter className={`${isGridView ? '' : 'pr-4'}`}>
                  <a
                    href={bot.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full ${isGridView ? '' : 'max-w-[200px]'}`}
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 glow-button">
                      View Bot
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-gray-950 py-12">
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
                <li><Link  href="/" className="text-blue-200 hover:text-blue-100 transition-colors">Support</Link></li>
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
              <h3 className="text-xl font-bold mb-4 text-blue-300">Add Your Bot</h3>
              <p  className="text-blue-100">
                Want to showcase your bot here? Message <span className="font-bold text-white">@exoticcitron</span> on Discord to get your bot listed!
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-blue-200">&copy; 2024 Division. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(0, -20px);
          }
          75% {
            transform: translate(-10px, -10px);
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3.5s linear infinite;
        }
        .glow-white {
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7));
        }
        .glow-button {
          position: relative;
          overflow: hidden;
        }
        .glow-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .glow-button:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
