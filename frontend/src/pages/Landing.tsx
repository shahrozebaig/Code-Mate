type Props = {
  goLogin: () => void
  goSignup: () => void
}

export default function Landing({ goLogin, goSignup }: Props) {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
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
        {/* NAVBAR */}
        <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discord Copilot
            </h1>

            <div className="flex gap-6 items-center">
              <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
              <button
                onClick={goLogin}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={goSignup}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-pulse">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
              Now serving 10,000+ Discord communities
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Enterprise AI Assistant for Discord Teams
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
              Empower your Discord server with an intelligent AI assistant that learns from your team, 
              maintains context across conversations, and provides instant, accurate responses—all 
              controlled from a centralized admin dashboard.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={goSignup}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg transform hover:scale-105 active:scale-95"
              >
                Start 14-Day Free Trial
              </button>

              <button
                onClick={goLogin}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-500 hover:bg-blue-50 transition-all text-lg transform hover:scale-105 active:scale-95"
              >
                Watch Demo
              </button>
            </div>

            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2 transform hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2 transform hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Setup in under 5 minutes
              </div>
              <div className="flex items-center gap-2 transform hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Cancel anytime
              </div>
            </div>
          </div>

          {/* DEMO IMAGE */}
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-gray-200 rounded-2xl p-8 shadow-2xl max-w-5xl mx-auto transform hover:scale-102 transition-transform">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm ml-4">Discord Copilot Dashboard</span>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 transform hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Active Responses</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 transform hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">98%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 transform hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1">2.3s</div>
                    <div className="text-sm text-gray-600">Avg Response Time</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">Discord Copilot</div>
                      <div className="text-gray-700 leading-relaxed">Based on your team's documentation, here's how to configure the deployment pipeline. The process involves three main steps: environment setup, credential configuration, and continuous integration...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST LOGOS */}
        <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider font-medium">Trusted by leading teams worldwide</p>
            <div className="flex justify-center items-center gap-12 flex-wrap opacity-40">
              <div className="text-2xl font-bold text-gray-800 hover:opacity-100 transition-opacity">TechCorp</div>
              <div className="text-2xl font-bold text-gray-800 hover:opacity-100 transition-opacity">InnovateLabs</div>
              <div className="text-2xl font-bold text-gray-800 hover:opacity-100 transition-opacity">DevHub</div>
              <div className="text-2xl font-bold text-gray-800 hover:opacity-100 transition-opacity">CloudScale</div>
              <div className="text-2xl font-bold text-gray-800 hover:opacity-100 transition-opacity">DataStream</div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Everything you need to manage AI at scale
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A comprehensive platform designed for teams that need powerful AI capabilities with enterprise-grade control and security.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon="⚡"
                title="Real-Time Admin Control"
                desc="Update your AI's personality, knowledge base, and response rules instantly without any downtime or redeployment. Changes take effect immediately across all channels."
              />
              <FeatureCard
                icon="🧠"
                title="Contextual Intelligence"
                desc="Advanced memory system that understands conversation history, references past discussions, and maintains context across multiple channels and time periods."
              />
              <FeatureCard
                icon="🔒"
                title="Channel-Level Permissions"
                desc="Granular control over where your AI can interact. Set permissions per channel, role, or user to ensure your AI only responds where it should."
              />
              <FeatureCard
                icon="📚"
                title="Custom Knowledge Base"
                desc="Upload your team's documentation, guides, and resources. Your AI learns from your content to provide accurate, company-specific answers."
              />
              <FeatureCard
                icon="📊"
                title="Analytics & Insights"
                desc="Track usage patterns, response accuracy, user satisfaction, and identify knowledge gaps with comprehensive analytics dashboards."
              />
              <FeatureCard
                icon="🔄"
                title="Seamless Integrations"
                desc="Connect with your existing tools including Jira, GitHub, Notion, and more. Pull data from multiple sources for comprehensive responses."
              />
              <FeatureCard
                icon="👥"
                title="Multi-Admin Support"
                desc="Collaborate with your team to manage the AI. Role-based access controls ensure everyone has the right level of permissions."
              />
              <FeatureCard
                icon="🎯"
                title="Smart Response Filtering"
                desc="Configure custom rules to filter, moderate, and approve AI responses before they're sent. Perfect for compliance-sensitive environments."
              />
              <FeatureCard
                icon="🌐"
                title="Multi-Language Support"
                desc="Support global teams with automatic language detection and translation. Your AI communicates in over 50 languages seamlessly."
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
                Get started in three simple steps
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From setup to deployment, we've made it incredibly easy to add intelligent AI assistance to your Discord server.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Connect Your Server"
                desc="Add Discord Copilot to your server with a single click. Our secure OAuth integration ensures your data stays protected."
              />
              <StepCard
                number="2"
                title="Configure & Train"
                desc="Set your AI's personality, upload knowledge bases, and define channel permissions through our intuitive admin dashboard."
              />
              <StepCard
                number="3"
                title="Launch & Monitor"
                desc="Activate your AI assistant and watch it engage with your team. Monitor performance and refine responses in real-time."
              />
            </div>

            <div className="mt-16 text-center">
              <button
                onClick={goSignup}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
              >
                Start Your Free Trial
              </button>
              <p className="text-sm text-gray-500 mt-4">Full access to all features • No credit card required</p>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Built for diverse team needs
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From customer support to internal knowledge sharing, Discord Copilot adapts to your workflow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <UseCaseCard
                title="Customer Support Teams"
                desc="Automate common questions, provide instant troubleshooting guides, and escalate complex issues to human agents seamlessly. Reduce response times from hours to seconds."
                benefits={["24/7 instant responses", "Reduced ticket volume", "Faster resolution times"]}
              />
              <UseCaseCard
                title="Engineering & DevOps"
                desc="Share deployment procedures, debug logs, and technical documentation. Your AI becomes the go-to resource for onboarding and troubleshooting."
                benefits={["Instant code references", "Automated debugging tips", "Onboarding acceleration"]}
              />
              <UseCaseCard
                title="Community Management"
                desc="Welcome new members, answer FAQ, enforce community guidelines, and keep conversations on track. Free up moderators to focus on meaningful engagement."
                benefits={["Automated welcomes", "FAQ handling", "Rule enforcement"]}
              />
              <UseCaseCard
                title="Sales & Marketing"
                desc="Provide product information, pricing details, and marketing collateral instantly. Empower your team with quick access to sales materials."
                benefits={["Product knowledge base", "Competitive insights", "Sales enablement"]}
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to transform your Discord experience?
            </h3>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of teams using Discord Copilot to automate support, share knowledge, 
              and build stronger communities. Start your free trial today—no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={goSignup}
                className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-xl text-lg transform hover:scale-105 active:scale-95"
              >
                Start 14-Day Free Trial
              </button>
              <button
                onClick={goLogin}
                className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all text-lg transform hover:scale-105 active:scale-95"
              >
                Schedule a Demo
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-8">
              Questions? Contact our sales team at sales@discordcopilot.com
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-300 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-5 gap-12 mb-12">
              <div className="md:col-span-2">
                <h4 className="text-white font-bold text-xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Discord Copilot</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Enterprise-grade AI assistant for Discord teams. Built for control, designed for scale, trusted by thousands.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-110">
                    <span className="text-lg">𝕏</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-110">
                    <span className="text-lg">in</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-110">
                    <span className="text-lg">▶</span>
                  </a>
                </div>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Product</h5>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Changelog</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Roadmap</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Resources</h5>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Guides</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-4">Company</h5>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2026 Discord Copilot, Inc. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-blue-400 transition-colors">Status</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Security</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

/* COMPONENT HELPERS */

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="font-bold text-xl mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  )
}

function StepCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md transform hover:scale-105 transition-transform">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
        {number}
      </div>
      <h4 className="font-bold text-xl mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  )
}

function UseCaseCard({ title, desc, benefits }: { title: string; desc: string; benefits: string[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all transform hover:scale-102">
      <h4 className="font-bold text-2xl mb-4 text-gray-900">{title}</h4>
      <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>
      <div className="space-y-2">
        {benefits.map((benefit, i) => (
          <div key={i} className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-700 text-sm">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}