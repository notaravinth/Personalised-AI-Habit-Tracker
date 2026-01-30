-- ============================================
-- PART 4: INDEXES
-- ============================================
-- Run this after Part 3

-- Indexes for habits table
CREATE INDEX idx_habits_user_id ON public.habits(user_id);
CREATE INDEX idx_habits_category ON public.habits(category);
CREATE INDEX idx_habits_is_active ON public.habits(is_active);

-- Indexes for habit_logs table
CREATE INDEX idx_habit_logs_user_id ON public.habit_logs(user_id);
CREATE INDEX idx_habit_logs_habit_id ON public.habit_logs(habit_id);
CREATE INDEX idx_habit_logs_log_date ON public.habit_logs(log_date);
CREATE INDEX idx_habit_logs_status ON public.habit_logs(status);

-- Indexes for friendships table
CREATE INDEX idx_friendships_user_id ON public.friendships(user_id);
CREATE INDEX idx_friendships_friend_id ON public.friendships(friend_id);
CREATE INDEX idx_friendships_status ON public.friendships(status);

-- Indexes for daily_analytics table
CREATE INDEX idx_daily_analytics_user_id ON public.daily_analytics(user_id);
CREATE INDEX idx_daily_analytics_date ON public.daily_analytics(analytics_date);
