import { useState, useMemo } from "react";
import BlogCard from "./pages/home/BlogCard";
import BlogDetail from "./pages/details/BlogDetails";
import Navbar from "./layout/Navbar";

const BLOGS = [
  {
    id: 1,
    author: "Mia Chen",
    handle: "@mia_codes",
    avatar: "MC",
    avatarColor: "#1d9e75",
    date: "Apr 28, 2025",
    readTime: "5 min read",
    title: "Understanding React Server Components",
    summary: "Server Components fundamentally change how we think about data fetching in React. Instead of waterfalls and useEffect, you fetch at the component level — on the server.",
    tags: ["React", "JavaScript", "Frontend"],
    likes: 312,
    comments: 48,
    reposts: 91,
    content: [
      { type: "text", value: "React Server Components (RSCs) are one of the most significant paradigm shifts since hooks. They let you run React components entirely on the server — with zero JavaScript shipped to the client for those components." },
      { type: "image", src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", alt: "Code on a monitor" },
      { type: "text", value: "The key insight is that most UI logic doesn't need interactivity. Reading a blog post, displaying a dashboard, rendering a product page — all of this can be done on the server. RSCs let you be intentional about what's interactive." },
      { type: "blockquote", value: "The best JavaScript is no JavaScript. Server Components let you opt into the client only where you need it." },
      { type: "text", value: "Here's how you'd fetch data in a Server Component:" },
      { type: "code", lang: "jsx", value: `// app/blog/page.tsx — Server Component by default
async function BlogList() {
  const posts = await db.posts.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <ul>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </ul>
  );
}` },
      { type: "text", value: "No useEffect. No loading states for the initial fetch. No API routes just to proxy your database. The component IS the data layer." },
    ]
  },
  {
    id: 2,
    author: "Dev Rajan",
    handle: "@devrajan_io",
    avatar: "DR",
    avatarColor: "#534ab7",
    date: "Apr 24, 2025",
    readTime: "7 min read",
    title: "CSS Container Queries Are Here — And They Change Everything",
    summary: "Media queries react to the viewport. Container queries react to the parent element. This tiny difference unlocks truly portable, reusable components that adapt to their context.",
    tags: ["CSS", "Frontend", "Design"],
    likes: 544,
    comments: 72,
    reposts: 188,
    content: [
      { type: "text", value: "For years, responsive design meant viewport-based breakpoints. A card component had to know whether it was in a sidebar or a main column — and it had to know via global media queries, not local context." },
      { type: "blockquote", value: "Container queries are the missing piece of the responsive design puzzle. They make components truly composable." },
      { type: "image", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", alt: "CSS container queries illustration" },
      { type: "code", lang: "css", value: `.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}` },
      { type: "text", value: "Now the card knows its own available space. Put it in a narrow sidebar? It stacks. Put it in a wide content area? It goes horizontal. Zero changes needed to the component itself." },
    ]
  },
  {
    id: 3,
    author: "Aiko Tanaka",
    handle: "@aiko_writes",
    avatar: "AT",
    avatarColor: "#993556",
    date: "Apr 20, 2025",
    readTime: "4 min read",
    title: "The Art of Writing Commit Messages",
    summary: "Your commit history is a story. Future-you (and your teammates) will read it during a hard debugging session. Write it like you care about that reader.",
    tags: ["Git", "Productivity", "DevOps"],
    likes: 821,
    comments: 130,
    reposts: 304,
    content: [
      { type: "text", value: "Bad commit messages are a form of technical debt. They make git blame useless, bisect sessions nightmarish, and changelogs unreadable. Good commit messages are a gift to your future self." },
      { type: "blockquote", value: "A commit message should answer the question: if someone reads this six months from now, will they understand why this change was made?" },
      { type: "code", lang: "bash", value: `# Bad
git commit -m "fix bug"
git commit -m "update stuff"
git commit -m "wip"

# Good
git commit -m "fix: prevent race condition in auth token refresh

Token refresh was being triggered multiple times simultaneously
when multiple requests fired during a 401 response. Added a
pending promise cache to deduplicate in-flight refresh calls.

Fixes #482"` },
      { type: "text", value: "The format I follow: a short imperative subject line (≤72 chars), a blank line, then a body explaining the *why* — not the what (the diff shows the what)." },
      { type: "image", src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80", alt: "Terminal with git log" },
      { type: "text", value: "Adopt Conventional Commits for even better structure. Tools like semantic-release can automate versioning and changelogs from your commit history — but only if your messages are consistent." },
    ]
  },
  {
    id: 4,
    author: "Omar Farouk",
    handle: "@omar_sys",
    avatar: "OF",
    avatarColor: "#185fa5",
    date: "Apr 15, 2025",
    readTime: "9 min read",
    title: "Designing for Zero Trust: A Practical Guide",
    summary: "\"Never trust, always verify\" sounds paranoid until you've worked an incident. Zero trust isn't a product — it's a mindset that reshapes how you design every service boundary.",
    tags: ["Security", "Architecture", "DevOps"],
    likes: 677,
    comments: 89,
    reposts: 241,
    content: [
      { type: "text", value: "Traditional perimeter security assumes everything inside the network is safe. Zero trust flips this: treat every request as if it comes from the open internet, regardless of where it originates." },
      { type: "image", src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80", alt: "Security architecture diagram" },
      { type: "blockquote", value: "The perimeter is dead. Your attackers are already inside. Zero trust is how you design for that reality." },
      { type: "text", value: "The three pillars of Zero Trust in practice:" },
      { type: "code", lang: "yaml", value: `# Policy as code — every access decision is explicit
policies:
  - name: payments-service-access
    principal: order-service
    resource: payments.process
    conditions:
      - mTLS verified
      - JWT claims: role=order-processor
      - Time: business hours UTC
    effect: allow` },
      { type: "text", value: "mTLS between services. Short-lived tokens. Explicit allow-lists. Continuous verification. These aren't optional extras — they're the baseline." },
    ]
  },
  {
    id: 5,
    author: "Priya Nair",
    handle: "@priya_ux",
    avatar: "PN",
    avatarColor: "#ba7517",
    date: "Apr 10, 2025",
    readTime: "6 min read",
    title: "Motion Design Principles for UI Engineers",
    summary: "Animation isn't decoration — it's communication. When things move right, users understand your interface intuitively. When they move wrong, everything feels broken.",
    tags: ["Design", "CSS", "UX"],
    likes: 493,
    comments: 61,
    reposts: 167,
    content: [
      { type: "text", value: "The purpose of UI animation is to convey meaning — to show relationships, signal state changes, and guide attention. Every animation should earn its place by doing one of these jobs." },
      { type: "blockquote", value: "An animation that doesn't communicate something is just visual noise. And visual noise costs users cognitive load." },
      { type: "image", src: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&q=80", alt: "Motion design wireframes" },
      { type: "text", value: "The four principles I design by:" },
      { type: "code", lang: "css", value: `/* 1. Use easing that feels physical */
.card {
  transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 2. Keep durations perceptible but brief */
.fade-in {
  animation: fadeIn 180ms ease-out forwards;
}

/* 3. Choreograph — stagger related elements */
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 60ms; }
.item:nth-child(3) { animation-delay: 120ms; }

/* 4. Always respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}` },
      { type: "text", value: "That last one isn't optional. Vestibular disorders affect 35% of adults over 40. Respecting motion preferences is both ethical and legally required in many jurisdictions." },
    ]
  },
  {
    id: 6,
    author: "Luca Ferretti",
    handle: "@luca_db",
    avatar: "LF",
    avatarColor: "#3b6d11",
    date: "Apr 4, 2025",
    readTime: "8 min read",
    title: "Indexing Strategies That Actually Matter",
    summary: "Everyone knows indexes speed up queries. Fewer people understand why certain indexes get ignored, how covering indexes eliminate table scans, or when not to index at all.",
    tags: ["Database", "PostgreSQL", "Backend"],
    likes: 389,
    comments: 55,
    reposts: 143,
    content: [
      { type: "text", value: "An index is a data structure that PostgreSQL maintains alongside your table, sorted in a way that makes lookups faster. But that maintenance has a write cost — every INSERT, UPDATE, DELETE must update every relevant index." },
      { type: "blockquote", value: "Indexes are not free. Over-indexing a write-heavy table can be worse than no indexes at all." },
      { type: "code", lang: "sql", value: `-- EXPLAIN ANALYZE is your best friend
EXPLAIN ANALYZE
SELECT u.*, p.title
FROM users u
JOIN posts p ON p.user_id = u.id
WHERE u.active = true
  AND p.published_at > NOW() - INTERVAL '30 days';

-- A covering index eliminates the table heap fetch entirely
CREATE INDEX idx_posts_covering
ON posts (user_id, published_at)
INCLUDE (title, slug);` },
      { type: "image", src: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80", alt: "Database schema diagram" },
      { type: "text", value: "The INCLUDE clause in PostgreSQL 11+ is underused. It adds columns to the index leaf pages without making them part of the sort key — perfect for columns you SELECT but don't filter on." },
    ]
  },
];

const ALL_TAGS = [...new Set(BLOGS.flatMap(b => b.tags))].sort();

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.body.classList.toggle("light", !isDark);
  };

  const filtered = useMemo(() => {
    return BLOGS.filter(b => {
      const matchTag = !activeTag || b.tags.includes(activeTag);
      const q = query.toLowerCase();
      const matchQuery = !q ||
        b.title.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q));
      return matchTag && matchQuery;
    });
  }, [query, activeTag]);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {selectedBlog ? (
          <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />
        ) : (
          <>
            <Navbar
              query={query}
              setQuery={setQuery}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              allTags={ALL_TAGS}
              darkMode={darkMode}
              toggleTheme={toggleTheme}
            />

            <div>
              {filtered.length === 0 ? (
                <div className="no-posts">
                  <div className="no-posts-icon">🔍</div>
                  <p className="no-posts-text">No posts found</p>
                </div>
              ) : (
                filtered.map(blog => (
                  <BlogCard key={blog.id} blog={blog} onClick={setSelectedBlog} />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

