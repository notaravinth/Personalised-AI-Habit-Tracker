-- ============================================
-- PART 6: VIEWS
-- ============================================
-- Run this after Part 5

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
