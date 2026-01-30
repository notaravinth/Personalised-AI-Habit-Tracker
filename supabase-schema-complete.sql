-- ============================================
-- COMPLETE HABITREFLECT DATABASE SCHEMA
-- ============================================
-- Run this AFTER the initial schema, or run this complete version fresh
-- This includes all features: profiles, habits, reflections, and friends

-- ============================================
-- PROFILES TABLE (Enhanced)
-- ============================================
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  privacy_mode TEXT DEFAULT 'private' CHECK (privacy_mode IN ('private', 'friends-only', 'public')),
  allow_friend_requests BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view profiles of friends"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.friendships
      WHERE (user_id = auth.uid() AND friend_id = public.profiles.id AND status = 'accepted')
         OR (friend_id = auth.uid() AND user_id = public.profiles.id AND status = 'accepted')
    )
  );

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- HABITS TABLE (Enhanced)
-- ============================================
DROP TABLE IF EXISTS public.habits CASCADE;

CREATE TABLE public.habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- e.g., 'health', 'productivity', 'mindfulness', 'social', 'learning'
  icon TEXT, -- emoji or icon name
  color TEXT, -- hex color for UI
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'custom')),
  goal_per_week INTEGER, -- for weekly or custom frequency
  reminder_time TIME,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- Policies for habits
CREATE POLICY "Users can view their own habits"
  ON public.habits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own habits"
  ON public.habits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON public.habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON public.habits FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- HABIT LOGS TABLE (Enhanced)
-- ============================================
DROP TABLE IF EXISTS public.habit_logs CASCADE;

CREATE TABLE public.habit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE NOT NULL,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('did-it', 'little-bit', 'not-today')),
  reflection TEXT,
  energy_level INTEGER CHECK (energy_level >= 0 AND energy_level <= 100),
  mood TEXT, -- optional mood tracking
  tags TEXT[], -- optional tags for categorization
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one log per habit per day
  UNIQUE(user_id, habit_id, log_date)
);

ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;

-- Policies for habit_logs
CREATE POLICY "Users can view their own habit logs"
  ON public.habit_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Friends can view habit logs if sharing enabled"
  ON public.habit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      JOIN public.friendships f ON (
        (f.user_id = auth.uid() AND f.friend_id = public.habit_logs.user_id)
        OR (f.friend_id = auth.uid() AND f.user_id = public.habit_logs.user_id)
      )
      WHERE p.id = public.habit_logs.user_id
        AND p.privacy_mode IN ('friends-only', 'public')
        AND f.status = 'accepted'
    )
  );

CREATE POLICY "Users can insert their own habit logs"
  ON public.habit_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habit logs"
  ON public.habit_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habit logs"
  ON public.habit_logs FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- FRIENDSHIPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.friendships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  friend_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate friend requests
  UNIQUE(user_id, friend_id),
  -- Prevent self-friending
  CHECK (user_id != friend_id)
);

ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

-- Policies for friendships
CREATE POLICY "Users can view their own friendships"
  ON public.friendships FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can send friend requests"
  ON public.friendships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can respond to friend requests"
  ON public.friendships FOR UPDATE
  USING (auth.uid() = friend_id OR auth.uid() = user_id);

CREATE POLICY "Users can delete their friendships"
  ON public.friendships FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- ============================================
-- SHARING PREFERENCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.sharing_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  share_overall_progress BOOLEAN DEFAULT true,
  share_individual_habits BOOLEAN DEFAULT true,
  share_reflections BOOLEAN DEFAULT false,
  share_energy_levels BOOLEAN DEFAULT true,
  share_streaks BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.sharing_preferences ENABLE ROW LEVEL SECURITY;

-- Policies for sharing_preferences
CREATE POLICY "Users can view their own sharing preferences"
  ON public.sharing_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Friends can view sharing preferences"
  ON public.sharing_preferences FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.friendships
      WHERE (user_id = auth.uid() AND friend_id = public.sharing_preferences.user_id AND status = 'accepted')
         OR (friend_id = auth.uid() AND user_id = public.sharing_preferences.user_id AND status = 'accepted')
    )
  );

CREATE POLICY "Users can update their own sharing preferences"
  ON public.sharing_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sharing preferences"
  ON public.sharing_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- ANALYTICS SUMMARY TABLE (for performance)
-- ============================================
CREATE TABLE IF NOT EXISTS public.daily_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  analytics_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_habits INTEGER DEFAULT 0,
  completed_habits INTEGER DEFAULT 0,
  partial_habits INTEGER DEFAULT 0,
  skipped_habits INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2), -- percentage
  avg_energy_level DECIMAL(5,2),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, analytics_date)
);

ALTER TABLE public.daily_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for daily_analytics
CREATE POLICY "Users can view their own analytics"
  ON public.daily_analytics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Friends can view analytics if sharing enabled"
  ON public.daily_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      JOIN public.friendships f ON (
        (f.user_id = auth.uid() AND f.friend_id = public.daily_analytics.user_id)
        OR (f.friend_id = auth.uid() AND f.user_id = public.daily_analytics.user_id)
      )
      WHERE p.id = public.daily_analytics.user_id
        AND p.privacy_mode IN ('friends-only', 'public')
        AND f.status = 'accepted'
    )
  );

CREATE POLICY "Users can manage their own analytics"
  ON public.daily_analytics FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habits_category ON public.habits(category);
CREATE INDEX IF NOT EXISTS idx_habits_is_active ON public.habits(is_active);

CREATE INDEX IF NOT EXISTS idx_habit_logs_user_id ON public.habit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_habit_logs_habit_id ON public.habit_logs(habit_id);
CREATE INDEX IF NOT EXISTS idx_habit_logs_log_date ON public.habit_logs(log_date);
CREATE INDEX IF NOT EXISTS idx_habit_logs_status ON public.habit_logs(status);

CREATE INDEX IF NOT EXISTS idx_friendships_user_id ON public.friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend_id ON public.friendships(friend_id);
CREATE INDEX IF NOT EXISTS idx_friendships_status ON public.friendships(status);

CREATE INDEX IF NOT EXISTS idx_daily_analytics_user_id ON public.daily_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_analytics_date ON public.daily_analytics(analytics_date);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_habits_updated_at
  BEFORE UPDATE ON public.habits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_habit_logs_updated_at
  BEFORE UPDATE ON public.habit_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_friendships_updated_at
  BEFORE UPDATE ON public.friendships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sharing_preferences_updated_at
  BEFORE UPDATE ON public.sharing_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_analytics_updated_at
  BEFORE UPDATE ON public.daily_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate daily analytics
CREATE OR REPLACE FUNCTION calculate_daily_analytics(p_user_id UUID, p_date DATE)
RETURNS void AS $$
DECLARE
  v_total INTEGER;
  v_completed INTEGER;
  v_partial INTEGER;
  v_skipped INTEGER;
  v_completion_rate DECIMAL(5,2);
  v_avg_energy DECIMAL(5,2);
BEGIN
  -- Count habits by status
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'did-it'),
    COUNT(*) FILTER (WHERE status = 'little-bit'),
    COUNT(*) FILTER (WHERE status = 'not-today')
  INTO v_total, v_completed, v_partial, v_skipped
  FROM public.habit_logs
  WHERE user_id = p_user_id AND log_date = p_date;
  
  -- Calculate completion rate
  IF v_total > 0 THEN
    v_completion_rate := (v_completed::DECIMAL / v_total) * 100;
  ELSE
    v_completion_rate := 0;
  END IF;
  
  -- Calculate average energy level
  SELECT AVG(energy_level) INTO v_avg_energy
  FROM public.habit_logs
  WHERE user_id = p_user_id AND log_date = p_date AND energy_level IS NOT NULL;
  
  -- Insert or update analytics
  INSERT INTO public.daily_analytics (
    user_id, analytics_date, total_habits, completed_habits, 
    partial_habits, skipped_habits, completion_rate, avg_energy_level
  )
  VALUES (
    p_user_id, p_date, v_total, v_completed,
    v_partial, v_skipped, v_completion_rate, v_avg_energy
  )
  ON CONFLICT (user_id, analytics_date) 
  DO UPDATE SET
    total_habits = v_total,
    completed_habits = v_completed,
    partial_habits = v_partial,
    skipped_habits = v_skipped,
    completion_rate = v_completion_rate,
    avg_energy_level = v_avg_energy,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-calculate analytics when habit log is inserted/updated
CREATE OR REPLACE FUNCTION trigger_calculate_analytics()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_daily_analytics(NEW.user_id, NEW.log_date);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER habit_log_analytics_trigger
  AFTER INSERT OR UPDATE ON public.habit_logs
  FOR EACH ROW
  EXECUTE FUNCTION trigger_calculate_analytics();

-- Function to create default sharing preferences
CREATE OR REPLACE FUNCTION create_default_sharing_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.sharing_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_sharing_preferences_on_profile
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_default_sharing_preferences();

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- View for user's friends with their profiles
CREATE OR REPLACE VIEW user_friends AS
SELECT 
  f.id AS friendship_id,
  f.user_id,
  f.friend_id,
  f.status,
  f.requested_at,
  f.responded_at,
  p.full_name AS friend_name,
  p.avatar_url AS friend_avatar,
  p.bio AS friend_bio,
  p.privacy_mode AS friend_privacy
FROM public.friendships f
JOIN public.profiles p ON p.id = f.friend_id;

-- View for habit statistics
CREATE OR REPLACE VIEW habit_statistics AS
SELECT 
  h.id AS habit_id,
  h.user_id,
  h.title AS habit_title,
  h.category,
  COUNT(hl.id) AS total_logs,
  COUNT(hl.id) FILTER (WHERE hl.status = 'did-it') AS times_completed,
  COUNT(hl.id) FILTER (WHERE hl.status = 'little-bit') AS times_partial,
  COUNT(hl.id) FILTER (WHERE hl.status = 'not-today') AS times_skipped,
  ROUND(
    (COUNT(hl.id) FILTER (WHERE hl.status = 'did-it')::DECIMAL / NULLIF(COUNT(hl.id), 0)) * 100, 
    2
  ) AS completion_percentage,
  MAX(hl.log_date) AS last_logged_date,
  AVG(hl.energy_level) AS avg_energy_level
FROM public.habits h
LEFT JOIN public.habit_logs hl ON hl.habit_id = h.id
WHERE h.is_active = true
GROUP BY h.id, h.user_id, h.title, h.category;

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================
-- Uncomment and run after creating your first user account

/*
-- Replace 'YOUR-USER-ID-HERE' with your actual user UUID from auth.users

-- Create profile
INSERT INTO public.profiles (id, full_name, onboarding_completed, privacy_mode)
VALUES ('YOUR-USER-ID-HERE', 'Nika', true, 'friends-only')
ON CONFLICT (id) DO NOTHING;

-- Insert sample habits
INSERT INTO public.habits (user_id, title, description, category, icon, color) VALUES
  ('YOUR-USER-ID-HERE', 'Morning Meditation', '10 minutes of mindfulness to center your thoughts and set an intention for the day ahead.', 'mindfulness', '🧘', '#14b8a6'),
  ('YOUR-USER-ID-HERE', 'Exercise', '30 minutes of physical activity to energize your body and boost your mood.', 'health', '💪', '#f59e0b'),
  ('YOUR-USER-ID-HERE', 'Read for 20 minutes', 'Expand your knowledge and stimulate your mind with focused reading time.', 'learning', '📚', '#8b5cf6'),
  ('YOUR-USER-ID-HERE', 'Drink 8 glasses of water', 'Stay hydrated throughout the day to maintain energy and focus.', 'health', '💧', '#3b82f6'),
  ('YOUR-USER-ID-HERE', 'Journal before bed', 'Reflect on your day and process your thoughts through writing.', 'mindfulness', '✍️', '#ec4899')
ON CONFLICT DO NOTHING;
*/
