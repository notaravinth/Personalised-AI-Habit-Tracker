import Navbar from '../../components/Navbar/Navbar'

function HomePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Futuristic Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-teal-hover/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: 'linear-gradient(rgba(107, 209, 209, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 209, 209, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">
          {/* Hero Section */}
          <section className="text-center py-16 mb-24">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-primary via-teal-hover to-teal-primary mb-6 leading-tight tracking-tight animate-glow" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              MAKE 2026 YOUR MOST<br />
              <span className="text-gray-100">SUCCESSFUL YEAR EVER</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Discover HabitFlow – the next-generation app that helps you build positive life-changing habits. 
              Effortlessly track your habits, reach your personal goals, and stay motivated every day.
            </p>
            <button className="relative bg-gradient-to-r from-teal-primary to-teal-hover text-black text-xl font-bold px-16 py-5 rounded-full hover:from-teal-hover hover:to-teal-primary transform hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(107,209,209,0.5)] hover:shadow-[0_0_50px_rgba(107,209,209,0.8)] overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-hover to-teal-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* Social Proof */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="text-center bg-gray-950/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-teal-primary/20">
                <div className="text-2xl font-black text-teal-primary" style={{ fontFamily: 'Orbitron, sans-serif' }}>4.8★</div>
                <div className="text-xs">App Store Rating</div>
              </div>
              <div className="text-center bg-gray-950/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-teal-primary/20">
                <div className="text-2xl font-black text-teal-primary" style={{ fontFamily: 'Orbitron, sans-serif' }}>1M+</div>
                <div className="text-xs">Active Users</div>
              </div>
              <div className="text-center bg-gray-950/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-teal-primary/20">
                <div className="text-2xl font-black text-teal-primary" style={{ fontFamily: 'Orbitron, sans-serif' }}>FEATURED</div>
                <div className="text-xs">by Top Platforms</div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="space-y-24 mb-24">
            {/* Feature 1 - Habit Building */}
            <div className="flex flex-col md:flex-row items-center gap-12 animate-fadeInUp">
              <div className="md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-primary to-teal-hover rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
                    alt="Habit Building" 
                    className="relative w-full rounded-3xl border border-teal-primary/20 brightness-50 group-hover:brightness-75 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="md:w-1/2 space-y-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-4xl font-black text-gray-100 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  HABIT BUILDING &<br />MANAGEMENT
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Easily set goals and manage your habits with our intuitive and user-friendly interface. 
                  Dive into our extensive library of customizable habit templates that offer an extra dose 
                  of inspiration for creating your new daily routines.
                </p>
              </div>
            </div>

            {/* Feature 2 - Statistics */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-hover to-teal-primary rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                    alt="Statistics" 
                    className="relative w-full rounded-3xl border border-teal-primary/20 brightness-50 group-hover:brightness-75 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="md:w-1/2 space-y-5 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-4xl font-black text-gray-100 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  STATISTICS
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Monitor your progress with detailed analytics and visualizations with our advanced 
                  habit-tracking feature. Develop a consistent routine of completing your goals and 
                  celebrate your achievements with rewarding milestones.
                </p>
              </div>
            </div>

            {/* Feature 3 - Smart Reminders */}
            <div className="flex flex-col md:flex-row items-center gap-12 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-primary to-teal-hover rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" 
                    alt="Smart Reminders" 
                    className="relative w-full rounded-3xl border border-teal-primary/20 brightness-50 group-hover:brightness-75 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="md:w-1/2 space-y-5 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-4xl font-black text-gray-100 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  SMART REMINDERS
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  HabitFlow ensures you stay on top of your daily tasks with time-specific reminders 
                  that fit your lifestyle. Never miss a step in your habit-building journey by getting 
                  timely prompts to achieve your daily goals.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-20 bg-gray-950 rounded-[3rem] border border-teal-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-primary/5 to-teal-hover/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-primary to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-primary to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-5xl font-black text-gray-100 mb-6 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                BUILD AND TRACK HABITS<br />THAT CAN CHANGE YOUR LIFE
              </h2>
              <p className="text-xl text-teal-primary mb-10 font-semibold">Try free for a week</p>
              <button className="bg-gradient-to-r from-teal-primary to-teal-hover text-black text-xl font-bold px-16 py-5 rounded-full hover:from-teal-hover hover:to-teal-primary transform hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(107,209,209,0.5)] hover:shadow-[0_0_50px_rgba(107,209,209,0.8)]">
                Start Free Trial
              </button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-black border-t border-teal-primary/10 py-12 mt-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center space-y-4">
              <div className="text-2xl font-black mb-6 text-teal-primary" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em' }}>HABITFLOW</div>
              <p className="text-gray-600">&copy; 2026 HabitFlow. All rights reserved.</p>
              <div className="flex justify-center gap-8 text-sm text-gray-700">
                <a href="#" className="hover:text-teal-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-teal-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-teal-primary transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default HomePage
