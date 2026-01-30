import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function SignInPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(formData.email, formData.password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/profile')
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{background: 'linear-gradient(135deg, #f5fcfc 0%, #e8f7f7 50%, #ffffff 100%)'}}>
      <div className="flex-grow flex items-center justify-center px-8 py-12">
        <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#6bd1d1'}}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-2xl font-semibold text-gray-900">CalmHabit</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                  style={{accentColor: '#6bd1d1'}}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium transition-colors" style={{color: '#6bd1d1'}}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              style={{backgroundColor: '#6bd1d1'}}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#5bc1c1')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6bd1d1'}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium transition-colors" style={{color: '#6bd1d1'}}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-sm text-gray-600">© 2026 CalmHabit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default SignInPage
