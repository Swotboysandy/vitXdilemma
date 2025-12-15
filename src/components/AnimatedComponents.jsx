// Advanced Animated Components inspired by ReactBits
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ============================================
// TEXT ANIMATIONS
// ============================================

// Split Text Animation - Character by character reveal
export const SplitText = ({ children, className = '', delay = 0 }) => {
    const chars = children.split('');

    return (
        <span className={className}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                        delay: delay + i * 0.03,
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};

// Blur Text - Text that blurs in
export const BlurText = ({ children, className = '', delay = 0 }) => (
    <motion.span
        className={className}
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay, duration: 0.8, ease: 'easeOut' }}
    >
        {children}
    </motion.span>
);

// Gradient Text with Animation
export const GradientText = ({ children, className = '' }) => (
    <motion.span
        className={`gradient-animated ${className}`}
        style={{
            background: 'linear-gradient(90deg, #ffffff, #888888, #ffffff)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        }}
        animate={{ backgroundPosition: ['0% center', '200% center'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    >
        {children}
    </motion.span>
);

// Typewriter Effect
export const TypewriterText = ({ text, speed = 50, className = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ borderRight: '2px solid currentColor', marginLeft: '2px' }}
            />
        </span>
    );
};

// Counting Number Animation
export const CountUp = ({ end, duration = 2, className = '' }) => {
    const ref = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span ref={ref} className={className}>{count}</span>;
};

// ============================================
// MOTION ANIMATIONS
// ============================================

// Fade Up Animation
export const FadeUp = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

// Scale In Animation
export const ScaleIn = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
);

// Slide In from Left/Right
export const SlideIn = ({ children, direction = 'left', delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger Container
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => (
    <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: staggerDelay }
            }
        }}
    >
        {children}
    </motion.div>
);

// Stagger Item
export const StaggerItem = ({ children, className = '' }) => (
    <motion.div
        className={className}
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }
        }}
    >
        {children}
    </motion.div>
);

// ============================================
// INTERACTIVE COMPONENTS
// ============================================

// Magnetic Button - Follows cursor
export const MagneticButton = ({ children, className = '', onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouse = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set((e.clientX - centerX) * 0.3);
            y.set((e.clientY - centerY) * 0.3);
        }
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            className={`magnetic-btn ${className}`}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

// Tilt Card - 3D perspective on hover
export const TiltCard = ({ children, className = '', onClick }) => {
    const ref = useRef(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouse = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);
            rotateX.set(-y * 10);
            rotateY.set(x * 10);
        }
    };

    const handleLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`tilt-card ${className}`}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            onClick={onClick}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {children}
        </motion.div>
    );
};

// Glow Card with Spotlight Effect
export const GlowCard = ({ children, className = '', onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouse = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    return (
        <motion.div
            ref={ref}
            className={`glow-card ${className}`}
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
                cursor: onClick ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {isHovered && (
                <div
                    className="spotlight"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: 'none',
                        background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent)`,
                    }}
                />
            )}
            {children}
        </motion.div>
    );
};

// Ripple Button
export const RippleButton = ({ children, className = '', onClick }) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples(prev => [...prev, { x, y, id }]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
        onClick?.();
    };

    return (
        <motion.button
            className={`ripple-btn ${className}`}
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {ripples.map(ripple => (
                <motion.span
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: 'absolute',
                        left: ripple.x,
                        top: ripple.y,
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.3)',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none'
                    }}
                />
            ))}
            {children}
        </motion.button>
    );
};

// ============================================
// SPECIALIZED COMPONENTS
// ============================================

// Animated Counter with GSAP
export const AnimatedCounter = ({ value, duration = 1 }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(ref.current,
                { innerText: 0 },
                {
                    innerText: value,
                    duration,
                    snap: { innerText: 1 },
                    ease: 'power2.out'
                }
            );
        }
    }, [value, duration]);

    return <span ref={ref}>0</span>;
};

// Flip Card for Flashcards
export const FlipCard = ({ front, back, isFlipped, onClick }) => (
    <motion.div
        className="flip-card"
        onClick={onClick}
        style={{ perspective: '1000px', cursor: 'pointer' }}
    >
        <motion.div
            className="flip-card-inner"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        >
            <div className="flip-card-front" style={{ backfaceVisibility: 'hidden' }}>
                {front}
            </div>
            <div
                className="flip-card-back"
                style={{
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    transform: 'rotateY(180deg)'
                }}
            >
                {back}
            </div>
        </motion.div>
    </motion.div>
);

// Progress Ring
export const ProgressRing = ({ progress, size = 80, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={strokeWidth}
            />
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#ffffff"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ strokeDasharray: circumference }}
            />
        </svg>
    );
};

// Shimmer Button
export const ShimmerButton = ({ children, onClick, className = '' }) => (
    <motion.button
        className={`shimmer-btn ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ position: 'relative', overflow: 'hidden' }}
    >
        {children}
        <motion.div
            style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            }}
            animate={{ left: ['−100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
    </motion.button>
);

// Page Transition Wrapper
export const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
        {children}
    </motion.div>
);

// Floating Animation
export const FloatingElement = ({ children, className = '', amplitude = 10, duration = 3 }) => (
    <motion.div
        className={className}
        animate={{ y: [-amplitude, amplitude, -amplitude] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
        {children}
    </motion.div>
);

// Pulse Animation
export const PulseElement = ({ children, className = '' }) => (
    <motion.div
        className={className}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
        {children}
    </motion.div>
);

// Spotlight Card Background
export const SpotlightBackground = () => (
    <div className="spotlight-bg">
        <motion.div
            className="spotlight-orb orb-1"
            animate={{
                x: [0, 100, 50, 0],
                y: [0, 50, 100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
            className="spotlight-orb orb-2"
            animate={{
                x: [0, -50, -100, 0],
                y: [0, 100, 50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
    </div>
);
