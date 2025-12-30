// Quiz Page with ReactBits-style animations
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBJECTS, QUIZ_DATA } from '../data/quizData';
import {
    FadeUp,
    BlurText,
    ShimmerButton,
    TiltCard,
    CountUp,
    RippleButton
} from '../components/AnimatedComponents';
import { Play, Clock, CheckCircle, XCircle, RotateCcw, Trophy, Zap } from 'lucide-react';
import './Quiz.css';

const Quiz = () => {
    const [stage, setStage] = useState('setup');
    const [config, setConfig] = useState({ subject: 'mixed', count: 20, timer: 30 });
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    const shuffle = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const startQuiz = () => {
        let qs = [];
        if (config.subject === 'mixed') {
            Object.keys(QUIZ_DATA).forEach(s => {
                qs = qs.concat(QUIZ_DATA[s].map(q => ({ ...q, subject: s })));
            });
        } else {
            qs = QUIZ_DATA[config.subject].map(q => ({ ...q, subject: config.subject }));
        }
        const selected = shuffle(qs).slice(0, config.count);
        setQuestions(selected);
        setAnswers(new Array(selected.length).fill(null));
        setTimeLeft(config.timer * 60);
        setCurrentIndex(0);
        setShowFeedback(false);
        setStage('quiz');
    };

    useEffect(() => {
        if (stage !== 'quiz' || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    finishQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [stage, timeLeft]);

    const selectAnswer = (index) => {
        if (showFeedback) return;
        const newAnswers = [...answers];
        newAnswers[currentIndex] = index;
        setAnswers(newAnswers);
        setShowFeedback(true);
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowFeedback(false);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowFeedback(answers[currentIndex - 1] !== null);
        }
    };

    const finishQuiz = () => {
        let correct = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.answer) correct++;
        });
        setScore(Math.round((correct / questions.length) * 100));
        setStage('results');
    };

    const resetQuiz = () => {
        setStage('setup');
        setQuestions([]);
        setAnswers([]);
        setScore(0);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="quiz-page">
            <AnimatePresence mode="wait">
                {stage === 'setup' && (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="quiz-setup"
                    >
                        <h1><BlurText>Practice Quiz</BlurText></h1>
                        <p className="subtitle">Test your knowledge with {Object.values(QUIZ_DATA).reduce((s, a) => s + a.length, 0)}+ questions</p>

                        <TiltCard className="setup-form">
                            <div className="form-group">
                                <label>Subject</label>
                                <select value={config.subject} onChange={(e) => setConfig({ ...config, subject: e.target.value })}>
                                    <option value="mixed">All Subjects (Mixed)</option>
                                    {Object.values(SUBJECTS).map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Number of Questions</label>
                                <select value={config.count} onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) })}>
                                    <option value={10}>10 Questions</option>
                                    <option value={20}>20 Questions</option>
                                    <option value={50}>50 Questions</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Time Limit</label>
                                <select value={config.timer} onChange={(e) => setConfig({ ...config, timer: parseInt(e.target.value) })}>
                                    <option value={0}>No Limit</option>
                                    <option value={15}>15 Minutes</option>
                                    <option value={30}>30 Minutes</option>
                                    <option value={60}>60 Minutes</option>
                                </select>
                            </div>

                            <RippleButton onClick={startQuiz} className="start-btn">
                                <Zap size={20} /> Start Quiz
                            </RippleButton>
                        </TiltCard>
                    </motion.div>
                )}

                {stage === 'quiz' && questions.length > 0 && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="quiz-container"
                    >
                        <div className="quiz-header">
                            <motion.span
                                className="quiz-progress"
                                key={currentIndex}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                            >
                                Question {currentIndex + 1} of {questions.length}
                            </motion.span>
                            {config.timer > 0 && (
                                <span className={`quiz-timer ${timeLeft < 60 ? 'danger' : timeLeft < 300 ? 'warning' : ''}`}>
                                    <Clock size={18} /> {formatTime(timeLeft)}
                                </span>
                            )}
                        </div>

                        <TiltCard className="question-card">
                            <div className="question-number">Question {currentIndex + 1}</div>
                            <motion.h2
                                className="question-text"
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {questions[currentIndex].q}
                            </motion.h2>

                            <div className="options-list">
                                {questions[currentIndex].options.map((opt, i) => (
                                    <motion.div
                                        key={i}
                                        className={`option-item ${answers[currentIndex] === i ? 'selected' : ''} ${showFeedback && i === questions[currentIndex].answer ? 'correct' : ''} ${showFeedback && answers[currentIndex] === i && i !== questions[currentIndex].answer ? 'wrong' : ''}`}
                                        onClick={() => selectAnswer(i)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={!showFeedback ? { scale: 1.02, x: 5 } : {}}
                                        whileTap={!showFeedback ? { scale: 0.98 } : {}}
                                        style={{ cursor: showFeedback ? 'default' : 'pointer' }}
                                    >
                                        <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                                        <span className="option-text">{opt}</span>
                                        {showFeedback && i === questions[currentIndex].answer && <CheckCircle size={18} className="feedback-icon correct" />}
                                        {showFeedback && answers[currentIndex] === i && i !== questions[currentIndex].answer && <XCircle size={18} className="feedback-icon wrong" />}
                                    </motion.div>
                                ))}
                            </div>
                        </TiltCard>

                        <div className="quiz-navigation">
                            <RippleButton className="nav-btn" onClick={prevQuestion} disabled={currentIndex === 0}>
                                Previous
                            </RippleButton>
                            {currentIndex === questions.length - 1 ? (
                                <RippleButton onClick={finishQuiz} className="nav-btn primary">
                                    Submit Quiz
                                </RippleButton>
                            ) : (
                                <RippleButton className="nav-btn primary" onClick={nextQuestion}>
                                    Next
                                </RippleButton>
                            )}
                        </div>
                    </motion.div>
                )}

                {stage === 'results' && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="quiz-results"
                    >
                        <motion.div
                            className="results-icon"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            {score >= 70 ? <Trophy size={80} /> : <CheckCircle size={80} />}
                        </motion.div>
                        <h1>{score >= 70 ? 'Excellent!' : score >= 50 ? 'Good Job!' : 'Keep Practicing!'}</h1>
                        <div className="results-score">
                            <CountUp end={score} duration={2} />%
                        </div>

                        <div className="results-stats">
                            <div className="stat">
                                <CheckCircle />
                                <span>{questions.filter((q, i) => answers[i] === q.answer).length} Correct</span>
                            </div>
                            <div className="stat">
                                <XCircle />
                                <span>{questions.filter((q, i) => answers[i] !== q.answer).length} Incorrect</span>
                            </div>
                        </div>

                        <div className="results-actions">
                            <RippleButton className="nav-btn" onClick={resetQuiz}>
                                <RotateCcw size={18} /> New Quiz
                            </RippleButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Quiz;
