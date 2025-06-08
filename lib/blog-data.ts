// Remove "use client" directive to make this work on both server and client
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  tags: string[]
  category: string
  featured: boolean
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "getting-started-with-nextjs",
    title: "Getting Started with Next.js: A Complete Guide",
    excerpt:
      "Learn how to build modern web applications with Next.js, from setup to deployment. This comprehensive guide covers everything you need to know.",
    content: `
# Getting Started with Next.js: A Complete Guide

Next.js has revolutionized the way we build React applications. As a full-stack framework, it provides everything you need to build production-ready applications.

## What is Next.js?

Next.js is a React framework that gives you building blocks to create web applications. By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

## Key Features

### 1. Server-Side Rendering (SSR)
Next.js can pre-render pages on the server, which improves performance and SEO.

\`\`\`javascript
// pages/index.js
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()

  return {
    props: {
      posts,
    },
  }
}
\`\`\`

### 2. Static Site Generation (SSG)
Generate static HTML at build time for even better performance.

\`\`\`javascript
export async function getStaticProps() {
  const posts = await getPosts()
  
  return {
    props: {
      posts,
    },
    revalidate: 60, // Regenerate page every 60 seconds
  }
}
\`\`\`

### 3. API Routes
Build your backend API right within your Next.js application.

\`\`\`javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API!' })
}
\`\`\`

## Getting Started

1. **Installation**
   \`\`\`bash
   npx create-next-app@latest my-app
   cd my-app
   npm run dev
   \`\`\`

2. **Project Structure**
   - \`pages/\` - File-based routing
   - \`public/\` - Static assets
   - \`styles/\` - CSS files
   - \`components/\` - Reusable components

## Best Practices

- Use TypeScript for better development experience
- Implement proper SEO with next/head
- Optimize images with next/image
- Use dynamic imports for code splitting

## Conclusion

Next.js is an excellent choice for modern web development. Its combination of performance, developer experience, and built-in optimizations make it perfect for both small projects and large-scale applications.

Start building with Next.js today and experience the difference!
    `,
    author: "Delta",
    date: "2024-01-06",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development", "JavaScript"],
    category: "Tutorial",
    featured: true,
    image: "/images/nextjs-blog.jpg",
  },
  {
    id: "discord-bot-development",
    title: "Building Discord Bots with Discord.js",
    excerpt:
      "A comprehensive guide to creating powerful Discord bots using Discord.js. Learn from basic commands to advanced features.",
    content: `
# Building Discord Bots with Discord.js

Discord bots have become an essential part of many Discord servers, providing automation, moderation, and entertainment features.

## Setting Up Your Environment

First, let's set up a new Discord bot project:

\`\`\`bash
mkdir my-discord-bot
cd my-discord-bot
npm init -y
npm install discord.js
\`\`\`

## Creating Your First Bot

\`\`\`javascript
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(\`Logged in as \${client.user.tag}!\`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

client.login('YOUR_BOT_TOKEN');
\`\`\`

## Advanced Features

### Slash Commands
Modern Discord bots use slash commands for better user experience:

\`\`\`javascript
const { SlashCommandBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

// In your interaction handler
if (interaction.commandName === 'ping') {
  await interaction.reply('Pong!');
}
\`\`\`

### Embeds
Create rich, formatted messages:

\`\`\`javascript
const { EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder()
  .setTitle('Welcome!')
  .setDescription('Thanks for joining our server!')
  .setColor(0x00AE86)
  .setTimestamp();

channel.send({ embeds: [embed] });
\`\`\`

## Best Practices

1. **Error Handling**: Always wrap your code in try-catch blocks
2. **Rate Limiting**: Respect Discord's API rate limits
3. **Permissions**: Check user permissions before executing commands
4. **Database**: Use a database for persistent data storage

## Deployment

Deploy your bot to a cloud service like Heroku, Railway, or DigitalOcean for 24/7 uptime.

Happy bot building! 🤖
    `,
    author: "Delta",
    date: "2024-01-05",
    readTime: "12 min read",
    tags: ["Discord.js", "Bot Development", "JavaScript", "API"],
    category: "Tutorial",
    featured: true,
    image: "/images/discord-bot-blog.jpg",
  },
  {
    id: "css-grid-vs-flexbox",
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt:
      "Understanding the differences between CSS Grid and Flexbox, and knowing when to use each layout method for optimal results.",
    content: `
# CSS Grid vs Flexbox: When to Use Which

Both CSS Grid and Flexbox are powerful layout systems, but they serve different purposes and excel in different scenarios.

## Flexbox: One-Dimensional Layouts

Flexbox is designed for one-dimensional layouts - either a row or a column.

### When to Use Flexbox:
- Navigation bars
- Card layouts
- Centering content
- Distributing space between items

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.flex-item {
  flex: 1;
}
\`\`\`

## CSS Grid: Two-Dimensional Layouts

CSS Grid excels at two-dimensional layouts where you need to control both rows and columns.

### When to Use CSS Grid:
- Page layouts
- Complex card grids
- Magazine-style layouts
- Any layout requiring precise positioning

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
}

.grid-item {
  grid-column: span 2;
}
\`\`\`

## Combining Both

Often, the best approach is to use both together:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Key Differences

| Feature | Flexbox | CSS Grid |
|---------|---------|----------|
| Dimension | 1D | 2D |
| Content | Content-first | Layout-first |
| Browser Support | Excellent | Good |
| Learning Curve | Easier | Steeper |

## Conclusion

Choose Flexbox for component-level layouts and CSS Grid for page-level layouts. They complement each other perfectly!
    `,
    author: "Delta",
    date: "2024-01-04",
    readTime: "6 min read",
    tags: ["CSS", "Flexbox", "Grid", "Layout", "Web Design"],
    category: "Design",
    featured: false,
    image: "/images/css-layout-blog.jpg",
  },
  {
    id: "typescript-tips-tricks",
    title: "TypeScript Tips and Tricks for Better Code",
    excerpt:
      "Discover advanced TypeScript techniques that will make your code more robust, maintainable, and developer-friendly.",
    content: `
# TypeScript Tips and Tricks for Better Code

TypeScript has become the go-to choice for JavaScript developers who want type safety and better tooling. Here are some advanced tips to level up your TypeScript game.

## 1. Utility Types

TypeScript provides several utility types that can save you time:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Pick only specific properties
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Omit sensitive properties
type SafeUser = Omit<User, 'password'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;
\`\`\`

## 2. Conditional Types

Create types that depend on conditions:

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type DataResponse = ApiResponse<User[]>; // { data: User[] }
\`\`\`

## 3. Template Literal Types

Build types from string patterns:

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`;
type ClickEvent = \`onClick\${string}\`; // "onClickButton", "onClickSubmit", etc.

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = \`/api/\${string}\`;
type ApiCall = \`\${HttpMethod} \${Endpoint}\`;
\`\`\`

## 4. Mapped Types

Transform existing types:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
\`\`\`

## 5. Type Guards

Create runtime type checking:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isUser(obj: any): obj is User {
  return obj && 
         typeof obj.id === 'string' &&
         typeof obj.name === 'string' &&
         typeof obj.email === 'string';
}

// Usage
if (isUser(data)) {
  // TypeScript knows data is User type here
  console.log(data.name);
}
\`\`\`

## 6. Const Assertions

Preserve literal types:

\`\`\`typescript
const colors = ['red', 'green', 'blue'] as const;
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;
\`\`\`

## 7. Generic Constraints

Limit generic types:

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // ✅ string has length
logLength([1, 2, 3]); // ✅ array has length
logLength(123); // ❌ number doesn't have length
\`\`\`

## Best Practices

1. **Use strict mode** in tsconfig.json
2. **Prefer interfaces over types** for object shapes
3. **Use enums sparingly** - consider union types instead
4. **Enable noImplicitAny** to catch type issues early
5. **Use type assertions carefully** - prefer type guards

These tips will help you write more robust and maintainable TypeScript code. Happy coding! 🚀
    `,
    author: "Delta",
    date: "2024-01-03",
    readTime: "10 min read",
    tags: ["TypeScript", "JavaScript", "Programming", "Tips"],
    category: "Programming",
    featured: false,
    image: "/images/typescript-blog.jpg",
  },
  {
    id: "web-performance-optimization",
    title: "Web Performance Optimization: A Developer's Guide",
    excerpt:
      "Learn essential techniques to optimize your website's performance, from image optimization to code splitting and caching strategies.",
    content: `
# Web Performance Optimization: A Developer's Guide

Website performance directly impacts user experience, SEO rankings, and conversion rates. Here's how to optimize your web applications for speed.

## Core Web Vitals

Google's Core Web Vitals are essential metrics for web performance:

### 1. Largest Contentful Paint (LCP)
Measures loading performance. Should occur within 2.5 seconds.

\`\`\`javascript
// Optimize LCP with image preloading
<link rel="preload" as="image" href="/hero-image.jpg">

// Use next/image for automatic optimization
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority
/>
\`\`\`

### 2. First Input Delay (FID)
Measures interactivity. Should be less than 100 milliseconds.

\`\`\`javascript
// Use code splitting to reduce bundle size
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Optimize event handlers
const handleClick = useCallback((event) => {
  // Handle click
}, []);
\`\`\`

### 3. Cumulative Layout Shift (CLS)
Measures visual stability. Should be less than 0.1.

\`\`\`css
/* Reserve space for images */
.image-container {
  aspect-ratio: 16 / 9;
}

/* Use transform instead of changing layout properties */
.animated-element {
  transform: translateX(100px);
  /* Instead of: left: 100px; */
}
\`\`\`

## Image Optimization

Images often account for the majority of page weight:

\`\`\`html
<!-- Use modern formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.avif" type="image/avif">
  <img src="image.jpg" alt="Description">
</picture>

<!-- Implement lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">
\`\`\`

## Code Splitting

Split your JavaScript bundles for faster initial loads:

\`\`\`javascript
// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// Component-based splitting
const Modal = lazy(() => import('./components/Modal'));

// Dynamic imports
async function loadChart() {
  const { Chart } = await import('./Chart');
  return Chart;
}
\`\`\`

## Caching Strategies

Implement effective caching for better performance:

\`\`\`javascript
// Service Worker caching
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});

// HTTP caching headers
app.use('/static', express.static('public', {
  maxAge: '1y',
  etag: false
}));
\`\`\`

## CSS Optimization

Optimize your CSS for better performance:

\`\`\`css
/* Use CSS containment */
.card {
  contain: layout style paint;
}

/* Optimize animations */
.smooth-animation {
  will-change: transform;
  transform: translateZ(0); /* Create new layer */
}

/* Critical CSS inlining */
<style>
  /* Inline critical above-the-fold CSS */
  .header { /* styles */ }
  .hero { /* styles */ }
</style>
\`\`\`

## JavaScript Optimization

\`\`\`javascript
// Use Web Workers for heavy computations
const worker = new Worker('heavy-computation.js');
worker.postMessage(data);
worker.onmessage = (event) => {
  console.log('Result:', event.data);
};

// Debounce expensive operations
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);

// Use requestIdleCallback for non-critical tasks
requestIdleCallback(() => {
  // Perform non-critical work
  analytics.track('page_view');
});
\`\`\`

## Performance Monitoring

Track your performance improvements:

\`\`\`javascript
// Performance Observer API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime);
    }
  }
});

observer.observe({ entryTypes: ['largest-contentful-paint'] });

// User Timing API
performance.mark('feature-start');
// ... feature code ...
performance.mark('feature-end');
performance.measure('feature-duration', 'feature-start', 'feature-end');
\`\`\`

## Tools for Performance Testing

- **Lighthouse**: Automated auditing
- **WebPageTest**: Detailed performance analysis
- **Chrome DevTools**: Real-time performance monitoring
- **GTmetrix**: Performance scoring and recommendations

## Conclusion

Web performance optimization is an ongoing process. Start with measuring your current performance, identify bottlenecks, and implement optimizations incrementally. Remember: every millisecond counts!

Keep optimizing! ⚡
    `,
    author: "Delta",
    date: "2024-01-02",
    readTime: "15 min read",
    tags: ["Performance", "Web Development", "Optimization", "Core Web Vitals"],
    category: "Performance",
    featured: true,
    image: "/images/performance-blog.jpg",
  },
]

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category)
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))]
}

export function getAllTags(): string[] {
  return [...new Set(blogPosts.flatMap((post) => post.tags))]
}
