import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';

function Dashboard() {
  const navigate = useNavigate();
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0);
  const [reflection, setReflection] = useState('');
  const [energyLevel, setEnergyLevel] = useState(64);

  // Mock data - will be replaced with real data from Supabase later
  const userName = "Nika";
  const currentTime = new Date().getHours();
  
  const getGreeting = () => {
    if (currentTime < 12) return "Good morning";
    if (currentTime < 18) return "Good afternoon";
    return "Good evening";
  };

  // User's custom habits (will come from Supabase)
  const userHabits = [
    {
      id: 'user-1',
      title: "Practice Guitar",
      description: "Spend 20 minutes practicing scales and learning new songs.",
    },
    {
      id: 'user-2',
      title: "Call a Friend",
      description: "Connect with someone meaningful and nurture your relationships.",
    },
    {
      id: 'user-3',
      title: "Code Review",
      description: "Review and improve code quality for 30 minutes.",
    }
  ];

  // Basic starter habits (default recommendations)
  const starterHabits = [
    {
      id: 'starter-1',
      title: "Morning Meditation",
      description: "10 minutes of mindfulness to center your thoughts and set an intention for the day ahead.",
    },
    {
      id: 'starter-2',
      title: "Exercise",
      description: "30 minutes of physical activity to energize your body and boost your mood.",
    },
    {
      id: 'starter-3',
      title: "Read for 20 minutes",
      description: "Expand your knowledge and stimulate your mind with focused reading time.",
    },
    {
      id: 'starter-4',
      title: "Drink 8 glasses of water",
      description: "Stay hydrated throughout the day to maintain energy and focus.",
    },
    {
      id: 'starter-5',
      title: "Journal before bed",
      description: "Reflect on your day and process your thoughts through writing.",
    }
  ];

  const allHabits = [...userHabits, ...starterHabits];
  const currentFocusHabit = allHabits[currentFocusIndex];

  const handleHabitClick = () => {
    navigate('/habits');
  };

  const handlePreviousFocus = () => {
    setCurrentFocusIndex((prev) => (prev > 0 ? prev - 1 : allHabits.length - 1));
  };

  const handleNextFocus = () => {
    setCurrentFocusIndex((prev) => (prev < allHabits.length - 1 ? prev + 1 : 0));
  };

  const dailyProgress = {
    completed: 3,
    total: allHabits.length
  };

  const progressPercentage = (dailyProgress.completed / dailyProgress.total) * 100;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-light text-gray-900 mb-2">
            {getGreeting()}, {userName}.
          </h2>
          <p className="text-lg text-gray-600">Let's reflect on your day with kindness.</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Content - All Personalized Habits */}
          <div className="lg:col-span-2 space-y-6">
            {/* User's Personalized Habits */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-teal-primary" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Your Personalized Habits
                </h3>
              </div>

              <div className="space-y-4">
                {userHabits.map((habit) => (
                  <div
                    key={habit.id}
                    onClick={handleHabitClick}
                    className="p-5 rounded-xl border-2 border-gray-200 hover:border-teal-primary hover:bg-teal-primary/5 transition-all cursor-pointer"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {habit.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {habit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Starter Habits (Basic Recommendations) */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-gray-500" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Recommended Starter Habits
                </h3>
              </div>

              <div className="space-y-4">
                {starterHabits.map((habit) => (
                  <div
                    key={habit.id}
                    onClick={handleHabitClick}
                    className="p-5 rounded-xl border-2 border-gray-200 hover:border-teal-primary hover:bg-teal-primary/5 transition-all cursor-pointer"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {habit.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {habit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Focus Habit - Moved Down */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-teal-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Today's Focus
                  </h3>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {currentFocusIndex + 1} / {allHabits.length}
                </div>
              </div>
              
              <div className="relative">
                {/* Navigation Arrows */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handlePreviousFocus}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                    aria-label="Previous focus habit"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handleNextFocus}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                    aria-label="Next focus habit"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="px-12 text-center">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                    {currentFocusHabit.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {currentFocusHabit.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Energy Level Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h4 className="text-xs font-semibold tracking-wider text-teal-primary uppercase mb-6">
                Energy Level
              </h4>
              
              <div className="flex flex-col items-center mb-6">
                <div className="flex justify-between w-full mb-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Vibrant
                  </span>
                  <span className="text-2xl font-semibold text-gray-900">
                    {energyLevel}%
                  </span>
                </div>
                
                {/* Energy Bar */}
                <div className="w-16 h-48 bg-gray-100 rounded-full relative overflow-hidden mb-4">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-hover to-teal-primary rounded-full transition-all duration-300 flex items-start justify-center pt-2"
                    style={{ height: `${energyLevel}%` }}
                  >
                    <Zap className="w-5 h-5 text-white fill-white drop-shadow-md" />
                  </div>
                </div>
                
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Restorative
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-primary"
              />
            </div>

            {/* Reflection Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h4 className="text-xs font-semibold tracking-wider text-teal-primary uppercase mb-4">
                Reflect
              </h4>
              
              <textarea
                className="w-full p-3 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-teal-primary transition-colors text-gray-900 placeholder:text-gray-400"
                placeholder="How did this experience feel? (No pressure, just a few words...)"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Overall Progress Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Overall Daily Progress
            </h3>
            <p className="text-gray-600">
              You've completed <strong className="text-gray-900">{dailyProgress.completed} of your {dailyProgress.total}</strong> habits today
            </p>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-primary to-teal-hover rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xl font-semibold text-gray-900 min-w-[60px] text-right">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <p className="text-center text-gray-600 italic">
            "Great! It's not about being perfect, it's about showing up when you can."
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
