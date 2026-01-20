# Artisan Market Platform - Comprehensive Testing Guide

## 🚀 Server Status

The development server should be running at: **http://localhost:3000**

If not running, start it with:
```bash
npm install
npm run dev
```

The app will automatically redirect from `/` to `/welcome`.

---

## ✅ Phase 1: Onboarding Testing Checklist

### 1. Welcome Screen (`/welcome`)
- [ ] Page loads with professional Apple-like design
- [ ] Hero section displays correctly
- [ ] Features section is visible
- [ ] Smooth scroll animations work
- [ ] "Get Started" button navigates to `/register`
- [ ] Responsive design works on mobile/tablet/desktop

### 2. Registration Screen (`/register`)
- [ ] Page loads with animated background
- [ ] Industry dropdown shows "Leather" and "Carpets"
- [ ] Can select industry (Leather or Carpets)
- [ ] Form toggles between Individual and Company
- [ ] All required fields show validation errors when empty
- [ ] Email validation works (invalid email shows error)
- [ ] Mobile validation works (must be 10 digits starting with 6-9)
- [ ] Address fields are optional
- [ ] "Back" button returns to welcome screen
- [ ] "Continue to Compliance" button works when form is valid
- [ ] Progress indicator shows correct step (Step 1 of 4)
- [ ] Data persists in sessionStorage

### 3. Compliance Screen (`/compliance`)
- [ ] Page loads with UDYAM, Tax, and GST sections
- [ ] Can check/uncheck registration checkboxes
- [ ] When UDYAM is checked:
  - [ ] Status changes to "Verifying..." then "Verified"
  - [ ] Registration number field appears
  - [ ] Toast notification appears
- [ ] When Tax is checked:
  - [ ] Status changes to "Verifying..." then "Verified"
  - [ ] PAN/Tax ID field appears
  - [ ] Toast notification appears
- [ ] When GST is checked:
  - [ ] Status changes to "Verifying..." then "Verified"
  - [ ] GST ID field appears
  - [ ] Toast notification appears
- [ ] "Guide Me to Register" button appears when UDYAM is unchecked
- [ ] "Back" button returns to registration screen
- [ ] "Continue to Banking" button works
- [ ] Progress indicator shows Step 2 of 4

### 4. Banking Screen (`/banking`)
- [ ] Page loads with bank dropdown, account number, and IFSC fields
- [ ] Bank dropdown has options (SBI, HDFC, ICICI, Axis, PNB)
- [ ] All fields are required
- [ ] IFSC validation works (format: ABCD0123456)
- [ ] "Verify Account" button:
  - [ ] Disabled until all fields are filled
  - [ ] Shows "Verifying..." when clicked
  - [ ] Shows success alert after 2 seconds
  - [ ] Toast notification appears
- [ ] "Continue to Profile Summary" button:
  - [ ] Disabled until account is verified
  - [ ] Works after verification
- [ ] "Back" button returns to compliance screen
- [ ] Progress indicator shows Step 3 of 4

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
  - [ ] Toast notification appears
  - [ ] Redirects to `/products/select` after 2 seconds
- [ ] "Back" button returns to banking screen
- [ ] Progress indicator shows Step 4 of 4

---

## ✅ Phase 2: Products & Market Intelligence Testing Checklist

### 1. Product Selection Screen (`/products/select`)
- [ ] Page loads with products filtered by selected industry
- [ ] **For Leather Industry**:
  - [ ] Shows: Leather Shoes, Leather Bags, Leather Belts
  - [ ] Each product card displays correctly
- [ ] **For Carpets Industry**:
  - [ ] Shows: Bhadohi Carpets, Persian Carpets, Modern Carpets
  - [ ] Each product card displays correctly
- [ ] Product cards have hover animations
- [ ] "Configure Product" button navigates to `/products/configure`
- [ ] "View Insights" button navigates to `/products/[industry]/insights`
- [ ] Breadcrumbs display correctly
- [ ] Responsive design works

### 2. Product Configuration Screen (`/products/configure`)
- [ ] Page loads with product form and market intelligence panel
- [ ] Product form displays correct fields based on selected product
- [ ] Form validation works (required fields, formats)
- [ ] Market intelligence panel displays:
  - [ ] Market selection dropdown (USA, EU, Domestic, Middle East)
  - [ ] Demand index gauge
  - [ ] Trend analysis chart
  - [ ] Eligible markets badges
  - [ ] Pricing tier (Premium/Standard)
  - [ ] Base price and suggested price
  - [ ] Phase 2 schemes (if applicable)
- [ ] Changing market updates intelligence data
- [ ] "View Insights" button navigates to insights page
- [ ] "Continue to Production Input" button works when form is valid
- [ ] Data persists in sessionStorage
- [ ] Dynamic imports work (no SSR errors)

### 3. Product Insights Page (`/products/[industry]/insights`)
- [ ] Page loads with product insights
- [ ] Market selection dropdown works
- [ ] Raw Materials section displays:
  - [ ] Material categories
  - [ ] Material options filtered by selected market
  - [ ] Market requirements (demand, trend, price multiplier)
  - [ ] Price impact indicators
  - [ ] Recommendations
- [ ] Production Requirements section displays:
  - [ ] Minimum order quantity
  - [ ] Lead time
  - [ ] Certifications required
  - [ ] Quality standards
- [ ] Scroll animations work
- [ ] "Configure Product" button navigates back to configure page
- [ ] Market filtering updates raw material options
- [ ] No blank content issues

---

## ✅ Phase 3: Production Testing Checklist

### 1. Production Input Screen (`/production/input`)
- [ ] Page loads with production form
- [ ] Common fields display:
  - [ ] Production Quantity
  - [ ] Expected Completion Date
- [ ] **For Leather Industry**:
  - [ ] Leather Source dropdown
  - [ ] Tanning Process field
- [ ] **For Carpets Industry**:
  - [ ] Yarn Supplier dropdown
  - [ ] Dyeing Method field
- [ ] Form validation works
- [ ] "Back" button works
- [ ] "Continue to Preview" button works when form is valid
- [ ] Progress indicator shows Step 1 of 3

### 2. Production Preview Screen (`/production/preview`)
- [ ] Page loads with complete data summary
- [ ] Displays:
  - [ ] Product configuration
  - [ ] Market intelligence summary
  - [ ] Production details
  - [ ] Applied schemes
- [ ] "Back" button returns to input screen
- [ ] "Submit Production" button works
- [ ] Progress indicator shows Step 2 of 3

### 3. Production Submit Screen (`/production/submit`)
- [ ] Page loads with success message
- [ ] Displays submission ID
- [ ] Shows next steps information
- [ ] Navigation options work
- [ ] Progress indicator shows Step 3 of 3

---

## 🔍 Browser DevTools Checks

### Console Checks
- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] No hydration mismatches
- [ ] No SSR errors

### Network Tab Checks
- [ ] API calls return 200 status
- [ ] No failed requests
- [ ] Response times are acceptable
- [ ] CORS headers are correct (if applicable)

### Application > Session Storage
Check stored data:
- [ ] `selectedIndustry` - Industry selected
- [ ] `registrationData` - Registration form data
- [ ] `complianceData` - Compliance information
- [ ] `bankingData` - Banking information
- [ ] `artisanId` - Created artisan ID
- [ ] `selectedProduct` - Selected product name
- [ ] `selectedProductIndustry` - Product industry
- [ ] `productConfiguration` - Product config data
- [ ] `marketIntelligence` - Market intelligence data

### Performance Checks
- [ ] Page load time < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] No layout shifts
- [ ] Smooth animations (60fps)

---

## 🐛 Common Issues & Fixes

### Issue: Server not starting
**Fix**: Check if port 3000 is already in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Issue: npm install fails with permission errors
**Fix**: Fix npm cache permissions
```bash
sudo chown -R $(whoami) ~/.npm
npm install
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
- Form data in sessionStorage
- Zod schema validation

### Issue: Redirect not working
**Check**:
- Browser console for errors
- Network tab for API response
- sessionStorage has required data
- Router navigation code

### Issue: Charts not displaying
**Check**:
- Dynamic imports are configured (`ssr: false`)
- Recharts components are client-side only
- No SSR errors in console

### Issue: Market intelligence not updating
**Check**:
- API endpoint returns correct data
- Market parameter is passed correctly
- State updates properly
- No network errors

### Issue: Product insights page blank
**Check**:
- API returns data (check Network tab)
- Industry/product parameters are correct
- Data structure matches expected format
- Intersection Observer is working
- CSS animations are not hiding content

---

## 📊 Test Data

### Valid Test Data:

**Registration:**
- **Type**: Individual or Company
- **Industry**: Leather or Carpets
- **Name**: `John Doe` or `ABC Company`
- **Email**: `test@example.com`
- **Mobile**: `9876543210`

**Compliance:**
- **UDYAM Number**: `UDYAM-DL-01-0001234`
- **PAN**: `ABCDE1234F`
- **GST**: `07ABCDE1234F1Z5`

**Banking:**
- **Bank**: Any from dropdown (SBI, HDFC, ICICI, Axis, PNB)
- **Account Number**: `1234567890`
- **IFSC**: `SBIN0001234`

**Production:**
- **Quantity**: `100`
- **Completion Date**: Future date
- **Leather Source**: `local` or `imported`
- **Tanning Process**: `Vegetable-tanned`
- **Yarn Supplier**: `local` or `imported`
- **Dyeing Method**: `Natural Dyes`

---

## ✨ Expected Behavior

### Complete Flow:
1. **Welcome** → Click "Get Started"
2. **Register** → Fill form → Select industry → Continue
3. **Compliance** → Check registrations → Continue
4. **Banking** → Fill bank details → Verify → Continue
5. **Profile Summary** → Review → Complete Onboarding
6. **Product Select** → Choose product → Configure or View Insights
7. **Product Configure** → Fill form → View market intelligence → Continue
8. **Production Input** → Fill production details → Continue
9. **Production Preview** → Review → Submit
10. **Production Submit** → Success confirmation

### Data Persistence:
- All form data persists via sessionStorage
- Data survives page refreshes
- Data cleared on logout (if implemented)

### Validation:
- Real-time validation with error messages
- Required fields highlighted
- Format validation (email, mobile, IFSC)
- Custom validation rules

### Status Updates:
- Visual feedback for compliance verification
- Banking account verification status
- Toast notifications for actions
- Loading states during API calls

### Scheme Detection:
- Phase 1 schemes automatically detected based on registrations
- Phase 2 schemes shown based on product and market
- Scheme badges display correctly
- Pricing adjustments reflect schemes

---

## 🎯 Success Criteria

### Phase 1
✅ All screens load without errors  
✅ Form validation works correctly  
✅ Status indicators update properly  
✅ API calls succeed  
✅ Profile is created successfully  
✅ Redirect to products page works  
✅ Toast notifications appear  
✅ Data persists in sessionStorage  

### Phase 2
✅ Product selection filters by industry  
✅ Product configuration form works  
✅ Market intelligence displays correctly  
✅ Market selection updates data  
✅ Charts render without errors  
✅ Product insights page displays data  
✅ Market filtering works for raw materials  
✅ No SSR/hydration errors  

### Phase 3
✅ Production forms work correctly  
✅ Industry-specific fields display  
✅ Preview shows all data  
✅ Submission succeeds  
✅ Success confirmation displays  
✅ Complete workflow functions  

### Technical
✅ No console errors  
✅ No TypeScript errors  
✅ Responsive design works  
✅ Performance is acceptable  
✅ Vercel deployment succeeds  
✅ Build completes without errors  

---

## 🚀 Deployment Testing

### Vercel Deployment Checks:
- [ ] Build completes successfully
- [ ] No build errors or warnings
- [ ] Application deploys to production
- [ ] Root route redirects correctly
- [ ] All pages are accessible
- [ ] API routes work correctly
- [ ] No 404 errors
- [ ] Performance is acceptable

### Production URL Testing:
- [ ] All routes work correctly
- [ ] Forms submit successfully
- [ ] API endpoints respond
- [ ] Images and assets load
- [ ] No CORS errors
- [ ] SSL certificate is valid

---

**Happy Testing!** 🚀

For issues or questions, check the browser console and network tab for detailed error messages.
