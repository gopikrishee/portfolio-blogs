function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export default function BlogDetail({ blog, onBack }) {
  function renderBlock(block, i) {
    switch (block.type) {
      case "text":
        return (
          <p key={i} style={{
            fontSize: 16, lineHeight: 1.75,
            color: "var(--text-primary)",
            margin: "0 0 20px",
          }}>
            {block.value}
          </p>
        );
      case "image":
        return (
          <figure key={i} style={{ margin: "24px 0", padding: 0 }}>
            <img
              src={block.src}
              alt={block.alt}
              style={{
                width: "100%", borderRadius: 16,
                display: "block",
                objectFit: "cover",
                maxHeight: 360,
              }}
            />
          </figure>
        );
      case "code":
        return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.lang && (
              <div style={{
                background: "#1a1f2e",
                borderRadius: "12px 12px 0 0",
                padding: "8px 16px",
                display: "flex", alignItems: "center", gap: 8
              }}>
                <span style={{
                  fontSize: 11,
                  color: "#8b96b0", letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}>{block.lang}</span>
                <div style={{ display: "flex", gap: 5, marginLeft: "auto" }}>
                  {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                </div>
              </div>
            )}
            <pre style={{
              background: "#0d1117",
              borderRadius: block.lang ? "0 0 12px 12px" : 12,
              padding: "16px 20px",
              margin: 0,
              overflowX: "auto",
              fontSize: 13.5,
              lineHeight: 1.7,
              color: "#c9d1d9",
            }}>
              <code>{block.value}</code>
            </pre>
          </div>
        );
      case "blockquote":
        return (
          <blockquote key={i} style={{
            margin: "24px 0",
            padding: "12px 20px",
            borderLeft: "4px solid var(--accent)",
            background: "var(--blockquote-bg)",
            borderRadius: "0 10px 10px 0",
          }}>
            <p style={{
              margin: 0,
              fontSize: 16.5,
              fontStyle: "italic",
              color: "var(--blockquote-text)",
              lineHeight: 1.65,
            }}>
              "{block.value}"
            </p>
          </blockquote>
        );
      default:
        return null;
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "none", border: "none",
          color: "var(--accent)",
          fontSize: 14, fontWeight: 600,
          cursor: "pointer", padding: "16px 16px",
          letterSpacing: "0.2px",
        }}
      >
        ← Back
      </button>

      <div style={{
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        padding: "20px 16px 0",
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: blog.avatarColor,
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 15,
            flexShrink: 0,
          }}>
            {blog.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
              {blog.author}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              {blog.handle}
            </div>
          </div>
          <div style={{
            marginLeft: "auto",
            display: "flex", alignItems: "center", gap: 6,
            color: "var(--text-secondary)",
            fontSize: 13,
          }}>
            <span>{blog.date}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>
        </div>

        <h1 style={{
          margin: "0 0 10px",
          fontSize: 24,
          fontWeight: 800,
          color: "var(--text-primary)",
          lineHeight: 1.3,
        }}>
          {blog.title}
        </h1>

        <p style={{
          margin: "0 0 16px",
          fontSize: 16,
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}>
          {blog.summary}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {blog.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 12.5, padding: "4px 12px",
              borderRadius: 999, background: "var(--tag-bg)",
              color: "var(--tag-text)", fontWeight: 500,
            }}>{tag}</span>
          ))}
        </div>

        <div style={{
          display: "flex", gap: "28px",
          borderTop: "1px solid var(--border-color)",
          padding: "12px 0",
          marginBottom: 20,
        }}>
          {[
            { icon: "💬", val: blog.comments, label: "Comments" },
            { icon: "🔁", val: blog.reposts, label: "Reposts" },
            { icon: "♥", val: blog.likes, label: "Likes" },
          ].map(({ icon, val, label }) => (
            <span key={label} style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 14, color: "var(--text-secondary)",
            }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>{formatNumber(val)}</strong>
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 16px 48px" }}>
        {blog.content.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
}
