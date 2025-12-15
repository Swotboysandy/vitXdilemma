// Flashcards Page with ReactBits-style animations
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBJECTS, FLASHCARDS } from '../data/quizData';
import {
    FadeUp,
    BlurText,
    TiltCard,
    RippleButton,
    MagneticButton
} from '../components/AnimatedComponents';
import { ChevronLeft, ChevronRight, X, Check, Shuffle, RotateCcw } from 'lucide-react';
import './Flashcards.css';

const Flashcards = () => {
    const [subject, setSubject] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [known, setKnown] = useState([]);
    const [exitDirection, setExitDirection] = useState(0);

    const startFlashcards = (subjectId) => {
        setSubject(subjectId);
        setCards(FLASHCARDS[subjectId] || []);
        setCurrentIndex(0);
        setIsFlipped(false);
        setKnown([]);
    };

    const nextCard = () => {
        if (currentIndex < cards.length - 1) {
            setExitDirection(1);
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
        }
    };

    const prevCard = () => {
        if (currentIndex > 0) {
            setExitDirection(-1);
            setCurrentIndex(currentIndex - 1);
            setIsFlipped(false);
        }
    };

    const markKnown = () => {
        setKnown([...known, currentIndex]);
        nextCard();
    };

    const reset = () => {
        setSubject(null);
        setCards([]);
        setCurrentIndex(0);
        setKnown([]);
    };

    const shuffleCards = () => {
        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setCurrentIndex(0);
        setIsFlipped(false);
        setKnown([]);
    };

    if (!subject) {
        return (
            <div className="flashcards-page">
                <FadeUp>
                    <h1><BlurText>Flashcards</BlurText></h1>
                    <p className="subtitle">Quick review with interactive flashcards</p>
                </FadeUp>

                <div className="subject-selection">
                    {Object.values(SUBJECTS).map((s, index) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TiltCard
                                className="subject-card"
                                onClick={() => startFlashcards(s.id)}
                            >
                                <span className="subject-name">{s.name}</span>
                                <span className="card-count">{FLASHCARDS[s.id]?.length || 0} cards</span>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    const cardVariants = {
        enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0 })
    };

    return (
        <div className="flashcards-page">
            <FadeUp>
                <div className="flashcard-header">
                    <RippleButton className="back-btn" onClick={reset}>
                        <ChevronLeft size={20} /> Back
                    </RippleButton>
                    <div className="header-center">
                        <span className="progress">{currentIndex + 1} / {cards.length}</span>
                        <RippleButton className="shuffle-btn" onClick={shuffleCards}>
                            <Shuffle size={16} />
                        </RippleButton>
                    </div>
                    <span className="known-count">{known.length} known</span>
                </div>
            </FadeUp>

            <div className="flashcard-container">
                <AnimatePresence mode="wait" custom={exitDirection}>
                    <motion.div
                        key={currentIndex}
                        custom={exitDirection}
                        variants={cardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <motion.div
                            className="flashcard-inner"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="flashcard-front">
                                <span className="card-label">Question</span>
                                <p>{cards[currentIndex]?.front}</p>
                                <span className="flip-hint">Click to flip</span>
                            </div>
                            <div className="flashcard-back">
                                <span className="card-label">Answer</span>
                                <p>{cards[currentIndex]?.back}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flashcard-controls">
                <MagneticButton
                    className="control-btn"
                    onClick={prevCard}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft size={24} />
                </MagneticButton>

                <div className="action-buttons">
                    <RippleButton className="action-btn review" onClick={nextCard}>
                        <X size={20} /> Review Later
                    </RippleButton>
                    <RippleButton className="action-btn know" onClick={markKnown}>
                        <Check size={20} /> Know It
                    </RippleButton>
                </div>

                <MagneticButton
                    className="control-btn"
                    onClick={nextCard}
                    disabled={currentIndex === cards.length - 1}
                >
                    <ChevronRight size={24} />
                </MagneticButton>
            </div>

            {/* Progress Dots */}
            <div className="progress-dots">
                {cards.map((_, i) => (
                    <motion.div
                        key={i}
                        className={`dot ${i === currentIndex ? 'active' : ''} ${known.includes(i) ? 'known' : ''}`}
                        whileHover={{ scale: 1.5 }}
                        onClick={() => {
                            setExitDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                            setIsFlipped(false);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Flashcards;
