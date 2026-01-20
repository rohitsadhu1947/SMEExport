# Artisan Market Platform - POC Application

A comprehensive Proof of Concept (POC) application for connecting artisans and small-scale producers with global export-import markets.

## 🚀 Features

- **Phase 1**: Artisan onboarding and profile creation with compliance verification
- **Phase 2**: Product selection and configuration with market intelligence
- **Phase 3**: Production input and submission workflow
- **Market Intelligence**: Real-time insights on demand, trends, and pricing
- **Product Insights**: Detailed raw materials analysis and market-specific requirements
- **Government Schemes**: Automatic detection and application of eligible subsidies
- **Apple-like UI/UX**: Professional, minimalist design with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **State Management**: React Hooks + Session Storage

## 📦 Installation

```bash
cd frontend
npm install
```

## 🏃 Running the Application

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
POC-APPLICATION/
├── frontend/
│   ├── app/                    # Next.js app router pages
│   ├── components/             # Reusable UI components
│   ├── data/                  # Mock data files
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript type definitions
└── IMPLEMENTATION_PLAN.md     # Detailed implementation plan
```

## 🎯 Supported Industries

- **Leather**: Leather Shoes, Leather Bags, Leather Belts
- **Carpets**: Bhadohi Carpets, Persian Carpets, Modern Carpets

## 📝 Key Pages

- `/welcome` - Landing page
- `/register` - Artisan registration
- `/compliance` - Compliance verification
- `/banking` - Banking integration
- `/profile-summary` - Profile overview
- `/products/select` - Product selection
- `/products/configure` - Product configuration
- `/products/[industry]/insights` - Product insights
- `/production/input` - Production input forms
- `/production/preview` - Production preview
- `/production/submit` - Submission confirmation

## 🔐 Authentication

This is a POC application using mock authentication. In production, integrate with proper authentication services.

## 📄 License

This is a POC application for demonstration purposes.
