export default function Navbar({ query, setQuery, activeTag, setActiveTag, allTags, darkMode, toggleTheme }) {
  return (
    <div className="sticky-header">
      <div className="header-row">
        <a href="https://gopikrishee.in" className="logo-container" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#fff", fontFamily: "'Geist',sans-serif" }}>G</div>
          <span style={{ fontSize: 18, fontWeight: 800, marginLeft: 8 }}>Blog Archive</span>
        </a>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div style={{ position: "relative", marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="tag-list">
        <button
          onClick={() => setActiveTag(null)}
          className={`tag-button ${!activeTag ? "all-active" : ""}`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`tag-button ${activeTag === tag ? "active" : ""}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
