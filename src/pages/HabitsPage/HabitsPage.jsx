import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar'

function HabitsPage() {
  const { user } = useAuth()
  const [habits, setHabits] = useState([])
  const [habitLogs, setHabitLogs] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadHabitsAndLogs()
    }
  }, [user])

  const loadHabitsAndLogs = async () => {
    try {
      setLoading(true)
      
      // Load habits
      const { data: habitsData, error: habitsError } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (habitsError) throw habitsError

      // Load logs for the past 7 days
      const today = new Date()
      const sevenDaysAgo = new Date(today)
      sevenDaysAgo.setDate(today.getDate() - 6)

      const { data: logsData, error: logsError } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('log_date', sevenDaysAgo.toISOString().split('T')[0])
        .lte('log_date', today.toISOString().split('T')[0])

      if (logsError) throw logsError

      // Organize logs by habit_id and date
      const logsMap = {}
      logsData?.forEach(log => {
        if (!logsMap[log.habit_id]) {
          logsMap[log.habit_id] = {}
        }
        logsMap[log.habit_id][log.log_date] = log.status
      })

      setHabits(habitsData || [])
      setHabitLogs(logsMap)
    } catch (error) {
      console.error('Error loading habits:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const logHabit = async (habitId, status) => {
    try {
      const today = new Date().toISOString().split('T')[0]

      const { error } = await supabase
        .from('habit_logs')
        .upsert({
          user_id: user.id,
          habit_id: habitId,
          log_date: today,
          status: status
        }, {
          onConflict: 'user_id,habit_id,log_date'
        })

      if (error) throw error

      // Update local state
      setHabitLogs(prev => ({
        ...prev,
        [habitId]: {
          ...prev[habitId],
          [today]: status
        }
      }))
    } catch (error) {
      console.error('Error logging habit:', error.message)
    }
  }

  const getLast7Days = () => {
    const days = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      days.push({
        date: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short' })
      })
    }
    
    return days
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'did-it':
        return '#6bd1d1' // Completed - teal
      case 'little-bit':
        return '#fbbf24' // Partial - yellow
      case 'not-today':
        return '#ef4444' // Not completed - red
      default:
        return '#e5e7eb' // No data - gray
    }
  }

  const getTodayStatus = (habitId) => {
    const today = new Date().toISOString().split('T')[0]
    return habitLogs[habitId]?.[today] || null
  }

  const days = getLast7Days()

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f8fafa'}}>
      <DashboardNavbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Habits</h1>
          <p className="text-gray-600">Track and manage all your habits in one place</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading your habits...</p>
          </div>
        ) : habits.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">You haven't added any habits yet</p>
            <p className="text-gray-500">Go to your profile to add your first habit!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {habits.map((habit) => {
              const todayStatus = getTodayStatus(habit.id)
              
              return (
                <div
                  key={habit.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  {/* Habit Info and Weekly Streak in One Line */}
                  <div className="mb-6 flex items-center gap-8">
                    {/* Left: Title and Description */}
                    <div className="flex items-center gap-3 min-w-[300px]">
                      <h3 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
                        {habit.title}
                      </h3>
                      {habit.description && (
                        <span className="text-gray-600 text-sm">
                          — {habit.description}
                        </span>
                      )}
                    </div>

                    {/* Right: Weekly Progress */}
                    <div className="flex-1 flex items-center gap-4">
                      <div className="flex gap-2 flex-1">
                        {days.map((day) => {
                          const status = habitLogs[habit.id]?.[day.date]
                          return (
                            <div key={day.date} className="flex-1 text-center">
                              <div className="text-xs text-gray-600 mb-2">{day.label}</div>
                              <div
                                className="h-12 rounded-lg transition-all"
                                style={{backgroundColor: getStatusColor(status)}}
                                title={status || 'Not logged'}
                              />
                            </div>
                          )
                        })}
                      </div>
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium flex-shrink-0"
                        style={{backgroundColor: '#e8f7f7', color: '#6bd1d1'}}
                      >
                        {habit.frequency}
                      </span>
                    </div>
                  </div>

                  {/* Today's Action Buttons */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">How did you do today?</h4>
                    <div className="flex gap-3">
                      <button
                        onClick={() => logHabit(habit.id, 'did-it')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                          todayStatus === 'did-it'
                            ? 'text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                        style={todayStatus === 'did-it' ? {backgroundColor: '#6bd1d1'} : {}}
                      >
                        ✓ Completed
                      </button>
                      <button
                        onClick={() => logHabit(habit.id, 'little-bit')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                          todayStatus === 'little-bit'
                            ? 'text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                        style={todayStatus === 'little-bit' ? {backgroundColor: '#fbbf24'} : {}}
                      >
                        ~ Partially
                      </button>
                      <button
                        onClick={() => logHabit(habit.id, 'not-today')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                          todayStatus === 'not-today'
                            ? 'text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                        style={todayStatus === 'not-today' ? {backgroundColor: '#ef4444'} : {}}
                      >
                        ✗ Not Today
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default HabitsPage
