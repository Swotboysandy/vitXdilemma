// GitHub Star Banner Component
import { motion } from 'framer-motion';
import { Star, Github, Heart } from 'lucide-react';
import './GitHubBanner.css';

const GitHubBanner = () => {
    return (
        <motion.a
            href="https://github.com/Swotboysandy/vitXdilemma"
            target="_blank"
            rel="noopener noreferrer"
            className="github-banner"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="banner-content">
                <motion.div
                    className="star-icon"
                    animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                >
                    <Star size={20} fill="#ffffff" />
                </motion.div>
                <span className="banner-text">
                    <strong>Like this?</strong> Star the repo on GitHub
                </span>
                <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Github size={18} />
                </motion.div>
            </div>
            <motion.div
                className="sparkle sparkle-1"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div
                className="sparkle sparkle-2"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
                className="sparkle sparkle-3"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
        </motion.a>
    );
};

export default GitHubBanner;
