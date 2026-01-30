-- ============================================
-- PART 5: FUNCTIONS AND TRIGGERS
-- ============================================
-- Run this after Part 4

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at on all tables
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
