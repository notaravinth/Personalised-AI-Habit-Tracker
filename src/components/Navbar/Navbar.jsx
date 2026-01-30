import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#6bd1d1'}}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900">CalmHabit</span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/signin')}
              className="text-gray-900 font-medium transition-colors px-4 py-2" 
              onMouseEnter={(e) => e.currentTarget.style.color = '#6bd1d1'} 
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="text-white font-medium px-6 py-2 rounded-lg transition-colors" 
              style={{backgroundColor: '#6bd1d1'}} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5bc1c1'} 
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6bd1d1'}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
