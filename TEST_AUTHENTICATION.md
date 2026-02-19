# 🧪 Quick Authentication Test Guide

## 🎯 Test Your Authentication System

**Live URL:** https://saas-ecommerce-ld7xud33y-manan016s-projects.vercel.app

---

## ✅ Test 1: Admin with WRONG Password (Should FAIL)

### Steps:
1. Open: https://saas-ecommerce-ld7xud33y-manan016s-projects.vercel.app
2. Enter Email: `admin@admin.com`
3. Enter Password: `wrongpassword` (or any wrong password)
4. Click "Login"

### Expected Result:
```
❌ Error toast: "Invalid email or password"
❌ Login form shakes
❌ Admin panel does NOT open
❌ User stays on login page
```

### ✅ PASS if: Admin panel does NOT open
### ❌ FAIL if: Admin panel opens

---

## ✅ Test 2: Admin with CORRECT Password (Should SUCCEED)

### Steps:
1. Open: https://saas-ecommerce-ld7xud33y-manan016s-projects.vercel.app
2. Enter Email: `admin@admin.com`
3. Enter Password: `admin123`
4. Click "Login"

### Expected Result:
```
✅ Success toast: "Welcome back, Admin User!"
✅ Redirects to /admin/dashboard
✅ Admin sidebar visible
✅ Admin features accessible
```

### ✅ PASS if: Admin dashboard opens
### ❌ FAIL if: Error message appears

---

## ✅ Test 3: User with WRONG Password (Should FAIL)

### Steps:
1. Open: https://saas-ecommerce-ld7xud33y-manan016s-projects.vercel.app
2. Enter Email: `user@example.com`
3. Enter Password: `wrongpassword`
4. Click "Login"

### Expected Result:
```
❌ Error toast: "Invalid email or password"
❌ Login form shakes
❌ Dashboard does NOT open
❌ User stays on login page
```

### ✅ PASS if: Dashboard does NOT open
### ❌ FAIL if: Dashboard opens

---

## ✅ Test 4: User with CORRECT Password (Should SUCCEED)

### Steps:
1. Open: https://saas-ecommerce-ld7xud33y-manan016s-projects.vercel.app
2. Enter Email: `user@example.com`
3. Enter Password: `password123`
4. Click "Login"

### Expected Result:
```
✅ Success toast: "Welcome back, Demo User!"
✅ Redirects to /dashboard
✅ User sidebar visible
✅ User features accessible
```

### ✅ PASS if: User dashboard opens
### ❌ FAIL if: Error message appears

---

## ✅ Test 5: Non-Existent Email (Should FAIL)

### Steps:
1. Open: https://saas-ecommerce-ld7xud33y-manan016s-projects.vercel.app
2. Enter Email: `notexist@example.com`
3. Enter Password: `anypassword`
4. Click "Login"

### Expected Result:
```
❌ Error toast: "Invalid email or password"
❌ Login form shakes
❌ Nothing opens
❌ User stays on login page
```

### ✅ PASS if: Login is blocked
### ❌ FAIL if: Any dashboard opens

---

## ⚠️ Test 6: Account Lockout (Should LOCK)

### Steps:
1. Open: https://saas-ecommerce-ld7xud33y-manan016s-projects.vercel.app
2. Enter Email: `admin@admin.com`
3. Enter Password: `wrongpassword`
4. Click "Login"
5. Repeat steps 3-4 four more times (total 5 attempts)

### Expected Result After 5th Attempt:
```
⚠️ Error toast: "Account locked due to multiple failed attempts. Try again in 15 minutes."
❌ Cannot login even with correct password
❌ Must wait 15 minutes
```

### To Unlock Immediately (For Testing):
```javascript
// Open browser console (F12) and run:
localStorage.clear();
// Then refresh the page
```

### ✅ PASS if: Account locks after 5 attempts
### ❌ FAIL if: Can still login after 5 failed attempts

---

## 📊 Quick Test Summary

| Test | Email | Password | Expected | Status |
|------|-------|----------|----------|--------|
| 1 | admin@admin.com | wrongpassword | ❌ BLOCKED | [ ] |
| 2 | admin@admin.com | admin123 | ✅ SUCCESS | [ ] |
| 3 | user@example.com | wrongpassword | ❌ BLOCKED | [ ] |
| 4 | user@example.com | password123 | ✅ SUCCESS | [ ] |
| 5 | notexist@example.com | anypassword | ❌ BLOCKED | [ ] |
| 6 | 5 wrong attempts | any | ⚠️ LOCKED | [ ] |

---

## 🎯 Key Points to Verify

### ✅ Security Features Working:
- [ ] Wrong password blocks login
- [ ] Wrong email blocks login
- [ ] Account locks after 5 failed attempts
- [ ] Generic error messages (no user enumeration)
- [ ] Correct credentials allow login
- [ ] Role-based redirects work (admin vs user)

### ✅ User Experience Working:
- [ ] Error messages are clear
- [ ] Success messages appear
- [ ] Form shakes on error
- [ ] Loading state shows
- [ ] Redirects are smooth
- [ ] No console errors

---

## 🔍 Browser Console Check

### Open Console (F12) and Check:
```
✅ No red errors
✅ Login attempts logged
✅ Security events logged
✅ State updates correctly
```

### Check localStorage:
```javascript
// After successful login, run in console:
localStorage.getItem('user')
// Should show user data

localStorage.getItem('authToken')
// Should show token data
```

---

## 🚨 If Tests Fail

### Problem: Admin opens with wrong password
**Solution:** Clear browser cache and try again
```bash
1. Press Ctrl+Shift+Delete
2. Clear "Cached images and files"
3. Clear "Cookies and site data"
4. Refresh page
5. Test again
```

### Problem: Account stays locked
**Solution:** Clear localStorage
```javascript
// In browser console (F12):
localStorage.clear();
// Refresh page
```

### Problem: No error messages appear
**Solution:** Check browser console for errors
```bash
1. Press F12
2. Go to "Console" tab
3. Look for red errors
4. Share errors if found
```

---

## ✅ Success Criteria

Your authentication system is working correctly if:

1. ✅ Admin with wrong password → BLOCKED
2. ✅ Admin with correct password → Opens admin dashboard
3. ✅ User with wrong password → BLOCKED
4. ✅ User with correct password → Opens user dashboard
5. ✅ Wrong email → BLOCKED
6. ✅ 5 failed attempts → Account locked

---

## 📞 Need Help?

If any test fails:
1. Check browser console for errors (F12)
2. Clear browser cache and localStorage
3. Try in incognito/private mode
4. Test in different browser
5. Check network tab for failed requests

---

**Test URL:** https://saas-ecommerce-ld7xud33y-manan016s-projects.vercel.app

**Status:** ✅ Ready for Testing

**Last Updated:** February 19, 2026
