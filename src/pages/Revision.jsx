// Quick Revision Page
import { FadeUp, StaggerContainer, StaggerItem, GlowCard } from '../components/AnimatedComponents';
import { BookOpen, Lightbulb, Calculator, Network } from 'lucide-react';
import './Revision.css';

const Revision = () => {
    const formulas = [
        { title: "A* Search", formula: "f(n) = g(n) + h(n)" },
        { title: "Bayes' Theorem", formula: "P(A|B) = P(B|A)P(A) / P(B)" },
        { title: "Z-Score", formula: "Z = (x - μ) / σ" },
        { title: "Standard Error", formula: "SE = σ / √n" },
        { title: "Q-Learning", formula: "Q(s,a) ← Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]" },
        { title: "Risk", formula: "Risk = Probability × Impact" },
        { title: "R² (Coefficient)", formula: "R² = 1 - (SSres / SStot)" },
        { title: "Confidence Interval", formula: "x̄ ± Z * (σ/√n)" },
    ];

    const mnemonics = [
        { title: "OSI Layers", content: "Please Do Not Throw Sausage Pizza Away (Physical, Data Link, Network, Transport, Session, Presentation, Application)" },
        { title: "OOP Pillars", content: "A PIE - Abstraction, Polymorphism, Inheritance, Encapsulation" },
        { title: "CMMI Levels", content: "I Must Do Quality Optimization (Initial, Managed, Defined, Quantitatively Managed, Optimizing)" },
        { title: "68-95-99.7 Rule", content: "Normal distribution: 68% within 1σ, 95% within 2σ, 99.7% within 3σ" },
    ];

    const ports = [
        { service: "HTTP", port: 80 },
        { service: "HTTPS", port: 443 },
        { service: "SSH", port: 22 },
        { service: "FTP", port: 21 },
        { service: "DNS", port: 53 },
        { service: "SMTP", port: 25 },
        { service: "Telnet", port: 23 },
        { service: "SNMP", port: 161 },
    ];

    return (
        <div className="revision-page">
            <FadeUp>
                <h1>Quick Revision</h1>
                <p className="subtitle">Essential formulas and concepts at a glance</p>
            </FadeUp>

            <FadeUp delay={0.1}>
                <section className="revision-section">
                    <h2><Calculator size={24} /> Key Formulas</h2>
                    <div className="formula-grid">
                        {formulas.map((f, i) => (
                            <GlowCard key={i} className="formula-card">
                                <div className="formula-title">{f.title}</div>
                                <div className="formula-content">{f.formula}</div>
                            </GlowCard>
                        ))}
                    </div>
                </section>
            </FadeUp>

            <FadeUp delay={0.2}>
                <section className="revision-section">
                    <h2><Lightbulb size={24} /> Memory Tricks</h2>
                    <div className="tips-list">
                        {mnemonics.map((m, i) => (
                            <GlowCard key={i} className="tip-card">
                                <div className="tip-content">
                                    <strong>{m.title}:</strong> {m.content}
                                </div>
                            </GlowCard>
                        ))}
                    </div>
                </section>
            </FadeUp>

            <FadeUp delay={0.3}>
                <section className="revision-section">
                    <h2><Network size={24} /> Common Ports</h2>
                    <div className="ports-grid">
                        {ports.map((p, i) => (
                            <GlowCard key={i} className="port-card">
                                <span className="port-service">{p.service}</span>
                                <span className="port-number">{p.port}</span>
                            </GlowCard>
                        ))}
                    </div>
                </section>
            </FadeUp>
        </div>
    );
};

export default Revision;
