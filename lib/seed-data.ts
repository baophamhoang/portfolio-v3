import type { Profile, Experience, Project, Skill } from './types'

export const seedProfile: Profile = {
  id: 1,
  name: 'Bao Pham',
  title: 'Creative Frontend Engineer',
  tagline: 'Building beautiful things at the intersection of code and design.',
  bio: "I'm a frontend engineer with a passion for crafting delightful user experiences. I love the intersection of engineering and design — where clean code meets beautiful interfaces. When I'm not pushing pixels, I'm exploring creative coding, generative art, and building tools that make people's lives a little easier.",
  email: 'hello@baopham.dev',
  github: 'https://github.com/baopham',
  linkedin: 'https://linkedin.com/in/baopham',
  twitter: 'https://twitter.com/baopham',
  location: 'San Francisco, CA',
  years_experience: 6,
  projects_count: 30,
}

export const seedExperience: Experience[] = [
  {
    id: 1,
    company: 'Vercel',
    role: 'Senior Frontend Engineer',
    start_date: '2022-06',
    end_date: undefined,
    description:
      'Building the future of web development tooling. Led the redesign of the deployment dashboard, improving performance by 40% and reducing time-to-first-deploy. Shipped features used by millions of developers daily.',
    tech_stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Go'],
    is_current: true,
    sort_order: 1,
    company_url: 'https://vercel.com',
    logo_color: '#000000',
  },
  {
    id: 2,
    company: 'Figma',
    role: 'Frontend Engineer',
    start_date: '2020-03',
    end_date: '2022-05',
    description:
      'Worked on the core canvas engine and plugin API. Built real-time collaboration features using WebSockets and CRDTs. Implemented the auto-layout system that became one of Figma\'s most used features.',
    tech_stack: ['TypeScript', 'WebGL', 'WebAssembly', 'Canvas API', 'React'],
    is_current: false,
    sort_order: 2,
    company_url: 'https://figma.com',
    logo_color: '#F24E1E',
  },
  {
    id: 3,
    company: 'Stripe',
    role: 'Software Engineer',
    start_date: '2018-07',
    end_date: '2020-02',
    description:
      'Built merchant-facing dashboard and payment flow UI. Led accessibility audit and remediation project achieving WCAG 2.1 AA compliance. Created component library adopted across 6 product teams.',
    tech_stack: ['React', 'Ruby on Rails', 'GraphQL', 'Storybook', 'Jest'],
    is_current: false,
    sort_order: 3,
    company_url: 'https://stripe.com',
    logo_color: '#635BFF',
  },
]

export const seedProjects: Project[] = [
  {
    id: 1,
    title: 'Canvas Studio',
    description:
      'An in-browser creative coding environment with live preview, syntax highlighting, and one-click sharing. Think CodePen but for generative art and p5.js sketches.',
    tech_stack: ['Next.js', 'Monaco Editor', 'p5.js', 'Vercel KV'],
    github_url: 'https://github.com/baopham/canvas-studio',
    live_url: 'https://canvas-studio.vercel.app',
    featured: true,
    color: '#7C3AED',
    sort_order: 1,
    year: 2024,
  },
  {
    id: 2,
    title: 'Pixel Weather',
    description:
      'A weather app with a twist — data is visualized as pixel art scenes that change based on actual weather conditions. Sunny? A pixelated sun rises. Rainy? Little pixel raindrops fall.',
    tech_stack: ['React', 'TailwindCSS', 'OpenWeather API', 'Canvas API'],
    github_url: 'https://github.com/baopham/pixel-weather',
    live_url: 'https://pixel-weather.vercel.app',
    featured: true,
    color: '#0891B2',
    sort_order: 2,
    year: 2024,
  },
  {
    id: 3,
    title: 'Type Craft',
    description:
      'An interactive typography playground for designers. Mix fonts, adjust optical sizing, explore variable font axes, and export CSS variables. No account needed.',
    tech_stack: ['SvelteKit', 'FontFace API', 'CSS Houdini'],
    github_url: 'https://github.com/baopham/type-craft',
    live_url: 'https://type-craft.dev',
    featured: true,
    color: '#D97706',
    sort_order: 3,
    year: 2023,
  },
  {
    id: 4,
    title: 'Haiku CLI',
    description:
      'A terminal tool that generates a haiku about your latest git commit using AI. Because your code deserves poetry.',
    tech_stack: ['Node.js', 'Claude API', 'Commander.js'],
    github_url: 'https://github.com/baopham/haiku-cli',
    featured: false,
    color: '#059669',
    sort_order: 4,
    year: 2023,
  },
  {
    id: 5,
    title: 'Motion Tokens',
    description:
      'Design token system for animation timing, easing, and duration. Export to CSS custom properties, JS, or Figma tokens. Includes a visual preview playground.',
    tech_stack: ['React', 'Framer Motion', 'Style Dictionary'],
    github_url: 'https://github.com/baopham/motion-tokens',
    live_url: 'https://motion-tokens.vercel.app',
    featured: false,
    color: '#E11D48',
    sort_order: 5,
    year: 2023,
  },
  {
    id: 6,
    title: 'Retro Grid',
    description:
      'A customizable retrowave grid generator. Adjust perspective, colors, speed, and density. Export as video, GIF, or CSS animation.',
    tech_stack: ['Three.js', 'GSAP', 'HTML Canvas'],
    github_url: 'https://github.com/baopham/retro-grid',
    live_url: 'https://retro-grid.vercel.app',
    featured: false,
    color: '#9333EA',
    sort_order: 6,
    year: 2022,
  },
]

export const seedSkills: Skill[] = [
  // Frontend
  { id: 1, name: 'React', category: 'Frontend', proficiency: 97, sort_order: 1 },
  { id: 2, name: 'Next.js', category: 'Frontend', proficiency: 95, sort_order: 2 },
  { id: 3, name: 'TypeScript', category: 'Frontend', proficiency: 92, sort_order: 3 },
  { id: 4, name: 'TailwindCSS', category: 'Frontend', proficiency: 96, sort_order: 4 },
  { id: 5, name: 'Framer Motion', category: 'Frontend', proficiency: 88, sort_order: 5 },
  { id: 6, name: 'Three.js', category: 'Frontend', proficiency: 75, sort_order: 6 },
  { id: 7, name: 'WebGL', category: 'Frontend', proficiency: 70, sort_order: 7 },
  { id: 8, name: 'CSS / SCSS', category: 'Frontend', proficiency: 98, sort_order: 8 },

  // Backend
  { id: 9, name: 'Node.js', category: 'Backend', proficiency: 85, sort_order: 1 },
  { id: 10, name: 'GraphQL', category: 'Backend', proficiency: 80, sort_order: 2 },
  { id: 11, name: 'PostgreSQL', category: 'Backend', proficiency: 75, sort_order: 3 },
  { id: 12, name: 'Redis', category: 'Backend', proficiency: 72, sort_order: 4 },
  { id: 13, name: 'tRPC', category: 'Backend', proficiency: 78, sort_order: 5 },

  // Languages
  { id: 14, name: 'JavaScript', category: 'Languages', proficiency: 98, sort_order: 1 },
  { id: 15, name: 'Python', category: 'Languages', proficiency: 72, sort_order: 2 },
  { id: 16, name: 'Rust', category: 'Languages', proficiency: 55, sort_order: 3 },
  { id: 17, name: 'Go', category: 'Languages', proficiency: 60, sort_order: 4 },

  // Tools
  { id: 18, name: 'Figma', category: 'Tools', proficiency: 90, sort_order: 1 },
  { id: 19, name: 'Git', category: 'Tools', proficiency: 95, sort_order: 2 },
  { id: 20, name: 'Vitest', category: 'Tools', proficiency: 85, sort_order: 3 },
  { id: 21, name: 'Docker', category: 'Tools', proficiency: 75, sort_order: 4 },
  { id: 22, name: 'Turborepo', category: 'Tools', proficiency: 82, sort_order: 5 },
]
