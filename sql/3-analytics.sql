-- ============================================
-- PART 3: ANALYTICS
-- ============================================
-- Run this after Part 2

-- DAILY ANALYTICS TABLE
CREATE TABLE public.daily_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  analytics_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_habits INTEGER DEFAULT 0,
  completed_habits INTEGER DEFAULT 0,
  partial_habits INTEGER DEFAULT 0,
  skipped_habits INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2),
  avg_energy_level DECIMAL(5,2),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, analytics_date)
);

ALTER TABLE public.daily_analytics ENABLE ROW LEVEL SECURITY;

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
