import { useState } from "react"
import { supabase } from "../lib/supabase"

type Props = {
  goBack: () => void
  goLogin: () => void
}

export default function Signup({ goBack, goLogin }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const signUp = async () => {
    setError("")
    
    // Validation
    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy")
      return
    }

    setLoading(true)
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) setError(error.message)
    else setSuccess(true)
    
    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !success) {
      signUp()
    }
  }

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "" }
    
    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 10) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    if (strength <= 2) return { strength: 33, label: "Weak", color: "bg-red-500" }
    if (strength <= 4) return { strength: 66, label: "Medium", color: "bg-yellow-500" }
    return { strength: 100, label: "Strong", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
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
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>

      {/* LEFT SIDE - BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-32 w-2 h-2 bg-white rounded-full opacity-50 animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-40 w-4 h-4 bg-white rounded-full opacity-30 animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative z-10">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium hover:translate-x-1 transform transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Start your free<br />14-day trial
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-md mb-12 animate-fade-in-delay">
            Join thousands of teams using Discord Copilot to automate support and scale their operations.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 transform hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white text-lg">No credit card required</span>
            </div>

            <div className="flex items-center gap-4 transform hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white text-lg">Full access to all features</span>
            </div>

            <div className="flex items-center gap-4 transform hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white text-lg">Cancel anytime</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-sm mb-4">Trusted by leading teams:</p>
            <div className="flex gap-6 opacity-80">
              <div className="text-white font-semibold hover:opacity-100 transition-opacity">TechCorp</div>
              <div className="text-white font-semibold hover:opacity-100 transition-opacity">DevHub</div>
              <div className="text-white font-semibold hover:opacity-100 transition-opacity">CloudScale</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-100 text-sm">
          Already have an account?{' '}
          <button onClick={goLogin} className="text-white font-semibold hover:underline">
            Sign in
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - SIGNUP FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile back button */}
          <button
            onClick={goBack}
            className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          {success ? (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-slow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Welcome aboard! 🎉
              </h2>
              
              <p className="text-gray-600 mb-2">
                Account created successfully.
              </p>
              
              <p className="text-gray-600 mb-8">
                We've sent a verification email to <strong>{email}</strong>
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-blue-900 mb-2">What's next?</h3>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Check your email and verify your account</li>
                  <li>Connect your Discord server</li>
                  <li>Configure your AI assistant</li>
                </ol>
              </div>

              <button
                onClick={goLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all mb-4 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Go to Login
              </button>

              <button
                onClick={() => setSuccess(false)}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Didn't receive the email?
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Create Admin Account
                </h1>
                <p className="text-gray-600">
                  Set up access to manage your Discord Copilot
                </p>
              </div>

              <div className="space-y-5">
                <div className="transform hover:scale-102 transition-transform">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
                      placeholder="admin@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </div>

                <div className="transform hover:scale-102 transition-transform">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  {password && (
                    <div className="mt-2 animate-fade-in">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Password strength:</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength.label === 'Weak' ? 'text-red-600' :
                          passwordStrength.label === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Use 6+ characters with a mix of letters and numbers
                      </p>
                    </div>
                  )}
                </div>

                <div className="transform hover:scale-102 transition-transform">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 cursor-pointer"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-shake">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  onClick={signUp}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-50 text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95 hover:border-blue-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Google</span>
                  </button>

                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95 hover:border-gray-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">GitHub</span>
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{' '}
                  <button onClick={goLogin} className="text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline">
                    Sign in
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}