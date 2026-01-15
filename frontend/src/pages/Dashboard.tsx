import { useState } from "react"
import { supabase } from "../lib/supabase"
import SystemPromptForm from "../components/SystemPromptForm"
import ChannelAllowlist from "../components/ChannelAllowlist"
import MemoryViewer from "../components/MemoryViewer"

type Props = {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: Props) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative z-10">
        {/* HEADER */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Discord Copilot Admin</h1>
                  <p className="text-sm text-gray-500">Configure AI behavior and runtime controls</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-green-50 border border-green-200 rounded-lg transform hover:scale-105 transition-transform">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-sm font-medium text-green-700">Bot Active</span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all transform hover:scale-105"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold text-sm">AD</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fade-in">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">Admin User</div>
                        <div className="text-xs text-gray-500">admin@company.com</div>
                      </div>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 flex items-center gap-2 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Account Settings
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 flex items-center gap-2 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Preferences
                      </button>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button 
                          onClick={() => {
                            supabase.auth.signOut()
                            onLogout()
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="max-w-7xl mx-auto px-8 py-8 space-y-6">
          {/* SYSTEM PROMPT */}
          <section className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:scale-102">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg transform hover:rotate-6 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-1">System Instructions</h2>
                  <p className="text-sm text-gray-600">
                    Define the AI's personality, tone, and rules.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <SystemPromptForm />
            </div>
          </section>

          {/* CHANNEL ALLOWLIST */}
          <section className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:scale-102">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg transform hover:rotate-6 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-1">Allowed Channel IDs</h2>
                  <p className="text-sm text-gray-600">
                    The bot will only respond in these Discord channels.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ChannelAllowlist />
            </div>
          </section>

          {/* MEMORY */}
          <section className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:scale-102">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg transform hover:rotate-6 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent mb-1">Conversation Memory</h2>
                  <p className="text-sm text-gray-600">
                    Rolling summary used by the AI for context.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <MemoryViewer />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}