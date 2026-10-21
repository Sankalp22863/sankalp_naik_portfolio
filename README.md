# Sankalp Naik - Portfolio

A responsive academic portfolio built with Next.js. The layout takes inspiration from [William S. Moses’s academic website](https://wsmoses.com/): a white background, portrait and section navigation in a left sidebar, a biography with contact details, and compact research and publication entries. Content belongs to Sankalp Naik and incorporates `academic_CV/AcademicCV.pdf`.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React, TypeScript, and Tailwind CSS
- **Academic Layout**:
  - Responsive portrait sidebar and section navigation
  - Expandable research details and publication abstracts
  - Keyboard-accessible links, filters, and labeled contact fields
  - Academic CV and resume downloads
- **Comprehensive Sections**:
  - Skills showcase with categorized technologies
  - Research, experience, education, teaching, and honors
  - Research publications with expandable abstracts
  - Project portfolio with filtering
  - Medium articles showcase
  - GitHub contributions calendar
  - Contact form
- **Performance Optimized**: 
  - Static site generation
  - Image optimization with Next.js Image
  - Dynamic imports for non-critical components
- **Analytics Integration**: Google Analytics support via environment variables

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sankalp-portfolio.git
cd sankalp-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables (optional):
```bash
# Create a .env.local file
NEXT_PUBLIC_GA_ID=G-1F2J2C58G8
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `src/app/AcademicPortfolio.jsx`. The page auto-updates as you edit the file.

This project uses `next/font` to load Source Sans 3 and Geist Mono. The initial production build needs access to Google Fonts.

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── AcademicPortfolio.jsx  # Active academic portfolio
│   │   ├── academic.module.css    # Responsive academic layout
│   │   ├── Portfolio.jsx          # Preserved previous design
│   │   ├── page.tsx               # Root page
│   │   ├── layout.tsx             # Root layout with GA
│   │   ├── globals.css            # Global styles & CSS variables
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── Analytics.tsx          # Portfolio interaction tracking
│   │   ├── ArticleCard.tsx        # Article display card
│   │   ├── Contributions.tsx      # GitHub contributions calendar
│   │   ├── FloatingParallaxCard.tsx  # Interactive profile card
│   │   ├── HolidayCursor.tsx      # Holiday-themed cursor
│   │   ├── ProjectCard.tsx        # Project display card
│   │   └── ResearchCard.tsx       # Research paper card
│   ├── data/
│   │   ├── academic.json          # CV-backed research, experience, education, skills
│   │   ├── articles.json          # Medium articles data
│   │   ├── projects.json          # Projects data
│   │   └── research.json          # Research papers data
│   ├── lib/
│   │   ├── gtag.ts                # Google Analytics utilities
│   │   └── utils.ts               # Utility functions
│   └── types/
│       ├── global.d.ts            # Global type definitions
│       └── projects.ts            # Project type definitions
├── public/
│   ├── res/                       # Resources (images, resume)
│   └── Awards/                    # Award images
└── ...config files
```

## 🎨 Customization

### Update Content

1. **Personal Information**: Edit `src/app/AcademicPortfolio.jsx` - update name, bio, social links, etc.

2. **Projects**: Edit `src/data/projects.json`:
```json
{
  "title": "Project Name",
  "desc": "Description",
  "tags": ["Tag1", "Tag2"],
  "codeUrl": "https://github.com/...",
  "demoUrl": "https://...",
  "featured": true
}
```

3. **Research Papers**: Edit `src/data/research.json`

4. **Articles**: Edit `src/data/articles.json`

5. **Research, Experience, Education, Teaching & Awards**: Edit `src/data/academic.json`. Keep ongoing research and pending patents labeled with their current status.

6. **Skills**: Update `skills` in `src/data/academic.json`.

7. **Academic CV**: After updating `academic_CV/AcademicCV.pdf`, copy it to `public/res/AcademicCV.pdf` to update the downloadable version. The existing resume remains at `public/res/SankalpNaikResume.pdf`.

### Styling

- **Academic Layout**: Edit `src/app/academic.module.css` for typography, colors, spacing, and responsive behavior.
- **Shared Styles**: Edit `src/app/globals.css` for global CSS variables.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deployment

### Google Analytics

See [the analytics guide](docs/analytics.md) to find the property tracking this site and view visitor, page-view, acquisition, CV download, and interaction reports. The GitHub Pages workflow sets the public `NEXT_PUBLIC_GA_ID` to `G-1F2J2C58G8`; it does not use the previous repository secret. Analytics runs only in production builds and uses automatic GA4 page views to avoid double-counting.

### GitHub Pages

`.github/workflows/nextjs.yml` builds with Node.js 24 and deploys the static export using GitHub's Pages artifact workflow. In repository **Settings → Pages**, the source is **GitHub Actions**. Push to `main` or run **Deploy Next.js site to Pages** manually. This workflow preserves the `sankalpnaik.me` domain and injects the analytics ID at build time; a separate `gh-pages` branch deployment is unnecessary.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/sankalp-portfolio)

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables (if using GA)
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Static Export

The site is configured for static export. To build:

```bash
npm run build
```

The static files will be in the `out` directory.

## 📦 Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: TypeScript, JavaScript (JSX)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **GitHub Calendar**: [react-github-calendar](https://github.com/grubersjoe/react-github-calendar)
- **Analytics**: Google Analytics

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

**Sankalp Naik**
- Email: sgnaik@andrew.cmu.edu
- LinkedIn: [linkedin.com/in/sankalp-naik-ml](https://www.linkedin.com/in/sankalp-naik-ml/)
- GitHub: [github.com/Sankalp22863](https://github.com/Sankalp22863)

---

Made with ❤️, help from copilot and lots of coffee.
