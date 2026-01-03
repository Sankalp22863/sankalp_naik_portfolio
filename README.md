# Sankalp Naik - Portfolio

A modern, interactive portfolio website built with Next.js, featuring a dark theme with glass morphism effects, interactive animations, and comprehensive sections showcasing skills, experience, research, and projects.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, React, TypeScript, and Tailwind CSS
- **Interactive UI**: 
  - 3D tilt effects on cards using Framer Motion
  - Floating parallax profile card
  - Smooth scroll animations
  - Holiday-themed cursor (December only)
  - Auto-dismissing opportunity popup
- **Comprehensive Sections**:
  - Skills showcase with categorized technologies
  - Experience & Education timeline
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
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_HOLIDAY_CURSOR=1  # Enable holiday cursor year-round
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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── Portfolio.jsx          # Main portfolio component
│   │   ├── page.tsx               # Root page
│   │   ├── layout.tsx             # Root layout with GA
│   │   ├── globals.css            # Global styles & CSS variables
│   │   └── _components/
│   │       └── GtagPageView.tsx   # GA page view tracking
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── Analytics.tsx          # Analytics wrapper
│   │   ├── ArticleCard.tsx        # Article display card
│   │   ├── Contributions.tsx      # GitHub contributions calendar
│   │   ├── FloatingParallaxCard.tsx  # Interactive profile card
│   │   ├── HolidayCursor.tsx      # Holiday-themed cursor
│   │   ├── ProjectCard.tsx        # Project display card
│   │   └── ResearchCard.tsx       # Research paper card
│   ├── data/
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

1. **Personal Information**: Edit `src/app/Portfolio.jsx` - update name, bio, social links, etc.

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

5. **Experience & Education**: Update the `EXPERIENCE` and `EDUCATION` constants in `src/app/Portfolio.jsx`

6. **Skills**: Update the skills cards in the Skills section of `src/app/Portfolio.jsx`

### Styling

- **Color Theme**: Edit CSS variables in `src/app/globals.css`
- **Components**: Customize shadcn/ui components in `src/components/ui`
- **Animations**: Adjust Framer Motion settings in component files

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deployment

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

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: TypeScript, JavaScript (JSX)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **GitHub Calendar**: [react-github-calendar](https://github.com/grubersjoe/react-github-calendar)
- **Typewriter Effect**: [react-simple-typewriter](https://github.com/awran5/react-simple-typewriter)
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
