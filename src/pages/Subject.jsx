// Subject Page
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SUBJECTS } from '../data/quizData';
import { FadeUp, StaggerContainer, StaggerItem, GlowCard } from '../components/AnimatedComponents';
import { BookOpen, Play, CheckCircle } from 'lucide-react';
import './Subject.css';

const Subject = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const subject = SUBJECTS[subjectId];

    if (!subject) {
        return <div className="subject-page"><h1>Subject not found</h1></div>;
    }

    return (
        <div className="subject-page">
            <FadeUp>
                <header className="page-header">
                    <div>
                        <h1>{subject.name}</h1>
                        <p className="subtitle">{subject.code} • 12 Weekly Topics</p>
                    </div>
                </header>
            </FadeUp>

            <StaggerContainer className="topics-grid" staggerDelay={0.05}>
                {subject.topics.map((topic) => (
                    <StaggerItem key={topic.week}>
                        <GlowCard className="topic-card">
                            <div className="topic-header">
                                <span className="topic-week">Week {topic.week}</span>
                                <span className="topic-status"><BookOpen size={18} /></span>
                            </div>
                            <h3 className="topic-title">{topic.title}</h3>
                            <p className="topic-description">{topic.description}</p>
                            <div className="topic-actions">
                                <motion.button
                                    className="topic-btn study"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <BookOpen size={16} /> Study
                                </motion.button>
                                <motion.button
                                    className="topic-btn quiz"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/quiz')}
                                >
                                    <Play size={16} /> Quiz
                                </motion.button>
                            </div>
                        </GlowCard>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </div>
    );
};

export default Subject;
