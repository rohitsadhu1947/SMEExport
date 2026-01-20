# Artisan Market Platform - POC Application

A comprehensive Proof of Concept (POC) application for connecting artisans and small-scale producers with global export-import markets. Built with Next.js 14, featuring an Apple-like professional UI/UX design.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically redirect to `/welcome`.

### Build for Production

```bash
npm run build
npm start
```

## 📋 Project Status

### ✅ Phase 1: Artisan Onboarding & Profile Creation (COMPLETE)
- [x] Welcome screen with professional Apple-like design
- [x] Registration form (Individual/Company) with industry selection
- [x] Compliance verification screen (UDYAM, Tax, GST)
- [x] Banking integration screen with account verification
- [x] Profile summary with Phase 1 schemes
- [x] Mock API endpoints for onboarding
- [x] Toast notification system
- [x] Session storage for data persistence

### ✅ Phase 2: Product & Market Layer (COMPLETE)
- [x] Product selection screen with industry filtering
- [x] Dynamic product configurator with conditional fields
- [x] Market intelligence panel with market-specific data
- [x] Market selection dropdown (USA, EU, Domestic, Middle East)
- [x] Pricing tier panel (Premium/Standard)
- [x] Phase 2 scheme overlays
- [x] Product insights page with raw materials analysis
- [x] Market-specific requirements and pricing impact
- [x] Trend analysis charts (Recharts)

### ✅ Phase 3: Production Input & Submission (COMPLETE)
- [x] Production input forms with industry-specific fields
- [x] Validation rules and error handling
- [x] Preview screen with data summary
- [x] Submission confirmation screen
- [x] Complete workflow integration

## 🗂️ Project Structure

```
POC-APPLICATION/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── artisan/       # Artisan profile endpoints
│   │   ├── onboard/       # Onboarding endpoint
│   │   ├── products/      # Product configuration endpoints
│   │   ├── product-intelligence/  # Market intelligence endpoint
│   │   ├── product-insights/      # Product insights endpoint
│   │   ├── schemes/       # Government scheme endpoints
│   │   └── submit-product/ # Production submission endpoint
│   ├── welcome/           # Landing page
│   ├── register/          # Registration form
│   ├── compliance/        # Compliance verification
│   ├── banking/           # Banking integration
│   ├── profile-summary/   # Profile overview
│   ├── products/          # Product selection & configuration
│   │   ├── select/        # Product selection
│   │   ├── configure/     # Product configuration
│   │   └── [industry]/insights/  # Product insights
│   └── production/        # Production workflow
│       ├── input/         # Production input forms
│       ├── preview/       # Preview screen
│       └── submit/        # Submission confirmation
├── components/
│   ├── ui/                # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Card.tsx
│   │   ├── Alert.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── Toast.tsx
│   ├── forms/             # Form components
│   │   └── DynamicProductForm.tsx
│   ├── intelligence/      # Market intelligence components
│   │   └── MarketIntelligencePanel.tsx
│   └── layout/            # Layout components
│       ├── Breadcrumbs.tsx
│       ├── Sidebar.tsx
│       └── Topbar.tsx
├── data/                  # Mock data files
│   ├── products.json
│   ├── market-intelligence.json
│   ├── product-insights.json
│   ├── schemes.json
│   └── mock-artisans.json
├── lib/                   # Utilities
│   ├── configurator.ts    # Configurator logic
│   ├── validation.ts      # Zod validation schemas
│   └── utils.ts           # Utility functions
├── types/                 # TypeScript type definitions
│   ├── artisan.ts
│   ├── product.ts
│   ├── market.ts
│   ├── scheme.ts
│   └── product-insights.ts
├── public/                # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.js
└── vercel.json            # Vercel deployment configuration
```

## 🎨 Design System

### UI/UX Philosophy
- **Apple-like Design**: Minimalist, professional, refined aesthetic
- **Subtle Animations**: Smooth transitions and hover effects
- **Generous Whitespace**: Clean, uncluttered layouts
- **Typography**: Refined font hierarchy with Inter font family
- **Color Palette**: Professional slate tones with subtle accents

### Colors
- **Primary**: `slate-700` (#475569)
- **Secondary**: `slate-800` (#334155)
- **Accent**: Amber tones for highlights
- **Background**: White with subtle gray gradients
- **Error**: `#DC2626`
- **Success**: `#10B981`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive**: Mobile-first approach
- **Scale**: Fluid typography with proper hierarchy

## 🏭 Supported Industries & Products

### Leather Industry
- **Leather Shoes**: Premium quality leather footwear
- **Leather Bags**: Handbags, backpacks, totes, messenger bags
- **Leather Belts**: High-quality belts with custom buckles

### Carpets Industry
- **Bhadohi Carpets**: Traditional handcrafted carpets
- **Persian Carpets**: Luxurious Persian-style carpets with intricate patterns
- **Modern Carpets**: Contemporary designs for modern interiors

## 🔌 API Endpoints

### Phase 1: Onboarding
- `POST /api/onboard` - Create artisan profile
- `GET /api/artisan/[id]` - Get artisan profile
- `PUT /api/artisan/[id]` - Update artisan profile
- `GET /api/schemes/phase1` - Get Phase 1 schemes

### Phase 2: Products & Market Intelligence
- `GET /api/products/[industry]` - Get products for an industry
  - Query params: `?product=<productName>` - Get specific product
- `GET /api/product-intelligence` - Get market intelligence
  - Query params: `?industry=<industry>&product=<product>&market=<market>`
- `GET /api/product-insights/[industry]` - Get product insights
  - Query params: `?product=<productName>`
- `GET /api/schemes/phase2` - Get Phase 2 schemes

### Phase 3: Production
- `POST /api/submit-product` - Submit production-ready product

## 📝 Key Features

### 1. Dynamic Product Configurator
- Conditional field visibility based on selections
- Tier-based adjustments (Premium/Standard)
- Real-time validation with Zod schemas
- Industry-specific form fields

### 2. Market Intelligence
- Market-specific demand index (High/Medium/Low)
- Trend analysis with interactive charts
- Price benchmarking and suggestions
- Market selection (USA, EU, Domestic, Middle East)
- Applicable government schemes per market

### 3. Product Insights
- Raw materials analysis with market requirements
- Price impact indicators
- Market-specific recommendations
- Production requirements (MOQ, lead time, certifications)
- Quality standards and compliance

### 4. Toast Notification System
- Success, error, warning, and info notifications
- Auto-dismiss with configurable duration
- Smooth animations

### 5. Session Storage Management
- Persistent data across page navigation
- Artisan profile storage
- Product configuration storage
- Market intelligence caching

## 🚀 Deployment

### Vercel Deployment
The application is configured for Vercel deployment:

1. **Repository**: Connected to GitHub
2. **Build Configuration**: `vercel.json` specifies build commands
3. **Environment**: Automatic detection of Next.js framework
4. **Root Directory**: Application files are at repository root

### Build Configuration
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### Deployment Steps
1. Push code to GitHub repository
2. Vercel automatically detects changes
3. Builds and deploys to production
4. Provides preview URLs for each commit

## 🧪 Testing

### Run Linter
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

### Development Testing
See `TESTING_GUIDE.md` for comprehensive testing checklist.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.3 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Forms**: React Hook Form 7.x + Zod 3.x
- **Charts**: Recharts 2.x
- **State**: React Hooks + Session Storage
- **Fonts**: Inter (Google Fonts)

### Development Tools
- **Package Manager**: npm
- **TypeScript**: Type checking
- **ESLint**: Code quality
- **Git**: Version control

## 📚 Documentation

- **Implementation Plan**: See `IMPLEMENTATION_PLAN.md` for detailed architecture
- **Testing Guide**: See `TESTING_GUIDE.md` for testing procedures
- **API Documentation**: See API route files in `app/api/` for endpoint details

## 🔧 Technical Notes

### SSR/SSG Considerations
- Pages using `useSearchParams()` are wrapped in Suspense boundaries
- Dynamic imports used for Recharts components (`ssr: false`)
- `export const dynamic = 'force-dynamic'` for pages requiring runtime data
- Client-side redirects for root page navigation

### Performance Optimizations
- Dynamic imports for heavy components
- Lazy loading for charts
- Optimized images and assets
- Efficient state management

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Touch-friendly interactions

## 🎯 Next Steps (Future Enhancements)

1. **Authentication**: Integrate proper authentication service
2. **Database**: Replace mock data with real database
3. **Payment Integration**: Add payment gateway for transactions
4. **Real-time Updates**: WebSocket integration for live updates
5. **Advanced Analytics**: Enhanced reporting and analytics
6. **Multi-language Support**: Internationalization (i18n)
7. **Progressive Web App**: PWA capabilities
8. **Advanced Search**: Product and market search functionality

## 📄 License

This is a POC application for demonstration purposes.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
