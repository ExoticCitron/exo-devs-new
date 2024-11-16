'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, MessageCircle, BarChart, Shield, Music, Gift, Users, Bell, ChevronRight, ChevronLeft, Moon, Sun, LogOut, Server, ChevronDown, Zap } from 'lucide-react'
import Link from 'next/link'
import { Session } from 'next-auth'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Server {
  id: string
  name: string
  icon: string
  approximate_member_count: number
  permissions: string
}

interface DashboardProps {
  session: Session | null
}

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
)

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
)

const SidebarItem = ({ icon: Icon, label, isActive, onClick }: { icon: React.ElementType, label: string, isActive: boolean, onClick: () => void }) => (
  <motion.div
    className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer ${
      isActive ? 'bg-blue-600 bg-opacity-50' : 'hover:bg-gray-800 hover:bg-opacity-50'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-6 h-6 text-blue-300" />
    <span className="text-blue-100">{label}</span>
  </motion.div>
)

const ToggleSwitch = ({ isOn, onToggle }: { isOn: boolean, onToggle: () => void }) => (
  <motion.div
    className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
      isOn ? 'bg-blue-600' : 'bg-gray-700'
    }`}
    onClick={onToggle}
  >
    <motion.div
      className="w-6 h-6 bg-white rounded-full shadow-md"
      layout
      transition={spring}
    />
  </motion.div>
)

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
}

const ServerCard = ({ server, isSelected, onClick, canManage }: { server: Server, isSelected: boolean, onClick: (server: Server) => void, canManage: boolean }) => (
  <motion.div
    className={`bg-gray-800 bg-opacity-50 p-6 rounded-lg cursor-pointer ${
      isSelected ? 'ring-4 ring-blue-500 ring-opacity-75' : ''
    } ${canManage ? '' : 'opacity-50 cursor-not-allowed'}`}
    whileHover={canManage ? { scale: 1.05 } : {}}
    whileTap={canManage ? { scale: 0.95 } : {}}
    onClick={() => canManage && onClick(server)}
  >
    <div className="flex items-center space-x-4">
      <img src={server.icon} alt={server.name} className="w-16 h-16 rounded-full" />
      <div>
        <h3 className="text-xl font-bold text-blue-300">{server.name}</h3>
        <p className="text-blue-100">{server.approximate_member_count} members</p>
        {!canManage && <p className="text-red-400 text-sm">No management permissions</p>}
      </div>
    </div>
  </motion.div>
)

export default function Dashboard({ session }: DashboardProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)
  const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false)
  const [isServerConfirmed, setIsServerConfirmed] = useState(false)
  const [userServers, setUserServers] = useState<Server[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    const fetchUserServers = async () => {
      if (session) {
        try {
          const response = await fetch('/api/getUserServers')
          if (response.ok) {
            const data = await response.json()
            setUserServers(data.servers)
          } else {
            console.error('Failed to fetch user servers')
          }
        } catch (error) {
          console.error('Error fetching user servers:', error)
        }
      }
    }

    fetchUserServers()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [session])

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const toggleServerDropdown = () => setIsServerDropdownOpen(!isServerDropdownOpen)

  const confirmServerSelection = () => {
    if (selectedServer) {
      setIsServerConfirmed(true)
    }
  }

  const handleServerSelect = (server: Server) => {
    setSelectedServer(server)
  }

  const canManageServer = (server: Server) => {
    const permissions = BigInt(server.permissions)
    return (permissions & BigInt(0x20)) === BigInt(0x20) // Check for MANAGE_SERVER permission
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDarkMode ? 'bg-gray-950' : 'bg-gray-100'} text-white overflow-hidden relative transition-colors duration-300`}
    >
      <BackgroundBubble size={300} position={{ x: '10%', y: '20%' }} color={isDarkMode ? "bg-blue-900" : "bg-blue-200"} />
      <BackgroundBubble size={200} position={{ x: '80%', y: '50%' }} color={isDarkMode ? "bg-blue-800" : "bg-blue-300"} />
      <BackgroundBubble size={150} position={{ x: '50%', y: '70%' }} color={isDarkMode ? "bg-blue-700" : "bg-blue-400"} />
      
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: `${mousePosition.x / 5}px ${mousePosition.y / 5}px`,
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%237289DA" fill-opacity="0.2" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {!isServerConfirmed ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg max-w-2xl w-full">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Select a Server</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {userServers.map((server) => (
                <ServerCard
                  key={server.id}
                  server={server}
                  isSelected={selectedServer && selectedServer.id === server.id}
                  onClick={handleServerSelect}
                  canManage={canManageServer(server)}
                />
              ))}
            </div>
            <motion.button
              className={`w-full py-3 rounded-lg text-white font-bold text-lg ${
                selectedServer && canManageServer(selectedServer) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
              }`}
              whileHover={selectedServer && canManageServer(selectedServer) ? { scale: 1.05 } : {}}
              whileTap={selectedServer && canManageServer(selectedServer) ? { scale: 0.95 } : {}}
              onClick={confirmServerSelection}
              disabled={!selectedServer || !canManageServer(selectedServer)}
            >
              Confirm Selection
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="flex h-screen relative z-10">
          {/* Sidebar */}
          <motion.div
            className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} ${
              isSidebarCollapsed ? 'w-20' : 'w-64'
            } h-full flex flex-col justify-between transition-all duration-300 ease-in-out`}
            initial={false}
            animate={{ width: isSidebarCollapsed ? 80 : 256 }}
          >
            <div>
              <div className="p-4 flex items-center justify-between">
                <Link href="/" className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'} ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                  Division
                </Link>
                <motion.button
                  onClick={toggleSidebar}
                  className={`${isDarkMode ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </motion.button>
              </div>
              <nav className="mt-8">
                <SidebarItem
                  icon={BarChart}
                  label={isSidebarCollapsed ? '' : 'Overview'}
                  isActive={activeSection === 'overview'}
                  onClick={() => setActiveSection('overview')}
                />
                <SidebarItem
                  icon={MessageCircle}
                  label={isSidebarCollapsed ? '' : 'Commands'}
                  isActive={activeSection === 'commands'}
                  onClick={() => setActiveSection('commands')}
                />
                <SidebarItem
                  icon={Shield}
                  label={isSidebarCollapsed ? '' : 'Moderation'}
                  isActive={activeSection === 'moderation'}
                  onClick={() => setActiveSection('moderation')}
                />
                <SidebarItem
                  icon={Music}
                  label={isSidebarCollapsed ? '' : 'Music'}
                  isActive={activeSection === 'music'}
                  onClick={() => setActiveSection('music')}
                />
                <SidebarItem
                  icon={Gift}
                  label={isSidebarCollapsed ? '' : 'Rewards'}
                  isActive={activeSection === 'rewards'}
                  onClick={() => setActiveSection('rewards')}
                />
                <SidebarItem
                  icon={Users}
                  label={isSidebarCollapsed ? '' : 'Members'}
                  isActive={activeSection === 'members'}
                  onClick={() => setActiveSection('members')}
                />
                <SidebarItem
                  icon={Bell}
                  label={isSidebarCollapsed ? '' : 'Notifications'}
                  isActive={activeSection === 'notifications'}
                  onClick={() => setActiveSection('notifications')}
                />
                <SidebarItem
                  icon={Settings}
                  label={isSidebarCollapsed ? '' : 'Settings'}
                  isActive={activeSection === 'settings'}
                  onClick={() => setActiveSection('settings')}
                />
              </nav>
            </div>
            <div className="p-4">
              <motion.button
                onClick={toggleDarkMode}
                className={`${isDarkMode ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} w-full flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <Sun /> : <Moon />}
                {!isSidebarCollapsed && <span className="ml-2">Toggle Theme</span>}
              </motion.button>
              <motion.button
                className={`mt-4 ${isDarkMode ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} w-full flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedServer(null)
                  setIsServerConfirmed(false)
                }}
              >
                <LogOut />
                {!isSidebarCollapsed && <span className="ml-2">Change Server</span>}
              </motion.button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'} p-4 flex justify-between items-center`}>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Dashboard</h1>
              <div className="relative">
                <button
                  onClick={toggleServerDropdown}
                  className={`flex items-center space-x-2 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}
                >
                  {selectedServer && (
                    <>
                      <img
                        src={selectedServer.icon}
                        alt={selectedServer.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span>{selectedServer.name}</span>
                    </>
                  )}
                  <ChevronDown />
                </button>
                {isServerDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {userServers.filter(canManageServer).map((server) => (
                        <button
                          key={server.id}
                          onClick={() => {
                            setSelectedServer(server)
                            setIsServerDropdownOpen(false)
                          }}
                          className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-blue-100 hover:bg-gray-700' : 'text-blue-800 hover:bg-gray-300'} w-full text-left`}
                          role="menuitem"
                        >
                          {server.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            <main className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 'overview' && (
                    <div>
                      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Overview</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                          <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Total Members</h3>
                          <p className={`text-4xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            {selectedServer ? selectedServer.approximate_member_count : 'N/A'}
                          </p>
                        </div>
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                          <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Active Users</h3>
                          <p className={`text-4xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            {selectedServer ? Math.floor(selectedServer.approximate_member_count * 0.6) : 'N/A'}
                          </p>
                        </div>
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                          <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Messages Today</h3>
                          <p className={`text-4xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            {selectedServer ? Math.floor(selectedServer.approximate_member_count * 4.5) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className={`mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Activity Chart</h3>
                        <div className={`h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-lg flex items-center justify-center`}>
                          <span className={isDarkMode ? 'text-blue-300' : 'text-blue-600'}>Activity Chart Placeholder</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'commands' && (
                    <div>
                      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Commands</h2>
                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Available Commands</h3>
                        <ul className="space-y-2">
                          <li className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>!help - Display all available commands</li>
                          <li className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>!play [song] - Play a song or add it to the queue</li>
                          <li className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>!skip - Skip the current song</li>
                          <li className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>!stop - Stop the music and clear the queue</li>
                          <li className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>!ban @user - Ban a user from the server</li>
                          <li className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>!kick @user - Kick a user from the server</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeSection === 'moderation' && (
                    <div>
                      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Moderation</h2>
                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Moderation Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>Auto-moderate spam</span>
                            <ToggleSwitch isOn={true} onToggle={() => {}} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>Filter explicit content</span>
                            <ToggleSwitch isOn={false} onToggle={() => {}} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>Require verification for new members</span>
                            <ToggleSwitch isOn={true} onToggle={() => {}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'music' && (
                    <div>
                      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Music</h2>
                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Music Player</h3>
                        <div className={`h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-lg flex items-center justify-center`}>
                          <span className={isDarkMode ? 'text-blue-300' : 'text-blue-600'}>Music Player Placeholder</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'rewards' && (
                    <div>
                      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Rewards</h2>
                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Reward System</h3>
                        <p className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>Set up custom rewards for your most active members.</p>
                        <button className={`mt-4 px-4 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg`}>
                          Configure Rewards
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'members' && (
                    <div>
                      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Members</h2>
                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Member List</h3>
                        <div className={`h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-lg flex items-center justify-center`}>
                          <span className={isDarkMode ? 'text-blue-300' : 'text-blue-600'}>Member List Placeholder</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'notifications' && (
                    <div>
                      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Notifications</h2>
                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Notification Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>New member alerts</span>
                            <ToggleSwitch isOn={true} onToggle={() => {}} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>Moderation action alerts</span>
                            <ToggleSwitch isOn={true} onToggle={()=>{}} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>Server milestone notifications</span>
                            <ToggleSwitch isOn={false} onToggle={() => {}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'settings' && (
                    <div>
                      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Settings</h2>
                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-50 p-6 rounded-lg border border-blue-500 border-opacity-25`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-100' : 'text-blue-800'}`}>Bot Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label className={`block mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>Bot Prefix</label>
                            <input
                              type="text"
                              className={`w-full px-3 py-2 ${isDarkMode ? 'bg-gray-700 text-blue-100' : 'bg-gray-100 text-blue-800'} rounded-lg`}
                              placeholder="!"
                            />
                          </div>
                          <div>
                            <label className={`block mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>Default Channel</label>
                            <select
                              className={`w-full px-3 py-2 ${isDarkMode ? 'bg-gray-700 text-blue-100' : 'bg-gray-100 text-blue-800'} rounded-lg`}
                            >
                              <option>#general</option>
                              <option>#welcome</option>
                              <option>#announcements</option>
                            </select>
                          </div>
                          <button className={`mt-4 px-4 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg`}>
                            Save Settings
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      )}
      <SparkleEffect />
    </motion.div>
  )
}
