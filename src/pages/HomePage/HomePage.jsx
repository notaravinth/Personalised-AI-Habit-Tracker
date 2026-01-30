import Navbar from '../../components/Navbar/Navbar'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 py-20 text-center relative">
          {/* Circular Gradient Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{background: 'radial-gradient(circle, rgba(107, 209, 209, 0.15) 0%, rgba(107, 209, 209, 0.05) 40%, transparent 70%)'}}></div>
          <p className="text-sm text-gray-500 mb-6 tracking-wide relative z-10">✨ TRACK YOUR JOURNEY - BUILD YOUR FUTURE</p>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 relative z-10">
            Grow at your<br />
            own pace.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
            Track your daily tasks, build consistent habits, and watch your streaks grow. A simple way to measure progress without overwhelming pressure.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-16 relative z-10">
            <button className="text-white font-medium px-8 py-3 rounded-lg transition-colors" style={{backgroundColor: '#6bd1d1'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5bc1c1'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6bd1d1'}>
              Start Tracking Today
            </button>
            <button className="bg-white text-gray-900 font-medium px-8 py-3 rounded-lg border-2 border-gray-200 transition-colors" onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6bd1d1'} onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}>
              View Demo
            </button>
          </div>

          {/* Placeholder Card */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-16 flex items-center justify-center relative z-10">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Everything You Need to Succeed</h2>
          <p className="text-center text-gray-600 mb-16">Simple, powerful tools to track your daily progress and build lasting habits.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Daily Progress Tracking */}
            <div className="rounded-2xl p-8 text-center" style={{backgroundColor: '#e8f7f7'}}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#6bd1d1'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Daily Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Check off your daily tasks and habits with ease. See exactly what you've accomplished each day with intuitive visual progress indicators.
              </p>
            </div>

            {/* Streak Monitoring */}
            <div className="rounded-2xl p-8 text-center" style={{backgroundColor: '#e8f7f7'}}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#6bd1d1'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Streak Monitoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Build momentum by tracking consecutive days of completion. Watch your streaks grow and stay motivated to maintain your progress.
              </p>
            </div>

            {/* Smart Analytics */}
            <div className="rounded-2xl p-8 text-center" style={{backgroundColor: '#e8f7f7'}}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#6bd1d1'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Gain insights into your habits with beautiful charts and statistics. Understand patterns and identify areas for improvement.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="max-w-4xl mx-auto px-8 py-20 text-center">
          <div className="mb-6">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24" style={{color: '#b8e8e8'}}>
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 italic mb-6 leading-relaxed">
            "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
          </blockquote>
          <p className="text-sm text-gray-600">— Aristotle, Ancient Greek Philosopher</p>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-8 py-20 mb-20">
          <div className="bg-gray-900 rounded-3xl px-12 py-20 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start building better habits today</h2>
            <p className="text-gray-300 mb-10 text-lg">
              Join 65,000+ users who are tracking their progress and achieving their goals every day.
            </p>
            <button className="text-white font-medium px-8 py-4 rounded-lg transition-colors text-lg" style={{backgroundColor: '#6bd1d1'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5bc1c1'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6bd1d1'}>
              Get Started Now
            </button>
            <p className="text-sm text-gray-400 mt-6">
              Free to try • No credit card required • Cancel anytime
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6 md:mb-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#6bd1d1'}}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-900">CalmHabit</span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-8 mb-6 md:mb-0">
                <a href="#" className="text-gray-600 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#6bd1d1'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Privacy</a>
                <a href="#" className="text-gray-600 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#6bd1d1'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Terms</a>
                <a href="#" className="text-gray-600 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#6bd1d1'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Contact</a>
                <a href="#" className="text-gray-600 transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#6bd1d1'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Resources</a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-colors" onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#6bd1d1'; e.currentTarget.style.color = 'white';}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '';}}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-colors" onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#6bd1d1'; e.currentTarget.style.color = 'white';}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '';}}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-colors" onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#6bd1d1'; e.currentTarget.style.color = 'white';}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '';}}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default HomePage
