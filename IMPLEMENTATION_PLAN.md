# Artisan Market Platform - POC Implementation Plan

## 📋 Project Overview
**Objective**: Build a 3-phase POC demonstrating artisan onboarding, product configuration, and marketplace readiness for Leather Shoes and Bhadohi Carpets industries.

**Timeline**: 3 Days  
**Focus**: UI/UX demonstration + dynamic configurator + mock backend

---

## 🛠 Tech Stack Selection

### Frontend
- **Framework**: Next.js 14 (React-based, SSR/SSG support, API routes)
- **Styling**: Tailwind CSS (rapid UI development, responsive design)
- **Form Management**: React Hook Form + Zod (dynamic forms, validation)
- **State Management**: React Context API + useState/useReducer
- **UI Components**: Custom components (aligned with design tokens)
- **Charts/Visualization**: Recharts (market intelligence visualization)

### Backend
- **Runtime**: Node.js with Express (or Next.js API routes)
- **Data Storage**: JSON files (mock database)
- **Validation**: Zod schemas
- **Mock APIs**: Next.js API routes for simplicity

### Development Tools
- **Package Manager**: npm or yarn
- **TypeScript**: For type safety
- **ESLint + Prettier**: Code quality
- **Git**: Version control

---

## 📁 Project Structure

```
POC-APPLICATION/
├── frontend/
│   ├── src/
│   │   ├── app/                    # Next.js app directory
│   │   │   ├── (auth)/
│   │   │   │   ├── welcome/        # Welcome screen
│   │   │   │   └── register/       # Registration
│   │   │   ├── (onboarding)/
│   │   │   │   ├── compliance/     # Compliance verification
│   │   │   │   ├── banking/        # Bank integration
│   │   │   │   └── profile-summary/ # Profile summary
│   │   │   ├── (products)/
│   │   │   │   ├── select/         # Product selection
│   │   │   │   ├── configure/      # Product configurator
│   │   │   │   └── intelligence/   # Market intelligence
│   │   │   ├── (production)/
│   │   │   │   ├── input/          # Production input forms
│   │   │   │   ├── preview/        # Preview & validation
│   │   │   │   └── submit/         # Submission confirmation
│   │   │   ├── dashboard/          # Artisan dashboard
│   │   │   ├── api/                # API routes
│   │   │   │   ├── onboard/
│   │   │   │   ├── product-intelligence/
│   │   │   │   └── submit-product/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx            # Home/landing
│   │   ├── components/
│   │   │   ├── ui/                 # Base UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Dropdown.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Alert.tsx
│   │   │   │   └── ProgressIndicator.tsx
│   │   │   ├── forms/              # Form components
│   │   │   │   ├── DynamicForm.tsx
│   │   │   │   ├── RegistrationForm.tsx
│   │   │   │   ├── ComplianceForm.tsx
│   │   │   │   ├── BankingForm.tsx
│   │   │   │   ├── ProductConfigurator.tsx
│   │   │   │   └── ProductionInputForm.tsx
│   │   │   ├── intelligence/       # Market intelligence
│   │   │   │   ├── MarketIntelligencePanel.tsx
│   │   │   │   ├── DemandGauge.tsx
│   │   │   │   ├── TrendChart.tsx
│   │   │   │   └── SchemeBadge.tsx
│   │   │   └── layout/             # Layout components
│   │   │       ├── Sidebar.tsx
│   │   │       ├── Topbar.tsx
│   │   │       └── Breadcrumbs.tsx
│   │   ├── contexts/               # React contexts
│   │   │   ├── ArtisanContext.tsx
│   │   │   ├── ProductContext.tsx
│   │   │   └── SchemeContext.tsx
│   │   ├── hooks/                  # Custom hooks
│   │   │   ├── useFormValidation.ts
│   │   │   ├── useConditionalFields.ts
│   │   │   └── useMarketIntelligence.ts
│   │   ├── lib/                    # Utilities
│   │   │   ├── configurator.ts     # Configurator logic
│   │   │   ├── validation.ts      # Validation schemas
│   │   │   ├── mockData.ts         # Mock data generators
│   │   │   └── constants.ts        # Constants
│   │   ├── types/                  # TypeScript types
│   │   │   ├── artisan.ts
│   │   │   ├── product.ts
│   │   │   ├── market.ts
│   │   │   └── scheme.ts
│   │   └── styles/
│   │       └── globals.css         # Global styles + Tailwind
│   ├── public/                     # Static assets
│   │   ├── images/
│   │   └── icons/
│   ├── data/                       # Mock data files
│   │   ├── artisans.json
│   │   ├── products.json
│   │   ├── market-intelligence.json
│   │   └── schemes.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── .env.local
├── README.md
├── IMPLEMENTATION_PLAN.md          # This file
└── .gitignore
```

---

## 🎯 Phase-by-Phase Implementation

### **Phase 1: Artisan Onboarding & Profile Creation**

#### Screens to Build:
1. **Welcome Screen**
   - Industry selection dropdown (Leather / Bhadohi Carpets)
   - "Start Onboarding" CTA
   - Clean, welcoming design

2. **Registration Form**
   - Individual/Company toggle
   - Name, Email, Mobile fields
   - Inline validation
   - Tooltip guidance for GST/Tax/UDYAM

3. **Compliance Verification**
   - Status indicators (Verified/Pending/Not Registered)
   - "Guide Me" workflow button
   - Visual feedback

4. **Bank Details Integration**
   - Pre-integrated bank dropdown
   - Account Number, IFSC fields
   - Verification success indicator

5. **Profile Summary**
   - Artisan profile overview card
   - Phase 1 schemes applied (badges)
   - Editable fields CTA
   - Progress indicator

#### API Endpoints:
- `POST /api/onboard` - Create artisan profile
- `GET /api/artisan/:id` - Get artisan profile
- `GET /api/schemes/phase1` - Get Phase 1 schemes

#### Mock Data:
- 2 pre-populated artisans (leather, carpet)
- Phase 1 schemes (MSME, UDYAM subsidies)

---

### **Phase 2: Product & Market Layer**

#### Screens to Build:
1. **Product Selection Screen**
   - Product cards for Leather Shoes and Bhadohi Carpets
   - Visual product representation
   - "Configure Product" CTA

2. **Dynamic Configurator Forms**
   - **Leather Shoes**: Material, Size, Color, Stitching Type, Design Complexity, Custom Design Option
   - **Bhadohi Carpets**: Material, Length, Width, Weave Type, Custom Design Option
   - Conditional fields based on premium/standard tier
   - Real-time validation

3. **Market Intelligence Panel**
   - Demand index gauge chart
   - Trend analysis line chart
   - Eligible markets list (color-coded)
   - Phase 2 scheme overlay badges

4. **Pricing Tier Panel**
   - Premium/Standard dynamic suggestion
   - Scheme-adjusted pricing visualization
   - Price breakdown

#### API Endpoints:
- `GET /api/product-intelligence?industry=<industry>` - Get market data
- `GET /api/products/:industry` - Get product configurator fields
- `GET /api/schemes/phase2` - Get Phase 2 schemes

#### Mock Data:
- Market intelligence data (demand, trends, eligible markets)
- Phase 2 schemes (Export Promotion, GST rebate)
- Pricing tier calculations

---

### **Phase 3: Production Input & Submission**

#### Screens to Build:
1. **Production Input Forms**
   - **Leather Shoes**: Shoe Type, Quantity, Stitching Type, Packaging Options
   - **Bhadohi Carpets**: Weave Type, Dimensions, Quantity, Packaging Options
   - Conditional fields based on tier and scheme eligibility
   - Inline validation messages

2. **Validation & Preview**
   - Summary of all inputs
   - Market intelligence summary
   - Applied schemes display
   - Validation status indicators

3. **Submission Confirmation**
   - Success message
   - Next steps information
   - "Go to Dashboard" CTA
   - Product submission ID

#### API Endpoints:
- `POST /api/submit-product` - Submit production-ready product
- `GET /api/submission/:id` - Get submission status

#### Mock Data:
- Submission confirmation responses
- Product metadata storage

---

## 🎨 UI/UX Implementation

### Design Tokens (from Figma spec):
- **Colors**:
  - Primary: `#1D4ED8`
  - Secondary: `#2563EB`
  - Accent: `#FBBF24`
  - Background: `#F9FAFB`
  - Error: `#DC2626`
- **Typography**: Inter font family
- **Spacing**: 8px grid system
- **Components**: Reusable, accessible, responsive

### Key UX Features:
- Step progress indicators
- Breadcrumb navigation
- Inline validation feedback
- Toast notifications
- Loading states
- Error handling
- Responsive design (mobile-first)

---

## 🔧 Core Features to Implement

### 1. Dynamic Form Configurator
- Conditional field visibility
- Tier-based adjustments
- Scheme overlay integration
- Real-time validation

### 2. Market Intelligence Engine
- Demand index calculation
- Trend analysis visualization
- Market eligibility determination
- Price tier suggestions

### 3. Government Scheme Integration
- Phase 1 scheme detection
- Phase 2 scheme application
- Scheme badge display
- Pricing adjustments

### 4. Validation System
- Mandatory field checks
- Regex validation (email, phone, etc.)
- Numeric range validation
- Conditional validation rules

---

## 📊 Mock Data Structure

### Artisan Profile:
```json
{
  "artisan_id": "uuid",
  "type": "individual|company",
  "legal_name": "",
  "registration": {
    "udyam_registered": true,
    "registration_number": "",
    "tax_registered": true,
    "tax_id": ""
  },
  "banking": {
    "account_number": "",
    "bank_name": "",
    "ifsc": ""
  },
  "contact": {
    "email": "",
    "mobile": "",
    "address": {}
  },
  "industry": "Leather|Bhadohi Carpets",
  "skill_level": "high|medium|low",
  "onboarding_status": "pending|verified",
  "phase1_schemes": []
}
```

### Product Configurator:
```json
{
  "product_id": "uuid",
  "industry": "Leather|Bhadohi Carpets",
  "name": "Leather Shoes|Bhadohi Carpets",
  "fields": [
    {
      "field_id": "material",
      "type": "dropdown",
      "label": "Material",
      "options": [],
      "conditional": false,
      "tier_dependent": false
    }
  ]
}
```

### Market Intelligence:
```json
{
  "industry": "Leather",
  "product": "Leather Shoes",
  "demand_index": "high|medium|low",
  "trend": "rising|stable|declining",
  "eligible_markets": ["Domestic", "EU", "USA"],
  "price_tier": "premium|standard",
  "phase2_schemes": []
}
```

---

## ✅ Implementation Checklist

### Day 1: Foundation & Phase 1
- [ ] Set up Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Create base UI components (Button, Input, Card, etc.)
- [ ] Implement layout components (Sidebar, Topbar, Breadcrumbs)
- [ ] Build Welcome screen
- [ ] Build Registration form
- [ ] Build Compliance verification screen
- [ ] Build Banking integration screen
- [ ] Build Profile summary screen
- [ ] Create mock API endpoints for Phase 1
- [ ] Set up mock data files
- [ ] Implement Phase 1 scheme integration

### Day 2: Phase 2 - Product & Market Intelligence
- [ ] Build Product selection screen
- [ ] Implement dynamic configurator logic
- [ ] Build Leather Shoes configurator form
- [ ] Build Bhadohi Carpets configurator form
- [ ] Implement conditional field logic
- [ ] Build Market Intelligence Panel
- [ ] Integrate charts (demand gauge, trend chart)
- [ ] Build Pricing Tier Panel
- [ ] Implement Phase 2 scheme overlay
- [ ] Create mock API endpoints for Phase 2
- [ ] Add market intelligence mock data

### Day 3: Phase 3 - Production Input & Polish
- [ ] Build Production input forms (both industries)
- [ ] Implement validation rules
- [ ] Build Preview screen
- [ ] Build Submission confirmation screen
- [ ] Create mock API endpoints for Phase 3
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Add toast notifications
- [ ] Responsive design testing
- [ ] Accessibility checks (WCAG 2.1 AA)
- [ ] Final testing and bug fixes
- [ ] Documentation

---

## 🚀 Getting Started Commands

```bash
# Initialize Next.js project
npx create-next-app@latest frontend --typescript --tailwind --app

# Install additional dependencies
npm install react-hook-form zod @hookform/resolvers recharts

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📝 Notes

- Focus on UI/UX demonstration and dynamic configurator logic
- Mock backend is sufficient for POC
- Keep code modular and extensible for future industries
- Ensure all forms are accessible and responsive
- Use TypeScript for type safety
- Follow design tokens from Figma specification
- Implement proper error handling and loading states

---

## 🎯 Success Criteria

✅ Artisan can complete onboarding with profile and bank integration  
✅ Artisan can select industry and configure product/sub-product dynamically  
✅ Market intelligence and government scheme overlays are visible per product  
✅ Artisan can submit production-ready inputs and receive confirmation  
✅ All UI screens are industry-agnostic but configured for POC industries  
✅ Responsive design works on mobile, tablet, and desktop  
✅ Accessible design meets WCAG 2.1 AA standards  

---

**Ready to start implementation!** 🚀
