// Sidebar Component with Mobile Hamburger Menu
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, BookOpen, Brain, Code, BarChart3, Globe,
    FileQuestion, Layers, Calendar, BookMarked, Moon, Sun, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [isDark, setIsDark] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

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

    const handleNavClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Header Bar */}
            <div className="mobile-header">
                <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <span className="mobile-title">Exam Panic Mode</span>
            </div>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={`sidebar ${isOpen ? 'open' : ''}`}
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="sidebar-header">
                    <div className="logo">
                        <span className="logo-text">Exam Panic Mode</span>
                    </div>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </button>
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
                                onClick={handleNavClick}
                            >
                                <item.icon className="nav-icon" size={18} />
                                <span className="nav-text">{item.label}</span>
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
        </>
    );
};

export default Sidebar;
