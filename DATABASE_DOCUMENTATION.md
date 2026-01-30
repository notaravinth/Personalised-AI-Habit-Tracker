# HabitReflect - Complete Database Documentation

## Database Overview

This database supports the entire HabitReflect application with the following features:
- ✅ User Authentication (via Supabase Auth)
- ✅ Profile Management & Onboarding
- ✅ Habit Creation & Tracking
- ✅ Daily Check-ins with Reflections
- ✅ Friends & Social Features
- ✅ Analytics & Progress Tracking
- ✅ Privacy Controls

---

## Tables Structure

### 1. `profiles` (User Profiles)
Stores additional user information beyond Supabase Auth.

**Columns:**
- `id` (UUID) - References auth.users, PRIMARY KEY
- `full_name` (TEXT) - User's display name
- `avatar_url` (TEXT) - Profile picture URL
- `bio` (TEXT) - User biography/description
- `onboarding_completed` (BOOLEAN) - Whether user finished setup
- `privacy_mode` (TEXT) - 'private', 'friends-only', or 'public'
- `allow_friend_requests` (BOOLEAN) - Can receive friend requests
- `created_at`, `updated_at` (TIMESTAMP)

**Use Cases:**
- Display user profile
- Check if user needs onboarding
- Control visibility of user data to others

---

### 2. `habits` (User Habits)
Stores all habits created by users.

**Columns:**
- `id` (UUID) - PRIMARY KEY
- `user_id` (UUID) - References auth.users
- `title` (TEXT) - Habit name (e.g., "Morning Meditation")
- `description` (TEXT) - Detailed description
- `category` (TEXT) - 'health', 'productivity', 'mindfulness', etc.
- `icon` (TEXT) - Emoji or icon identifier
- `color` (TEXT) - Hex color for UI display
- `frequency` (TEXT) - 'daily', 'weekly', 'custom'
- `goal_per_week` (INTEGER) - For non-daily habits
- `reminder_time` (TIME) - Optional reminder
- `is_active` (BOOLEAN) - Whether habit is currently tracked
- `created_at`, `updated_at` (TIMESTAMP)

**Use Cases:**
- Habit setup page: create/edit habits
- Dashboard: fetch today's active habits
- Analytics: track habit performance over time

---

### 3. `habit_logs` (Daily Check-ins)
Stores daily entries for each habit.

**Columns:**
- `id` (UUID) - PRIMARY KEY
- `user_id` (UUID) - References auth.users
- `habit_id` (UUID) - References habits table
- `log_date` (DATE) - Date of the check-in
- `status` (TEXT) - 'did-it', 'little-bit', or 'not-today'
- `reflection` (TEXT) - User's reflection/notes
- `energy_level` (INTEGER 0-100) - Energy rating
- `mood` (TEXT) - Optional mood tracking
- `tags` (TEXT[]) - Optional tags for filtering
- `created_at`, `updated_at` (TIMESTAMP)
- **UNIQUE constraint:** One log per habit per day

**Use Cases:**
- Dashboard: save daily check-ins
- Reflections page: view past logs
- Analytics: calculate completion rates

---

### 4. `friendships` (Friend Connections)
Manages friend requests and connections.

**Columns:**
- `id` (UUID) - PRIMARY KEY
- `user_id` (UUID) - User who sent the request
- `friend_id` (UUID) - User who received the request
- `status` (TEXT) - 'pending', 'accepted', 'rejected', 'blocked'
- `requested_at` (TIMESTAMP) - When request was sent
- `responded_at` (TIMESTAMP) - When request was responded to
- `created_at`, `updated_at` (TIMESTAMP)
- **Constraints:** Unique pair, no self-friending

**Use Cases:**
- Friends page: send/accept/reject requests
- Friends list: show all accepted friendships
- Privacy: check if users are friends before showing data

---

### 5. `sharing_preferences` (Privacy Controls)
Controls what data users share with friends.

**Columns:**
- `id` (UUID) - PRIMARY KEY
- `user_id` (UUID) - References auth.users (UNIQUE)
- `share_overall_progress` (BOOLEAN) - Share completion percentages
- `share_individual_habits` (BOOLEAN) - Share specific habits
- `share_reflections` (BOOLEAN) - Share reflection text
- `share_energy_levels` (BOOLEAN) - Share energy ratings
- `share_streaks` (BOOLEAN) - Share streak counts
- `created_at`, `updated_at` (TIMESTAMP)

**Use Cases:**
- Settings/Profile page: configure sharing
- Friends analytics view: respect privacy settings
- Auto-created when profile is created

---

### 6. `daily_analytics` (Aggregated Stats)
Pre-calculated daily statistics for performance.

**Columns:**
- `id` (UUID) - PRIMARY KEY
- `user_id` (UUID) - References auth.users
- `analytics_date` (DATE) - Date of the analytics
- `total_habits` (INTEGER) - Number of habits that day
- `completed_habits` (INTEGER) - Habits marked 'did-it'
- `partial_habits` (INTEGER) - Habits marked 'little-bit'
- `skipped_habits` (INTEGER) - Habits marked 'not-today'
- `completion_rate` (DECIMAL) - Percentage completed
- `avg_energy_level` (DECIMAL) - Average energy for the day
- `current_streak` (INTEGER) - Consecutive completion days
- `longest_streak` (INTEGER) - Best streak ever
- `created_at`, `updated_at` (TIMESTAMP)
- **UNIQUE constraint:** One row per user per day

**Use Cases:**
- Dashboard: show daily progress bar
- Analytics page: historical performance charts
- Friends: share stats without exposing raw logs
- **Auto-calculated** via trigger when habit_logs are saved

---

## Views (Convenience Queries)

### `user_friends`
Pre-joined view of friendships with profile data.

**Useful for:** Displaying friends list with names and avatars.

### `habit_statistics`
Aggregated habit performance stats.

**Useful for:** Analytics page showing which habits are going well.

---

## Automatic Features

### Auto-Updated Fields
All tables have `updated_at` that auto-updates on any change.

### Auto-Calculated Analytics
When you save a `habit_log`, the `daily_analytics` table automatically updates for that day.

### Auto-Created Sharing Preferences
When a user creates a profile, default sharing settings are created.

---

## Row Level Security (RLS)

All tables have RLS enabled. Users can only:
- **See their own data** (always)
- **See friends' data** (only if privacy allows and friendship is accepted)
- **Cannot access other users' data** (unless public mode)

---

## User Flow & Database Usage

### 1. **Landing Page**
No database calls needed - static content.

### 2. **Sign Up / Login** (Teammate's work)
- Uses Supabase Auth (`auth.users` table - automatic)
- After signup, redirect to profile setup

### 3. **Profile Setup Page** (First-time users)
```sql
-- Insert into profiles table
INSERT INTO profiles (id, full_name, avatar_url, bio, onboarding_completed)
VALUES (user_id, name, avatar, bio, false);

-- Mark onboarding as complete
UPDATE profiles SET onboarding_completed = true WHERE id = user_id;
```

### 4. **Habit Setup Page**
```sql
-- Create habits
INSERT INTO habits (user_id, title, description, category, icon, color)
VALUES (user_id, 'Exercise', '30 min workout', 'health', '💪', '#f59e0b');
```

### 5. **Dashboard** (Your main page)
```sql
-- Fetch today's habits
SELECT * FROM habits WHERE user_id = $1 AND is_active = true;

-- Save daily check-in
INSERT INTO habit_logs (user_id, habit_id, log_date, status, reflection, energy_level)
VALUES (user_id, habit_id, today, 'did-it', 'Felt great!', 75)
ON CONFLICT (user_id, habit_id, log_date) DO UPDATE
SET status = 'did-it', reflection = 'Felt great!', energy_level = 75;

-- Get today's progress (auto-calculated)
SELECT * FROM daily_analytics WHERE user_id = $1 AND analytics_date = today;
```

### 6. **Reflections Page**
```sql
-- Get past logs with habit details
SELECT hl.*, h.title, h.icon, h.color
FROM habit_logs hl
JOIN habits h ON h.id = hl.habit_id
WHERE hl.user_id = $1
ORDER BY hl.log_date DESC
LIMIT 30;
```

### 7. **Friends Page**
```sql
-- Send friend request
INSERT INTO friendships (user_id, friend_id, status)
VALUES (current_user_id, friend_user_id, 'pending');

-- Accept friend request
UPDATE friendships
SET status = 'accepted', responded_at = NOW()
WHERE friend_id = current_user_id AND user_id = requester_id;

-- Get friends list
SELECT * FROM user_friends
WHERE (user_id = $1 OR friend_id = $1) AND status = 'accepted';

-- View friend's analytics (if they allow sharing)
SELECT da.*, p.full_name
FROM daily_analytics da
JOIN profiles p ON p.id = da.user_id
WHERE da.user_id = friend_id AND p.privacy_mode != 'private';
```

---

## Setup Instructions

### If you HAVEN'T run the first schema:
1. Run `supabase-schema-complete.sql` in Supabase SQL Editor
2. This creates everything you need

### If you ALREADY ran the first schema:
The complete schema uses `DROP TABLE IF EXISTS` to recreate tables with enhanced fields. You can:

**Option A (Recommended for fresh start):**
1. Delete the old tables in Supabase dashboard
2. Run `supabase-schema-complete.sql`

**Option B (Keep existing data):**
You already have the core tables. Just add the new ones by running only these sections from the complete schema:
- `friendships` table
- `sharing_preferences` table  
- `daily_analytics` table
- All functions and triggers
- All views

---

## Next Steps for Development

1. **Your teammate:** Implement auth using `supabase.auth.signUp()` and `supabase.auth.signInWithPassword()`

2. **You:** 
   - Fetch habits in Dashboard
   - Save habit logs
   - Build Reflections page
   - Build Friends feature

3. **Both:** Share the same `.env` credentials and `supabase.js` client

---

## Key Queries You'll Need

I can create helper functions in your codebase for common operations like:
- `fetchUserHabits()`
- `saveHabitLog()`
- `getFriendsList()`
- `getReflectionsHistory()`

Would you like me to create these helper functions next?
