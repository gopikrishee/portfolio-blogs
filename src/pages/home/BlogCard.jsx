function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export default function BlogCard({ blog, onClick }) {
  return (
    <article
      onClick={() => onClick(blog)}
      style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-color)",
        padding: "16px",
        cursor: "pointer",
        transition: "background 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card)"}
    >
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: blog.avatarColor,
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14,
            letterSpacing: "0.5px"
          }}>
            {blog.avatar}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
              {blog.author}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              {blog.handle}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>·</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              {blog.date}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>·</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>
              {blog.readTime}
            </span>
          </div>

          <h2 style={{
            margin: "4px 0 6px",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.35,
          }}>
            {blog.title}
          </h2>

          <p style={{
            margin: "0 0 10px",
            fontSize: 14.5,
            color: "var(--text-secondary)",
            lineHeight: 1.55,
          }}>
            {blog.summary}
          </p>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: 12 }}>
            {blog.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 12,
                padding: "3px 10px",
                borderRadius: 999,
                background: "var(--tag-bg)",
                color: "var(--tag-text)",
                fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { icon: "💬", val: formatNumber(blog.comments) },
              { icon: "🔁", val: formatNumber(blog.reposts) },
              { icon: "♥", val: formatNumber(blog.likes) },
            ].map(({ icon, val }) => (
              <span key={icon} style={{
                display: "flex", alignItems: "center", gap: 5,
                color: "var(--text-secondary)", fontSize: 13,
              }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
