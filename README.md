# 💰 FinTrack - Personal Finance Manager

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.50.3-green.svg)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A comprehensive personal finance management platform built with React, TypeScript, and Supabase. Take control of your finances with beautiful charts, intelligent budgeting, and multi-currency support.

## ✨ Features

### 🏦 **Account Management**
- Connect and manage multiple bank accounts, credit cards, and digital wallets
- Support for various account types (checking, savings, credit, investment, cash)
- Real-time balance tracking and account categorization

### 📊 **Transaction Tracking**
- Automatic expense categorization with 12+ predefined categories
- Income, expense, and transfer transaction types
- Advanced filtering and search capabilities
- Recurring transaction support

### 💡 **Smart Budgeting**
- Create intelligent budgets with real-time spending alerts
- Visual progress tracking with color-coded status indicators
- Weekly, monthly, and yearly budget periods
- Budget vs. actual spending analysis

### 📈 **Financial Insights & Reports**
- Beautiful charts and visualizations for expense analysis
- Category-wise spending breakdown
- Income vs. expense trends
- Monthly financial summaries and savings rate calculations
- Export capabilities (CSV, PDF)

### 🌍 **Multi-Currency Support**
- Support for 6 major currencies (USD, EUR, GBP, JPY, CAD, AUD)
- Real-time exchange rate conversion
- Built-in currency converter tool
- Automatic currency formatting

### 🎨 **Modern UI/UX**
- Beautiful, responsive design with dark/light theme support
- Smooth animations and micro-interactions
- Mobile-first responsive layout
- Intuitive navigation and user experience

### 🔒 **Security & Privacy**
- Supabase authentication with Google OAuth integration
- Row-level security (RLS) for data protection
- Bank-level encryption and security standards
- Local data persistence with secure cloud sync

### 🌐 **Internationalization**
- Multi-language support (English, Spanish, French, German)
- Localized number and currency formatting
- Easy language switching

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase account** (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fintrack.git
   cd fintrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to Settings → API and copy your project URL and anon key
   
   c. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database schema**
   
   Run these SQL commands in your Supabase SQL editor:
   
   ```sql
   -- Enable Row Level Security
   ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
   
   -- Create accounts table
   CREATE TABLE accounts (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     name TEXT NOT NULL,
     type TEXT NOT NULL CHECK (type IN ('checking', 'savings', 'credit', 'investment', 'cash', 'other')),
     balance DECIMAL(12,2) DEFAULT 0,
     currency TEXT DEFAULT 'USD',
     color TEXT DEFAULT '#7B61FF',
     institution TEXT,
     last_four TEXT,
     is_hidden BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   -- Create transactions table
   CREATE TABLE transactions (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
     amount DECIMAL(12,2) NOT NULL,
     description TEXT NOT NULL,
     category TEXT,
     type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'transfer')),
     date DATE NOT NULL,
     is_recurring BOOLEAN DEFAULT FALSE,
     notes TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   -- Create budgets table
   CREATE TABLE budgets (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     name TEXT NOT NULL,
     amount DECIMAL(12,2) NOT NULL,
     spent DECIMAL(12,2) DEFAULT 0,
     category TEXT NOT NULL,
     period TEXT NOT NULL CHECK (period IN ('weekly', 'monthly', 'yearly')),
     start_date DATE NOT NULL,
     end_date DATE,
     color TEXT DEFAULT '#7B61FF',
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   -- Enable RLS policies
   ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
   
   -- Create RLS policies
   CREATE POLICY "Users can manage their own accounts" ON accounts
     FOR ALL USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can manage their own transactions" ON transactions
     FOR ALL USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can manage their own budgets" ON budgets
     FOR ALL USING (auth.uid() = user_id);
   ```

5. **Configure Google OAuth (Optional)**
   
   a. Go to Supabase Dashboard → Authentication → Settings
   
   b. Enable Google provider and add your Google OAuth credentials
   
   c. Add your domain to the allowed redirect URLs

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:5173` to see FinTrack in action!

## 📱 Usage Guide

### Getting Started
1. **Sign Up/Login**: Create an account using email/password or Google OAuth
2. **Add Your First Account**: Click "Add Account" to connect your bank account, credit card, or cash account
3. **Record Transactions**: Start adding your income and expenses to track your spending
4. **Set Up Budgets**: Create budgets for different categories to control your spending
5. **Explore Reports**: View your financial insights and spending patterns

### Key Features Walkthrough

#### 🏦 Managing Accounts
- **Add Account**: Click the "+" button to add checking, savings, credit, or investment accounts
- **View Balances**: See all account balances on the dashboard and accounts page
- **Edit Account**: Update account details, colors, and settings

#### 💳 Recording Transactions
- **Quick Add**: Use the "Add Transaction" button for fast entry
- **Categorization**: Assign transactions to categories like Food, Transportation, Entertainment
- **Recurring Transactions**: Set up automatic recurring income or expenses
- **Search & Filter**: Find specific transactions using the search and filter tools

#### 📊 Budget Management
- **Create Budgets**: Set spending limits for different categories
- **Track Progress**: Visual progress bars show how much you've spent vs. your budget
- **Alerts**: Get notified when you're approaching or exceeding budget limits

#### 📈 Financial Reports
- **Dashboard Overview**: Quick snapshot of your financial health
- **Expense Charts**: Visual breakdown of spending by category
- **Trends**: Track income vs. expenses over time
- **Export Data**: Download reports as CSV or PDF

#### 💱 Currency Features
- **Multi-Currency**: Add accounts in different currencies
- **Currency Converter**: Convert between supported currencies with real-time rates
- **Auto-Conversion**: Automatic conversion for reporting and analysis

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Context API
- **Authentication**: Supabase Auth with Google OAuth

## 🗂️ Project Structure

```
fintrack/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   └── layout/          # Layout components (Header, Sidebar, Footer)
│   ├── context/             # React Context providers
│   │   ├── AuthContext.tsx  # Authentication state
│   │   ├── DataContext.tsx  # Financial data management
│   │   ├── ThemeContext.tsx # Theme switching
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── AccountsPage.tsx
│   │   ├── TransactionsPage.tsx
│   │   └── ...
│   ├── services/            # API and external services
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions and translations
│   └── lib/                 # Third-party library configurations
├── public/                  # Static assets
└── ...config files
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/fintrack/issues)
2. Create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if applicable
   - Your environment details

### 💡 Suggesting Features
1. Check existing [Issues](https://github.com/yourusername/fintrack/issues) for similar suggestions
2. Create a new feature request with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

### 🔧 Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow the installation steps above
4. Make your changes
5. Test thoroughly
6. Commit with clear messages: `git commit -m 'Add amazing feature'`
7. Push to your branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### 📝 Code Guidelines
- Use TypeScript for type safety
- Follow the existing code style and patterns
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design for all new UI components
- Test your changes across different browsers

## 🗺️ Roadmap

### 🎯 Upcoming Features
- [ ] **Bank Integration**: Connect directly to banks via Plaid/Open Banking
- [ ] **Investment Tracking**: Portfolio management and stock tracking
- [ ] **Bill Reminders**: Automated bill payment reminders
- [ ] **Financial Goals**: Savings goals with progress tracking
- [ ] **Receipt Scanning**: OCR for automatic expense entry
- [ ] **Advanced Analytics**: Machine learning insights and predictions
- [ ] **Mobile App**: React Native mobile application
- [ ] **API Access**: RESTful API for third-party integrations

### 🔄 Continuous Improvements
- [ ] Enhanced security features
- [ ] More currency support
- [ ] Additional language translations
- [ ] Performance optimizations
- [ ] Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### 📚 Documentation
- Check our [Wiki](https://github.com/yourusername/fintrack/wiki) for detailed guides
- Browse [Issues](https://github.com/yourusername/fintrack/issues) for common problems

### 💬 Community
- **GitHub Discussions**: Ask questions and share ideas
- **Email**: support@fintrack.app
- **Twitter**: [@FinTrackApp](https://twitter.com/FinTrackApp)

### 🐛 Found a Bug?
Please report it in our [Issues](https://github.com/yourusername/fintrack/issues) section.

## 🙏 Acknowledgments

- **Supabase** for providing an excellent backend-as-a-service platform
- **Tailwind CSS** for the beautiful and responsive design system
- **Lucide** for the comprehensive icon library
- **React Community** for the amazing ecosystem and tools

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Your Name](https://github.com/yourusername)

[🌐 Live Demo](https://fintrack-demo.vercel.app) • [📖 Documentation](https://github.com/yourusername/fintrack/wiki) • [🐛 Report Bug](https://github.com/yourusername/fintrack/issues) • [💡 Request Feature](https://github.com/yourusername/fintrack/issues)

</div>