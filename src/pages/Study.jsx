// Study Page - View study material for each topic
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SUBJECTS } from '../data/quizData';
import { STUDY_MATERIAL } from '../data/studyMaterial';
import { FadeUp, TiltCard, BlurText } from '../components/AnimatedComponents';
import { ChevronLeft, BookOpen, Lightbulb, Code, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import './Study.css';

const Study = () => {
    const { subjectId, weekId } = useParams();
    const navigate = useNavigate();

    const subject = SUBJECTS[subjectId];
    const week = parseInt(weekId);
    const material = STUDY_MATERIAL[subjectId]?.[week];

    if (!subject || !material) {
        return (
            <div className="study-page">
                <FadeUp>
                    <h1>Content Coming Soon...</h1>
                    <p className="subtitle">We're still adding study material for this topic</p>
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} /> Go Back
                    </button>
                </FadeUp>
            </div>
        );
    }

    const topic = subject.topics.find(t => t.week === week);
    const prevWeek = week > 1 ? week - 1 : null;
    const nextWeek = week < 12 && STUDY_MATERIAL[subjectId]?.[week + 1] ? week + 1 : null;

    return (
        <div className="study-page">
            {/* Header */}
            <FadeUp>
                <div className="study-header">
                    <button className="back-btn" onClick={() => navigate(`/subject/${subjectId}`)}>
                        <ChevronLeft size={20} /> Back to {subject.name}
                    </button>
                    <div className="week-badge">Week {week}</div>
                </div>

                <h1 className="study-title">
                    <BlurText>{material.title}</BlurText>
                </h1>
                <p className="study-subtitle">{topic?.description}</p>
            </FadeUp>

            {/* Key Points */}
            <FadeUp delay={0.1}>
                <TiltCard className="study-section">
                    <div className="section-header">
                        <Zap size={22} />
                        <h2>Key Points</h2>
                    </div>
                    <ul className="key-points">
                        {material.keyPoints.map((point, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <span className="bullet">→</span>
                                {point}
                            </motion.li>
                        ))}
                    </ul>
                </TiltCard>
            </FadeUp>

            {/* Concepts */}
            <FadeUp delay={0.2}>
                <TiltCard className="study-section">
                    <div className="section-header">
                        <BookOpen size={22} />
                        <h2>Key Concepts</h2>
                    </div>
                    <div className="concepts-grid">
                        {material.concepts.map((concept, i) => (
                            <motion.div
                                key={i}
                                className="concept-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                <span className="concept-term">{concept.term}</span>
                                <span className="concept-def">{concept.def}</span>
                            </motion.div>
                        ))}
                    </div>
                </TiltCard>
            </FadeUp>

            {/* Code Example */}
            <FadeUp delay={0.3}>
                <TiltCard className="study-section">
                    <div className="section-header">
                        <Code size={22} />
                        <h2>Example</h2>
                    </div>
                    <pre className="code-block">
                        <code>{material.example}</code>
                    </pre>
                </TiltCard>
            </FadeUp>

            {/* Pro Tip */}
            <FadeUp delay={0.4}>
                <motion.div
                    className="tip-box"
                    whileHover={{ scale: 1.01 }}
                >
                    <Lightbulb size={20} />
                    <span><strong>Pro Tip:</strong> {material.tips}</span>
                </motion.div>
            </FadeUp>

            {/* Navigation */}
            <FadeUp delay={0.5}>
                <div className="study-navigation">
                    {prevWeek && STUDY_MATERIAL[subjectId]?.[prevWeek] ? (
                        <button
                            className="nav-btn prev"
                            onClick={() => navigate(`/study/${subjectId}/${prevWeek}`)}
                        >
                            <ArrowLeft size={18} />
                            Week {prevWeek}
                        </button>
                    ) : <div />}

                    <button
                        className="nav-btn quiz"
                        onClick={() => navigate('/quiz')}
                    >
                        Take Quiz
                    </button>

                    {nextWeek ? (
                        <button
                            className="nav-btn next"
                            onClick={() => navigate(`/study/${subjectId}/${nextWeek}`)}
                        >
                            Week {nextWeek}
                            <ArrowRight size={18} />
                        </button>
                    ) : <div />}
                </div>
            </FadeUp>
        </div>
    );
};

export default Study;
