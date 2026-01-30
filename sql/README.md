# SQL Schema Setup - Step by Step

## Run these files in order in your Supabase SQL Editor

### ✅ Step 1: Core Tables
**File:** `1-core-tables.sql`

Creates:
- `profiles` - User profiles
- `habits` - User habits  
- `habit_logs` - Daily check-ins

**What to do:**
1. Open Supabase dashboard → SQL Editor
2. Copy contents of `sql/1-core-tables.sql`
3. Paste and click **Run**
4. ✅ Should see: "Success. No rows returned"

---

### ✅ Step 2: Social Features
**File:** `2-social-features.sql`

Creates:
- `friendships` - Friend connections
- `sharing_preferences` - Privacy controls
- Additional policies for friends to view data

**What to do:**
1. Copy contents of `sql/2-social-features.sql`
2. Paste in SQL Editor and click **Run**
3. ✅ Should see: "Success. No rows returned"

---

### ✅ Step 3: Analytics
**File:** `3-analytics.sql`

Creates:
- `daily_analytics` - Pre-calculated daily stats

**What to do:**
1. Copy contents of `sql/3-analytics.sql`
2. Paste and click **Run**
3. ✅ Should see: "Success. No rows returned"

---

### ✅ Step 4: Indexes
**File:** `4-indexes.sql`

Creates database indexes for better performance.

**What to do:**
1. Copy contents of `sql/4-indexes.sql`
2. Paste and click **Run**
3. ✅ Should see: "Success. No rows returned"

---

### ✅ Step 5: Functions & Triggers
**File:** `5-functions-triggers.sql`

Creates:
- Auto-update `updated_at` fields
- Auto-calculate daily analytics when you save logs
- Auto-create sharing preferences when profile created

**What to do:**
1. Copy contents of `sql/5-functions-triggers.sql`
2. Paste and click **Run**
3. ✅ Should see: "Success. No rows returned"

---

### ✅ Step 6: Views
**File:** `6-views.sql`

Creates convenient views:
- `user_friends` - Friends with their profiles
- `habit_statistics` - Aggregated habit stats

**What to do:**
1. Copy contents of `sql/6-views.sql`
2. Paste and click **Run**
3. ✅ Should see: "Success. No rows returned"

---

## ✅ Verify Everything Worked

After running all 6 parts, check in Supabase:

1. Go to **Table Editor** (left sidebar)
2. You should see 6 tables:
   - ✅ profiles
   - ✅ habits
   - ✅ habit_logs
   - ✅ friendships
   - ✅ sharing_preferences
   - ✅ daily_analytics

3. Click on any table and go to "Policies" tab
4. You should see RLS policies listed

---

## If Something Goes Wrong

**Error during a step?**
- Read the error message carefully
- Most common: trying to create something that already exists
- Solution: Skip that step or use `DROP TABLE` first

**Want to start fresh?**
Run this in SQL Editor before Step 1:
```sql
DROP TABLE IF EXISTS public.daily_analytics CASCADE;
DROP TABLE IF EXISTS public.sharing_preferences CASCADE;
DROP TABLE IF EXISTS public.friendships CASCADE;
DROP TABLE IF EXISTS public.habit_logs CASCADE;
DROP TABLE IF EXISTS public.habits CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
```

---

## Next Step

Once all 6 parts are complete, update your `.env` file with your Supabase credentials!
