// Dashboard Page with ReactBits-style animations
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS, QUIZ_DATA } from '../data/quizData';
import {
    FadeUp,
    StaggerContainer,
    StaggerItem,
    TiltCard,
    CountUp,
    BlurText,
    GradientText,
    MagneticButton,
    FloatingElement,
    RippleButton
} from '../components/AnimatedComponents';
import { BookOpen, Brain, Target, Flame, ArrowRight, Play, Layers } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    // Calculate days left - Exam on Jan 20, 2025
    const examDate = new Date('2025-01-20');
    const today = new Date();
    const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

    // Stats
    const totalQuestions = Object.values(QUIZ_DATA).reduce((sum, arr) => sum + arr.length, 0);

    const stats = [
        { icon: BookOpen, value: 60, label: 'Topics' },
        { icon: Brain, value: totalQuestions, label: 'Quiz Questions' },
        { icon: Target, value: 0, label: 'Completed' },
        { icon: Flame, value: daysLeft, label: 'Days Left' },
    ];

    return (
        <div className="dashboard">
            {/* Hero Section */}
            <FadeUp>
                <header className="page-header">
                    <div>
                        <h1 className="hero-title">
                            <BlurText delay={0}>Welcome</BlurText>
                        </h1>
                        <p className="subtitle">
                            <GradientText>Let's continue your S2 preparation journey</GradientText>
                        </p>
                    </div>
                    <FloatingElement amplitude={5} duration={4}>
                        <div className="days-counter">
                            <span className="days-number">
                                <CountUp end={daysLeft} duration={1.5} />
                            </span>
                            <span className="days-label">days left</span>
                        </div>
                    </FloatingElement>
                </header>
            </FadeUp>

            {/* Stats Section with Tilt Cards */}
            <StaggerContainer className="stats-grid" staggerDelay={0.1}>
                {stats.map((stat, index) => (
                    <StaggerItem key={index}>
                        <TiltCard className="stat-card">
                            <stat.icon size={36} className="stat-icon" />
                            <div className="stat-info">
                                <span className="stat-value">
                                    <CountUp end={stat.value} duration={1.5} />
                                </span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </TiltCard>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {/* Subject Progress */}
            <FadeUp delay={0.3}>
                <section className="progress-section">
                    <div className="section-header">
                        <h2>Subject Progress</h2>
                        <span className="overall-progress">0% Complete</span>
                    </div>
                    <div className="progress-grid">
                        {Object.values(SUBJECTS).map((subject, index) => (
                            <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <TiltCard
                                    className="progress-card"
                                    onClick={() => navigate(`/subject/${subject.id}`)}
                                >
                                    <div className="progress-header">
                                        <span className="subject-name">{subject.name}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <motion.div
                                            className="progress-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: '0%' }}
                                            transition={{ delay: 0.8, duration: 1 }}
                                        />
                                    </div>
                                    <div className="progress-stats">
                                        <span>0/{subject.topics.length} weeks</span>
                                        <span className="progress-percent">0%</span>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </FadeUp>

            {/* Quick Actions with Magnetic Buttons */}
            <FadeUp delay={0.5}>
                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-grid">
                        <RippleButton className="action-card" onClick={() => navigate('/quiz')}>
                            <Play size={28} className="action-icon" />
                            <span>Start Quiz</span>
                            <ArrowRight size={18} />
                        </RippleButton>
                        <RippleButton className="action-card" onClick={() => navigate('/flashcards')}>
                            <Layers size={28} className="action-icon" />
                            <span>Flashcards</span>
                            <ArrowRight size={18} />
                        </RippleButton>
                        <RippleButton className="action-card" onClick={() => navigate('/revision')}>
                            <BookOpen size={28} className="action-icon" />
                            <span>Quick Revision</span>
                            <ArrowRight size={18} />
                        </RippleButton>
                    </div>
                </section>
            </FadeUp>
        </div>
    );
};

export default Dashboard;
