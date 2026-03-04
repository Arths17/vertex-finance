import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Terminal from './pages/Terminal';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';

function App() {
  return (
    <Router>
      <div className="bg-vertex-bg text-white min-h-screen font-mono">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
