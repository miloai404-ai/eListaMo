# eListaMo
🇵🇭 A cute but powerful Filipino finance app featuring Baon Mode for daily allowance tracking and Utang Tracker for debt management. Built with React + TypeScript + Supabase.

## Features

### 💰 **Baon Mode**
Perfect for students! Track your daily allowance and see your savings grow.

### 📊 **Utang Tracker** 
Manage your "Utang Ko" and "Utang Nila" - digitize your traditional lista system.

### 📝 **Personal Ledger**
Track your Pagkain, Transpo, Bills, and all expenses with Filipino categories.

### 👨‍👩‍👧‍👦 **Family Wallet**
Share expenses with your pamilya. Generate invite codes for household budget management.

### 📈 **Inflation Dashboard**
See how price hikes affect your spending. Get alerts like "Ang gastos mo sa Pagkain ay tumaas ng 28%".

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/miloai404-ai/eListaMo.git
cd eListaMo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your Supabase credentials in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Deploying to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

## Contributing

We welcome contributions! This project aims to build financial resilience for every Filipino family.

## SDG Goals

- **SDG 1**: No Poverty
- **SDG 4**: Quality Education  
- **SDG 10**: Reduced Inequalities

---

**PdP Tech - Petsa de Peligro System Tech**

*Building financial resilience for every Filipino family*