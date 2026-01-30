import { useState } from 'react';
import { Target, Check, Minus, X, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar';

function Dashboard() {
  const [currentHabitIndex, setCurrentHabitIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('did-it');
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

  const todayHabits = [
    {
      title: "Morning Meditation",
      description: "10 minutes of mindfulness to center your thoughts and set an intention for the day ahead.",
    },
    {
      title: "Exercise",
      description: "30 minutes of physical activity to energize your body and boost your mood.",
    },
    {
      title: "Read for 20 minutes",
      description: "Expand your knowledge and stimulate your mind with focused reading time.",
    },
    {
      title: "Drink 8 glasses of water",
      description: "Stay hydrated throughout the day to maintain energy and focus.",
    },
    {
      title: "Journal before bed",
      description: "Reflect on your day and process your thoughts through writing.",
    }
  ];

  const currentHabit = todayHabits[currentHabitIndex];

  const handlePreviousHabit = () => {
    setCurrentHabitIndex((prev) => (prev > 0 ? prev - 1 : todayHabits.length - 1));
  };

  const handleNextHabit = () => {
    setCurrentHabitIndex((prev) => (prev < todayHabits.length - 1 ? prev + 1 : 0));
  };

  const dailyProgress = {
    completed: 3,
    total: 8
  };

  const progressPercentage = (dailyProgress.completed / dailyProgress.total) * 100;

  const handleSaveNext = () => {
    console.log('Saving:', { selectedOption, reflection, energyLevel });
    // TODO: Save to Supabase
  };

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
          {/* Current Focus Card - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-teal-primary" />
                <h3 className="text-xs font-semibold tracking-wider text-teal-primary uppercase">
                  Today's Focus Habits
                </h3>
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {currentHabitIndex + 1} / {todayHabits.length}
              </div>
            </div>
            
            <div className="mb-8 relative">
              {/* Navigation Arrows */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button
                  onClick={handlePreviousHabit}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                  aria-label="Previous habit"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button
                  onClick={handleNextHabit}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                  aria-label="Next habit"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="px-12">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                  {currentHabit.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {currentHabit.description}
                </p>
              </div>
            </div>

            {/* Check-in Options */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold tracking-wider text-gray-900 uppercase mb-3">
                How did it go?
              </h4>
              
              <button
                onClick={() => setSelectedOption('did-it')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedOption === 'did-it'
                    ? 'bg-teal-primary border-teal-primary text-white'
                    : 'bg-white border-gray-200 text-gray-900 hover:border-teal-primary hover:bg-teal-primary/5'
                }`}
              >
                <Check className="w-5 h-5" />
                <span className="font-medium">I did it</span>
              </button>
              
              <button
                onClick={() => setSelectedOption('little-bit')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedOption === 'little-bit'
                    ? 'bg-teal-primary border-teal-primary text-white'
                    : 'bg-white border-gray-200 text-gray-900 hover:border-teal-primary hover:bg-teal-primary/5'
                }`}
              >
                <Minus className="w-5 h-5" />
                <span className="font-medium">A little bit</span>
              </button>
              
              <button
                onClick={() => setSelectedOption('not-today')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedOption === 'not-today'
                    ? 'bg-teal-primary border-teal-primary text-white'
                    : 'bg-white border-gray-200 text-gray-900 hover:border-teal-primary hover:bg-teal-primary/5'
                }`}
              >
                <X className="w-5 h-5" />
                <span className="font-medium">Not today</span>
              </button>
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

            {/* Save Button */}
            <button
              onClick={handleSaveNext}
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Save & Next
              <ChevronRight className="w-5 h-5" />
            </button>
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © 2024 HabitReflect • Your sustainable growth companion
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
