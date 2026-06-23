import React, { useState } from "react";

const App = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!word.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
    

         const response = await fetch(`http://127.0.0.1:8000/api/dictionary/${encodeURIComponent(word.trim())}`);
    

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Word not found in the dictionary");
        }
        throw new Error("Khangdaba error (Unknown server error)");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface">
      
      {/* Safe Embedded CSS Layout System */}
      <style>{`
        :root {
          --primary: #0d631b;
          --primary-container: #2e7d32;
          --primary-fixed: #a3f69c;
          --on-primary: #ffffff;
          --on-primary-fixed: #002204;
          --secondary-container: rgba(42, 107, 44, 0.15);
          --on-secondary-container: #307231;
          --surface: #f9f9f9;
          --surface-container-low: #f3f3f3;
          --surface-container-lowest: #ffffff;
          --on-surface: #1a1c1c;
          --on-surface-variant: #40493d;
          --outline-variant: #bfcaba;
          --error: #ba1a1a;
          --font-body: 'Inter', sans-serif;
          --font-display: 'Source Serif 4', serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-body); background-color: #f5f5f5; color: var(--on-surface); min-height: 100vh; display: flex; flex-direction: column; line-height: 1.5; }
        button, input { font-family: inherit; font-size: inherit; border: none; outline: none; }
        
        .top-app-bar { position: fixed; top: 0; left: 0; width: 100%; height: 64px; background-color: var(--primary); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); z-index: 50; }
        .brand-group { display: flex; align-items: center; gap: 12px; }
        .brand-icon { color: var(--on-primary); }
        .brand-title { font-family: var(--font-display); font-size: 32px; line-height: 40px; font-weight: 700; color: var(--on-primary); letter-spacing: -0.01em; }
        .search-action-btn { background: transparent; color: rgba(255, 255, 255, 0.7); padding: 4px 12px; border-radius: 8px; display: flex; align-items: center; gap: 4px; cursor: pointer; }
        .search-btn-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .main-canvas { flex: 1; margin-top: 64px; padding: 32px 20px 96px 20px; width: 100%; max-width: 576px; margin-left: auto; margin-right: auto; }
        .search-box-container { margin-bottom: 40px; }
        .search-bar-wrapper { display: flex; background-color: var(--surface-container-lowest); border-radius: 12px; border: 1px solid rgba(191, 202, 186, 0.3); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); overflow: hidden; height: 56px; }
        .search-icon-prefix { display: flex; align-items: center; padding-left: 16px; color: var(--primary); }
        .search-input { flex: 1; background: transparent; padding: 0 16px; color: var(--on-surface); font-size: 16px; }
        .search-submit-btn { background-color: var(--primary); color: var(--on-primary); font-weight: 700; padding: 0 24px; height: 100%; cursor: pointer; }
        
        .word-header-row { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 16px; }
        .word-heading { font-family: var(--font-display); font-size: 40px; line-height: 48px; letter-spacing: -0.02em; color: var(--on-surface); text-transform: capitalize; }
        .word-pos { font-style: italic; color: rgba(64, 73, 61, 0.8); margin-top: -4px; font-size: 16px; }
        
        .card { background-color: var(--surface-container-lowest); border-radius: 12px; padding: 24px; border: 1px solid rgba(191, 202, 186, 0.1); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); margin-bottom: 24px; }
        .meaning-item { display: flex; align-items: flex-start; gap: 16px; }
        .meaning-badge { margin-top: 4px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background-color: var(--primary-fixed); color: var(--on-primary-fixed); font-size: 10px; font-weight: 700; border-radius: 50%; }
        .meaning-content { flex: 1; }
        .manipuri-script { font-family: var(--font-display); font-size: 28px; line-height: 36px; font-weight: 600; color: var(--primary); margin-bottom: 4px; }
        
        .bottom-nav { position: fixed; bottom: 0; left: 0; width: 100%; height: 64px; background-color: var(--surface); display: flex; justify-content: space-around; align-items: center; border-top: 1px solid var(--outline-variant); box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05); z-index: 50; }
        .nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--on-surface-variant); text-decoration: none; padding: 4px 16px; border-radius: 9999px; }
        .nav-item.active { background-color: var(--primary-fixed); color: var(--on-primary-fixed); font-weight: bold; }
        .nav-label { font-size: 10px; text-transform: uppercase; font-weight: 600; margin-top: 2px; }
      `}</style>
      
      {/* TopAppBar Component */}
      <header className="top-app-bar">
        <div className="brand-group">
          <span className="material-symbols-outlined brand-icon">menu_book</span>
          <h1 className="brand-title">NEW</h1>
        </div>
        
      </header>

      {/* Main Content Workspace Layout */}
      <main className="main-canvas">
        
        {/* Search Query Block */}
        <section className="search-box-container">
          <form onSubmit={handleSearch} className="search-bar-wrapper">
            <div className="search-icon-prefix">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="search-input"
              type="text"
              placeholder="Search English or Manipuri..."
              value={word}
              onChange={(e) => setWord(e.target.value)}
              autoFocus
            />
            <button className="search-submit-btn" type="submit" disabled={loading}>
              {loading ? "..." : "Search"}
            </button>
          </form>
        </section>

        {/* Error Boundary Feedback Display */}
        {error && (
          <div className="card" style={{ borderLeft: "4px solid var(--error)", color: "var(--error)" }}>
            <p className="font-body-md font-bold">{error}</p>
          </div>
        )}

        {/* Simplified Data Presentation Block for Flat CSV Structure */}
        {result && (
          <section>
            {/* Word Metadata Header Block */}
            <div className="word-header-row">
              <div>
                <h2 className="word-heading">{result.word || word}</h2>
                <p className="word-pos">noun</p>
              </div>
            </div>

            {/* Core Definition Content Container */}
            <div className="card">
              <div className="meaning-item">
                <div className="meaning-badge">1</div>
                <div className="meaning-content">
                  <h3 className="manipuri-script">{result.meaning}</h3>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Ground Level Navigation Bar Structure */}
      <nav className="bottom-nav">
        <a className="nav-item active" href="#dictionary">
          <span className="material-symbols-outlined">search</span>
          <span className="nav-label">Dictionary</span>
        </a>
        <a className="nav-item" href="#bookmarks">
          <span className="material-symbols-outlined">bookmark</span>
          <span className="nav-label">Bookmarks</span>
        </a>
        <a className="nav-item" href="#history">
          <span className="material-symbols-outlined">history</span>
          <span className="nav-label">History</span>
        </a>
        <a className="nav-item" href="#settings">
          <span className="material-symbols-outlined">settings</span>
          <span className="nav-label">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default App;