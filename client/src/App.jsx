import "./App.css"; // Component layout & card styling

function App() {
  return (
    <div className="card">
      <div className="status-badge">
        <span className="status-dot"></span>
        <span>Frontend Ready</span>
      </div>
      <p>Connect your API endpoints to get started.</p>
      <span className="author">blackOmni</span>
    </div>
  );
}

export default App;
