import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const DashboardNavbar = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const getInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || 'U'
    return name.charAt(0).toUpperCase()
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-gray-900 font-medium hover:opacity-70 transition-opacity"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/analytics')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Analytics
            </button>
            <button 
              onClick={() => navigate('/friends')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Friends
            </button>
            <button 
              onClick={() => navigate('/habits')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Habits
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Profile
            </button>
          </div>

          {/* User Avatar & Dropdown */}
          <div className="relative group">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{backgroundColor: '#6bd1d1'}}>
              {getInitials()}
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{user?.user_metadata?.full_name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Settings
                </button>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavbar
