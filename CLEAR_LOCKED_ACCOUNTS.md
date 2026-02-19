# 🔓 Clear Locked Accounts - Quick Fix

## Problem: User Account Might Be Locked

If you tested the user login with wrong passwords multiple times, the account may be locked.

## ✅ Solution 1: Clear Browser Storage (Recommended)

### Method 1: Using Browser Console
```javascript
// Open browser console (F12) and paste this:
localStorage.clear();
sessionStorage.clear();

// Then refresh the page
location.reload();
```

### Method 2: Using Browser Settings
```
1. Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. Select "Cookies and other site data"
3. Select "Cached images and files"
4. Click "Clear data"
5. Refresh the page
```

### Method 3: Use Incognito/Private Mode
```
1. Press Ctrl+Shift+N (Chrome) or Ctrl+Shift+P (Firefox)
2. Go to your site
3. Try logging in
```

## ✅ Solution 2: Wait 15 Minutes

The account automatically unlocks after 15 minutes.

## 🧪 Test After Clearing

### Test User Login:
```
Email: user@example.com
Password: password123
Expected: ✅ Opens user dashboard
```

### Test Admin Login:
```
Email: admin@admin.com
Password: admin123
Expected: ✅ Opens admin dashboard
```

## 🔍 Check If Account Is Locked

Open browser console (F12) and run:
```javascript
// Check if user account is locked
const userLock = localStorage.getItem('account_locked_user@example.com');
console.log('User locked until:', userLock ? new Date(parseInt(userLock)) : 'Not locked');

// Check if admin account is locked
const adminLock = localStorage.getItem('account_locked_admin@admin.com');
console.log('Admin locked until:', adminLock ? new Date(parseInt(adminLock)) : 'Not locked');

// Check failed attempts
const userAttempts = localStorage.getItem('failed_attempts_user@example.com');
console.log('User failed attempts:', userAttempts || 0);

const adminAttempts = localStorage.getItem('failed_attempts_admin@admin.com');
console.log('Admin failed attempts:', adminAttempts || 0);
```

## 🔓 Manually Unlock Accounts

Open browser console (F12) and run:
```javascript
// Unlock user account
localStorage.removeItem('account_locked_user@example.com');
localStorage.removeItem('failed_attempts_user@example.com');

// Unlock admin account
localStorage.removeItem('account_locked_admin@admin.com');
localStorage.removeItem('failed_attempts_admin@admin.com');

console.log('✅ All accounts unlocked!');

// Refresh page
location.reload();
```

## 📝 Quick Test Script

Copy and paste this into browser console (F12):
```javascript
// Clear all locks and attempts
console.log('🔓 Clearing all account locks...');

localStorage.removeItem('account_locked_user@example.com');
localStorage.removeItem('failed_attempts_user@example.com');
localStorage.removeItem('account_locked_admin@admin.com');
localStorage.removeItem('failed_attempts_admin@admin.com');

console.log('✅ All accounts unlocked!');
console.log('🔄 Refreshing page...');

setTimeout(() => location.reload(), 1000);
```

## ✅ Verify It's Working

After clearing:

1. **Test User Login:**
   - Email: `user@example.com`
   - Password: `password123`
   - Should open: `/dashboard`

2. **Test Admin Login:**
   - Email: `admin@admin.com`
   - Password: `admin123`
   - Should open: `/admin/dashboard`

## 🚨 If Still Not Working

### Check Browser Console for Errors:
```
1. Press F12
2. Go to "Console" tab
3. Look for red errors
4. Take screenshot and share
```

### Check Network Tab:
```
1. Press F12
2. Go to "Network" tab
3. Try logging in
4. Look for failed requests (red)
5. Click on failed request
6. Check "Response" tab
```

### Check if Logged In:
```javascript
// In console (F12):
const user = localStorage.getItem('user');
const token = localStorage.getItem('authToken');

console.log('User:', user);
console.log('Token:', token);

// If both exist, you're logged in
// If null, login failed
```

## 🎯 Expected Behavior

### User Login Flow:
```
1. Enter: user@example.com / password123
2. Click "Login"
3. See: "Welcome back, Demo User!" toast
4. Redirect to: /dashboard
5. See: User sidebar with user menu items
```

### Admin Login Flow:
```
1. Enter: admin@admin.com / admin123
2. Click "Login"
3. See: "Welcome back, Admin User!" toast
4. Redirect to: /admin/dashboard
5. See: Admin sidebar with admin menu items
```

---

**Quick Fix:** Run this in console (F12):
```javascript
localStorage.clear(); location.reload();
```

Then try logging in again!
