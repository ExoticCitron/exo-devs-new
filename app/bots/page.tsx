'use client'

import { useState } from 'react'
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
    name: "Arcane",
    description: "The Best Discord Bot. No questions asked...",
    memberCount: 50000000,
    image: "https://media.discordapp.net/attachments/1271860096791740519/1300774723981938769/Untitled.png?ex=6722105d&is=6720bedd&hm=02903a2371db648c31086e3fc00b5346bc0f0a1999046fe72616609ee582adee&=&format=webp&quality=lossless&height=100&width=100",
    verified: true,
    website: "https://arcane.bot"
  },
  {
    id: 2,
    name: "Xenon",
    description: "Keep your server safe with advanced backup tools.",
    memberCount: 7500000,
    image: "https://media.discordapp.net/attachments/1276963109554098216/1300776185340629033/Untitled.png?ex=672211b9&is=6720c039&hm=09c0d37e0b2940dcdd416e7159509d9a1e07e3c65e5462adab9968f9c0b6be5b&=&format=webp&quality=lossless&height=100&width=100",
    verified: true,
    website: "https://xenon.bot"
  },
  {
    id: 3,
    name: "Division",
    description: "Algorithm powered anti-nuke service.",
    memberCount: 3000000,
    image: "https://cdn.discordapp.com/avatars/1175862600127500388/822fb1ca0db2897b2e3ee6d265f20e7b.png?height=100&width=100",
    verified: true,
    website: "https://exo-devs.tech/"
  },
  {
    id: 4,
    name: "WelcomeBot",
    description: "Greet new members with customizable welcome messages.",
    memberCount: 100000,
    image: "https://media.discordapp.net/attachments/1276963109554098216/1300776768537497611/images.png?ex=67221244&is=6720c0c4&hm=80b5f44ad38c4ae7a495357d7f10cf0d11e90501f1ab1328a494a285be09c13b&=&format=webp&quality=lossless&height=100&width=100",
    verified: false
  }
]

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gray-300 opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            animation: `float ${Math.random() * 10 + 5}s linear infinite`,
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
              className={`w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${isLogoHovered ? 'scale-110' : ''}`}
            >
              <Settings className={`w-6 h-6 text-blue-100 transition-all duration-300 ease-in-out ${isLogoHovered ? 'animate-spin' : ''}`} />
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
                  <img src={bot.image} alt={bot.name} className="w-24 h-24 rounded-full border-2 border-gray-300 p-1 bg-gray-900" />
                  <div className={`${isGridView ? 'text-center' : 'text-left'}`}>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                      {bot.name}
                    </CardTitle>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        {bot.verified ? (
                          <CheckCircle2 className="w-4 h-4 mr-1 text-blue-400" />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-1" />
                        )}
                        {bot.memberCount.toLocaleString()} members
                      </Badge>
                      {bot.website && (
                        <a
                          href={bot.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                          <Globe className="w-5 h-5 hover:glow-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{bot.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white/20">
                    View Bot
                  </Button>
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
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  )
}
