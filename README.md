# AmpereArc - Sustainable Energy Solutions

AmpereArc is a premium web platform for modern energy infrastructure. Built with cutting-edge technologies, it provides a seamless interface for exploring home and commercial-scale Battery Energy Storage Systems (BESS), Solar Solutions, and EV Infrastructure.

## 🚀 Key Features

- **Dynamic Product Bento Grid**: Highly optimized product exploration with category-based filtering.
- **Solar Calculator**: Predictive tool for calculating savings and energy ROI.
- **Real-time Global Visualization**: Integrated world-map tracking sustainable energy impact.
- **Adaptive Architecture**: High-density design with full Dark Mode support and mobile optimization.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid transitions.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a curated "Dark Gray" palette.
- **Components**: [Lucide React](https://lucide.dev/) icons, custom SVG Gooey Filters.
- **State Management**: React Hooks & Context for theme and UI state.

## 📦 Production Setup

To run this project in a production environment:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file for any API keys (e.g., Maps, Analytics).

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm run start
   ```

## 🌐 Deployment

This project is optimized for deployment on **Vercel** or any Node.js compatible environment.

- **Vercel**: Simply connect the GitHub repository for automatic CI/CD.
- **Self-Hosting**: Ensure `node` version matches the requirement in `package.json`.

## 📂 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Modular UI components categorized by section (home, ui, layout).
- `src/lib/`: Data models, utility functions, and mock databases.
- `public/`: High-resolution assets including logos and product shots.

---
© 2026 AmpereArc. All rights reserved.
