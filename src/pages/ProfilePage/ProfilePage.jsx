import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar'

function ProfilePage() {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    bio: '',
    avatar: ''
  })
  
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    frequency: 'daily'
  })

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleHabitChange = (e) => {
    setNewHabit({
      ...newHabit,
      [e.target.name]: e.target.value
    })
  }

  const addHabit = () => {
    if (newHabit.title.trim()) {
      setHabits([...habits, { ...newHabit, id: Date.now() }])
      setNewHabit({ title: '', description: '', frequency: 'daily' })
    }
  }

  const removeHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  const handleSaveProfile = () => {
    // Will connect to Supabase later
    console.log('Profile Data:', profileData)
    console.log('Habits:', habits)
    alert('Profile saved! (Database integration coming soon)')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Tell us about yourself and set up your habits to get started.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  style={{focusRing: '#6bd1d1'}}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio (Optional)
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
                  style={{focusRing: '#6bd1d1'}}
                  placeholder="Tell us a bit about yourself and your goals..."
                />
              </div>

              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar URL (Optional)
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  value={profileData.avatar}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  style={{focusRing: '#6bd1d1'}}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Habits Setup */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Habits</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="habitTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Habit Name
                </label>
                <input
                  type="text"
                  id="habitTitle"
                  name="title"
                  value={newHabit.title}
                  onChange={handleHabitChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  style={{focusRing: '#6bd1d1'}}
                  placeholder="e.g., Morning Meditation"
                />
              </div>

              <div>
                <label htmlFor="habitDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="habitDescription"
                  name="description"
                  value={newHabit.description}
                  onChange={handleHabitChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  style={{focusRing: '#6bd1d1'}}
                  placeholder="10 minutes of mindfulness..."
                />
              </div>

              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={newHabit.frequency}
                  onChange={handleHabitChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  style={{focusRing: '#6bd1d1'}}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <button
                onClick={addHabit}
                className="w-full text-white font-medium px-6 py-3 rounded-lg transition-colors"
                style={{backgroundColor: '#6bd1d1'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5bc1c1'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6bd1d1'}
              >
                Add Habit
              </button>
            </div>

            {/* Habits List */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Your Habit List ({habits.length})</h3>
              {habits.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">No habits added yet. Add your first habit above!</p>
              ) : (
                habits.map((habit) => (
                  <div key={habit.id} className="flex items-start justify-between p-4 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors" style={{borderColor: habits.length > 0 ? '' : '#e5e7eb'}}>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{habit.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                      <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full" style={{backgroundColor: '#e8f7f7', color: '#6bd1d1'}}>
                        {habit.frequency}
                      </span>
                    </div>
                    <button
                      onClick={() => removeHabit(habit.id)}
                      className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSaveProfile}
            className="text-white font-semibold px-16 py-4 rounded-lg transition-colors text-lg shadow-lg"
            style={{backgroundColor: '#6bd1d1'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5bc1c1'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6bd1d1'}
          >
            Save Profile & Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
