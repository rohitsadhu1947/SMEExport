# Phase 1 Testing Guide

## 🚀 Server Status

The development server should be running at: **http://localhost:3000**

If not running, start it with:
```bash
cd POC-APPLICATION/frontend
npm run dev
```

## ✅ Testing Checklist

### 1. Welcome Screen (`/welcome`)
- [ ] Page loads correctly
- [ ] Industry dropdown shows "Leather (Shoes)" and "Bhadohi Carpets"
- [ ] "Start Onboarding" button is disabled until industry is selected
- [ ] After selecting industry and clicking "Start Onboarding", redirects to `/register`

### 2. Registration Screen (`/register`)
- [ ] Form loads with Individual/Company toggle
- [ ] Can switch between Individual and Company
- [ ] All fields are required (shows validation errors)
- [ ] Email validation works (invalid email shows error)
- [ ] Mobile validation works (must be 10 digits starting with 6-9)
- [ ] Address fields are optional
- [ ] "Back" button returns to welcome screen
- [ ] "Continue to Compliance" button works when form is valid
- [ ] Progress indicator shows correct step

### 3. Compliance Screen (`/compliance`)
- [ ] Page loads with UDYAM, Tax, and GST sections
- [ ] Can check/uncheck registration checkboxes
- [ ] When UDYAM is checked:
  - [ ] Status changes to "Verifying..." then "Verified"
  - [ ] Registration number field appears
- [ ] When Tax is checked:
  - [ ] Status changes to "Verifying..." then "Verified"
  - [ ] PAN/Tax ID field appears
- [ ] When GST is checked:
  - [ ] Status changes to "Verifying..." then "Verified"
  - [ ] GST ID field appears
- [ ] "Guide Me to Register" button appears when UDYAM is unchecked
- [ ] "Back" button returns to registration screen
- [ ] "Continue to Banking" button works

### 4. Banking Screen (`/banking`)
- [ ] Page loads with bank dropdown, account number, and IFSC fields
- [ ] Bank dropdown has options (SBI, HDFC, ICICI, Axis, PNB)
- [ ] All fields are required
- [ ] IFSC validation works (format: ABCD0123456)
- [ ] "Verify Account" button:
  - [ ] Disabled until all fields are filled
  - [ ] Shows "Verifying..." when clicked
  - [ ] Shows success alert after 2 seconds
- [ ] "Continue to Profile Summary" button:
  - [ ] Disabled until account is verified
  - [ ] Works after verification
- [ ] "Back" button returns to compliance screen

### 5. Profile Summary Screen (`/profile-summary`)
- [ ] Page loads showing all collected information:
  - [ ] Registration details (type, name, email, mobile, industry)
  - [ ] Compliance status (UDYAM, Tax, GST)
  - [ ] Banking information (bank, account, IFSC, status)
  - [ ] Phase 1 schemes (if applicable)
- [ ] Phase 1 schemes show correctly:
  - [ ] MSME Subsidy badge if UDYAM registered
  - [ ] UDYAM Benefits badge if UDYAM registered
  - [ ] Message if no schemes applicable
- [ ] "Complete Onboarding" button:
  - [ ] Creates artisan profile via API
  - [ ] Shows "Creating Profile..." while processing
  - [ ] Shows success message
  - [ ] Redirects to `/products/select` after 2 seconds
- [ ] "Back" button returns to banking screen

## 🐛 Common Issues & Fixes

### Issue: Server not starting
**Fix**: Check if port 3000 is already in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Issue: TypeScript errors
**Fix**: Run type check
```bash
npx tsc --noEmit
```

### Issue: Form validation not working
**Check**: 
- Browser console for errors
- Network tab for API calls
- Form data in sessionStorage (DevTools > Application > Session Storage)

### Issue: Redirect not working
**Check**:
- Browser console for errors
- Network tab for API response
- sessionStorage has required data

## 📊 Test Data

### Valid Test Data:
- **Email**: `test@example.com`
- **Mobile**: `9876543210`
- **UDYAM Number**: `UDYAM-DL-01-0001234`
- **PAN**: `ABCDE1234F`
- **GST**: `07ABCDE1234F1Z5`
- **Account Number**: `1234567890`
- **IFSC**: `SBIN0001234`

## 🔍 Browser DevTools Checks

1. **Console**: Check for any JavaScript errors
2. **Network Tab**: Verify API calls to `/api/onboard` return 200
3. **Application > Session Storage**: Check stored data:
   - `selectedIndustry`
   - `registrationData`
   - `complianceData`
   - `bankingData`
   - `artisanId` (after profile creation)

## ✨ Expected Behavior

1. **Flow**: Welcome → Register → Compliance → Banking → Profile Summary → Products
2. **Data Persistence**: All form data persists via sessionStorage
3. **Validation**: Real-time validation with error messages
4. **Status Updates**: Visual feedback for compliance and banking verification
5. **Scheme Detection**: Phase 1 schemes automatically detected based on registrations

## 🎯 Success Criteria

✅ All screens load without errors  
✅ Form validation works correctly  
✅ Status indicators update properly  
✅ API calls succeed  
✅ Profile is created successfully  
✅ Redirect to products page works  

---

**Happy Testing!** 🚀
