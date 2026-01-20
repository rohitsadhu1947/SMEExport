'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function WelcomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const features = [
    {
      icon: '🌐',
      title: 'Global Market Access',
      description: 'Connect with international buyers and export markets worldwide'
    },
    {
      icon: '📊',
      title: 'Market Intelligence',
      description: 'Real-time insights on demand, trends, and pricing opportunities'
    },
    {
      icon: '💼',
      title: 'Compliance Made Easy',
      description: 'Streamlined registration and verification processes'
    },
    {
      icon: '💰',
      title: 'Government Schemes',
      description: 'Automatic detection and application of eligible subsidies and benefits'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Bank-linked accounts for seamless payment processing'
    },
    {
      icon: '📈',
      title: 'Growth Analytics',
      description: 'Track your performance and optimize your business strategy'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
                <span className="text-xl font-semibold text-white">A</span>
              </div>
              <span className="text-slate-900 text-lg font-semibold tracking-tight">Artisan Market</span>
            </div>
            <div className={`hidden md:flex items-center space-x-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <a href="#features" className="text-sm text-gray-600 hover:text-slate-900 transition-all duration-300 font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-slate-900 transition-all duration-300 font-medium">
                How It Works
              </a>
              <Button
                onClick={() => router.push('/register')}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div ref={heroRef} className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-6 leading-[1.1] tracking-tight transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Connect Artisans with
            <br />
            <span className="text-slate-700">Global Markets</span>
          </h1>
          <p className={`text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-light max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Empowering artisans and small-scale producers to access export-import markets
            with intelligent market insights and seamless compliance
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              onClick={() => router.push('/register')}
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl rounded-lg"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-10 py-5 text-lg font-semibold transition-all duration-300 rounded-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" ref={featuresRef} className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              A comprehensive platform designed to help artisans and manufacturers
              navigate global markets with confidence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer scroll-animate hover:border-slate-200 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-6 transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight transition-colors duration-300 group-hover:text-slate-700">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" ref={stepsRef} className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
              Simple 3-Step Process
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-light">
              Get started in minutes, not days
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { num: 1, title: 'Onboard & Verify', desc: 'Complete your profile, verify compliance, and link your bank account' },
                { num: 2, title: 'Configure Products', desc: 'Define your products with market intelligence and pricing insights' },
                { num: 3, title: 'Go to Market', desc: 'Submit production-ready products and connect with buyers' }
              ].map((step, index) => (
                <div key={index} className="text-center group scroll-animate" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-6 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight transition-colors duration-300 group-hover:text-slate-700">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 py-24">
        <div className="container mx-auto px-6 text-center scroll-animate">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            Ready to Expand Your Business?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Join thousands of artisans already using our platform to access global markets
          </p>
          <Button
            onClick={() => router.push('/register')}
            size="lg"
            className="bg-white text-slate-900 hover:bg-gray-100 px-12 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl rounded-lg"
          >
            Start Your Journey Today
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 text-gray-600 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">A</span>
                </div>
                <span className="text-slate-900 font-semibold text-lg tracking-tight">Artisan Market</span>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Empowering artisans worldwide to access global markets
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-wider">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="hover:text-slate-900 transition-colors font-light">Features</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors font-light">Pricing</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors font-light">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-wider">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-slate-900 transition-colors font-light">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors font-light">Contact Us</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors font-light">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-slate-900 transition-colors font-light">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors font-light">Terms of Service</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors font-light">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-500 font-light">© 2024 Artisan Market Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
