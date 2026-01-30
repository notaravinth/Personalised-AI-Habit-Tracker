-- ============================================
-- PART 2: SOCIAL FEATURES
-- ============================================
-- Run this after Part 1

-- FRIENDSHIPS TABLE
CREATE TABLE public.friendships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  friend_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, friend_id),
  CHECK (user_id != friend_id)
);

ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

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

-- SHARING PREFERENCES TABLE
CREATE TABLE public.sharing_preferences (
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

-- Add policy to profiles for friends to view
CREATE POLICY "Users can view profiles of friends"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.friendships
      WHERE (user_id = auth.uid() AND friend_id = public.profiles.id AND status = 'accepted')
         OR (friend_id = auth.uid() AND user_id = public.profiles.id AND status = 'accepted')
    )
  );

-- Add policy to habit_logs for friends to view
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
