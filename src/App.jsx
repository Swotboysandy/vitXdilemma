// Main App Component
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import GitHubBanner from './components/GitHubBanner';
import Dashboard from './pages/Dashboard';
import Subject from './pages/Subject';
import Study from './pages/Study';
import Quiz from './pages/Quiz';
import Flashcards from './pages/Flashcards';
import Revision from './pages/Revision';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subject/:subjectId" element={<Subject />} />
            <Route path="/study/:subjectId/:weekId" element={<Study />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/planner" element={<Dashboard />} />
            <Route path="/revision" element={<Revision />} />
          </Routes>
        </AnimatePresence>
      </main>
      <GitHubBanner />
    </div>
  );
}

export default App;
