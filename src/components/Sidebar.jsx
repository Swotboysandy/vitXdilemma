// Sidebar Component
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home, BookOpen, Brain, Code, BarChart3, Globe,
    FileQuestion, Layers, Calendar, BookMarked, Moon, Sun
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [isDark, setIsDark] = useState(true);

    const navItems = [
        { to: '/', icon: Home, label: 'Dashboard' },
        { divider: true, label: 'Subjects' },
        { to: '/subject/java', icon: Code, label: 'Java' },
        { to: '/subject/ai', icon: Brain, label: 'AI' },
        { to: '/subject/se', icon: BookOpen, label: 'Software Eng' },
        { to: '/subject/stats', icon: BarChart3, label: 'Statistics' },
        { to: '/subject/networks', icon: Globe, label: 'Networks' },
        { divider: true, label: 'Tools' },
        { to: '/quiz', icon: FileQuestion, label: 'Practice Quiz' },
        { to: '/flashcards', icon: Layers, label: 'Flashcards' },
        { to: '/planner', icon: Calendar, label: 'Study Planner' },
        { to: '/revision', icon: BookMarked, label: 'Quick Revision' },
    ];

    return (
        <motion.aside
            className="sidebar"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-text">Exam Panic Mode</span>
                </div>
            </div>

            <div className="user-info">
                <div className="avatar">😰</div>
                <div className="user-details">
                    <span className="user-name">Last Minute Hero</span>
                    <span className="user-id">Professional Procrastinator</span>
                </div>
            </div>

            <nav className="nav-menu">
                {navItems.map((item, index) => (
                    item.divider ? (
                        <div key={index} className="nav-divider">{item.label}</div>
                    ) : (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon className="nav-icon" size={18} />
                            <span className="nav-text">{item.label}</span>
                            {item.badge && <span className="nav-badge">{item.badge}</span>}
                        </NavLink>
                    )
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="theme-toggle">
                    <Sun size={16} />
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isDark}
                            onChange={() => setIsDark(!isDark)}
                        />
                        <span className="slider"></span>
                    </label>
                    <Moon size={16} />
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
