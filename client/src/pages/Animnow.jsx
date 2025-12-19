import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classes from './Animnow.module.css';

function Animnow() {
    const [formState, setFormState] = useState('idle');

    const handleSignup = (e) => {
        e.preventDefault();
        setFormState('loading');
        setTimeout(() => setFormState('success'), 1500);
    };

    return (
        <div className={classes.container}>
            {/* 1. Hero Section */}
            <section className={classes.hero}>
                <div className={classes.heroContent}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={classes.badge}
                    >
                        Engineering the Future of Motion
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Animnow <span>_</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={classes.lead}
                    >
                        A precision-engineered, browser-native 2D studio. Transform complex ideas into fluid motion without the overhead of legacy software.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={classes.heroActions}
                    >
                        <a href="#early-access" className={classes.primaryCTA}>Secure Early Access</a>
                        <button className={classes.secondaryCTA}>Explore the Engine</button>
                    </motion.div>
                </div>

                {/* Enhanced Editor UI Visual */}
                <div className={classes.visualContainer}>
                    <div className={classes.editorWindow}>
                        <div className={classes.editorHeader}>
                            <div className={classes.dotGroup}><span></span><span></span><span></span></div>
                            <div className={classes.editorTab}>Animnow_Studio_v0.4.pr</div>
                        </div>
                        <div className={classes.editorBody}>
                            <aside className={classes.sidePanel}>
                                <div className={classes.panelGroup}>
                                    <div className={classes.panelTitle}>Layers</div>
                                    <div className={classes.layerItem}><span>◈</span> Character_Main</div>
                                    <div className={classes.layerItem}><span>◈</span> Background_City</div>
                                    <div className={classes.layerItem + ' ' + classes.activeLayer}><span>◈</span> Arm_Right</div>
                                </div>
                            </aside>

                            <div className={classes.uiCanvas}>
                                <div className={classes.gridOverlay}></div>
                                <motion.div
                                    className={classes.characterContainer}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    {/* Stick Figure SVG */}
                                    <svg width="120" height="200" viewBox="0 0 120 200" className={classes.stickMan}>
                                        <motion.circle cx="60" cy="40" r="15" fill="var(--color-primary)" />
                                        <motion.line x1="60" y1="55" x2="60" y2="120" stroke="var(--color-primary)" strokeWidth="6" />
                                        {/* Arms */}
                                        <motion.line
                                            x1="60" y1="70" x2="30" y2="100"
                                            stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round"
                                            animate={{ rotate: [-20, 20, -20] }}
                                            style={{ originX: "60px", originY: "70px" }}
                                        />
                                        <motion.line
                                            x1="60" y1="70" x2="90" y2="100"
                                            stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round"
                                            animate={{ rotate: [20, -20, 20] }}
                                            style={{ originX: "60px", originY: "70px" }}
                                        />
                                        {/* Legs */}
                                        <motion.line x1="60" y1="120" x2="40" y2="170" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" />
                                        <motion.line x1="60" y1="120" x2="80" y2="170" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" />
                                    </svg>
                                </motion.div>
                                <div className={classes.selectionBox}></div>
                            </div>

                            <aside className={classes.sidePanel + ' ' + classes.rightPanel}>
                                <div className={classes.panelGroup}>
                                    <div className={classes.panelTitle}>Inspector</div>
                                    <div className={classes.property}><span>X:</span> 124.5px</div>
                                    <div className={classes.property}><span>Y:</span> 450.2px</div>
                                    <div className={classes.property}><span>Rot:</span> 12.0°</div>
                                    <div className={classes.property}><span>Scale:</span> 100%</div>
                                </div>
                            </aside>
                        </div>
                        <div className={classes.uiTimeline}>
                            <div className={classes.timelineHeader}>
                                <span>00:00:04:12</span>
                                <div className={classes.playbackBtns}><span>◀</span><span>▮▮</span><span>▶</span></div>
                            </div>
                            <div className={classes.tracks}>
                                <div className={classes.track}><div className={classes.keyframe}></div><div className={classes.keyframe} style={{ left: '40%' }}></div></div>
                                <div className={classes.playhead}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Problem Statement - Redesigned */}
            <section className={classes.problem}>
                <div className={classes.sectionContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={classes.problemHeader}
                    >
                        <span className={classes.label}>The Creative Friction</span>
                        <h2>Existing systems are <span>broken.</span></h2>
                        <p className={classes.problemIntro}>
                            Animation has remained locked behind high-barrier ecosystems for decades. We've identified the three core failures of the current landscape.
                        </p>
                    </motion.div>

                    <div className={classes.frictionList}>
                        {[
                            {
                                num: '01',
                                title: 'The Complexity Debt',
                                text: 'Legacy software forces a choice: spend months mastering a bloated interface or settle for "amateur" templates. Pro-level tools shouldn\'t require degree-level training.',
                                barrier: 'Technical Fatigue'
                            },
                            {
                                num: '02',
                                title: 'The AI Discrepancy',
                                text: 'Generative AI produces "magic" but zero intentionality. You get a video you didn\'t ask for, with no way to tweak a single frame or path. It\'s a black box, not a brush.',
                                barrier: 'Loss of Intent'
                            },
                            {
                                num: '03',
                                title: 'The Hardware Anchor',
                                text: 'Heavy rendering still relies on local GPU power. If you aren\'t at your workstation, you aren\'t creating. The cloud has changed everything else; why not motion?',
                                barrier: 'Physical Tethering'
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className={classes.frictionItem}
                            >
                                <div className={classes.fNum}>{item.num}</div>
                                <div className={classes.fContent}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                    <div className={classes.impactTag}>Barrier: {item.barrier}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. High-Impact Definition */}
            <section className={classes.definition}>
                <div className={classes.darkBanner}>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        "A studio that honors your intent, leverages AI for speed, and lives entirely in your browser tab."
                    </motion.h2>
                </div>
            </section>

            {/* 4. Feature Grid - Evocative Style */}
            <section className={classes.features}>
                <div className={classes.sectionHeader}>
                    <span className={classes.statusTag}>The Core Engine</span>
                    <h2>Sophisticated, not complicated.</h2>
                </div>
                <div className={classes.featureGrid}>
                    {[
                        { title: 'Vector Sovereignty', desc: 'True SVG/Path based character rigging for infinite resolution and surgical control.' },
                        { title: 'Spatial Architect', desc: 'Compose depth with a hierarchical scene builder that mirrors desktop workflows.' },
                        { title: 'Keyframe Nirvana', desc: 'A custom timeline engine with eased paths, graph editing, and frame-perfect precision.' },
                        { title: 'AI Co-Pilot', desc: 'Human-led AI for auto-inbetweening and rhythmic timing. You drive, it accelerates.' },
                        { title: 'Cloud Render', desc: 'Bypass your CPU. Render 4K exports on our edge-compute clusters in seconds.' }
                    ].map((f, i) => (
                        <div key={i} className={classes.featureCard}>
                            <div className={classes.cardNumber}>0{i + 1}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Visual Workflow */}
            <section className={classes.workflow}>
                <div className={classes.sectionContent}>
                    <h2>Visual Workflow</h2>
                    <div className={classes.workflowSteps}>
                        {['Choose Character', 'Build Scene', 'Animate Timeline', 'Preview', 'Export'].map((step, i) => (
                            <div key={i} className={classes.step}>
                                <span className={classes.stepNum}>0{i + 1}</span>
                                <h3>{step}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Development Status */}
            <section className={classes.status}>
                <div className={classes.statusContainer}>
                    <h2>Development Progress</h2>
                    <div className={classes.roadmap}>
                        <div className={classes.roadmapItem + ' ' + classes.completed}>
                            <span>Core Canvas Engine</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem + ' ' + classes.completed}>
                            <span>Text/Object Animation</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem + ' ' + classes.active}>
                            <span>Character System</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem}>
                            <span>Scene Presets</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem}>
                            <span>Public Beta</span>
                            <div className={classes.dot}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Target Users */}
            <section className={classes.users}>
                <div className={classes.sectionContent}>
                    <h2>Built for Creators</h2>
                    <div className={classes.userGrid}>
                        <span>Content Creators</span>
                        <span>Marketing Teams</span>
                        <span>Educators</span>
                        <span>Startups</span>
                        <span>Agencies</span>
                    </div>
                </div>
            </section>

            {/* 8. Early Access CTA */}
            <section id="early-access" className={classes.earlyAccess}>
                <div className={classes.formCard}>
                    {formState !== 'success' ? (
                        <>
                            <h2>Request Early Access</h2>
                            <p>Be the first to know when we open the private beta.</p>
                            <form className={classes.signupForm} onSubmit={handleSignup}>
                                <div className={classes.inputRow}>
                                    <input type="text" placeholder="Full Name" required />
                                    <input type="email" placeholder="Email Address" required />
                                </div>
                                <div className={classes.inputRow}>
                                    <select required>
                                        <option value="">Select your role</option>
                                        <option value="creator">Creator</option>
                                        <option value="marketing">Marketing Team</option>
                                        <option value="educator">Educator</option>
                                        <option value="agency">Agency</option>
                                    </select>
                                    <input type="text" placeholder="Intended Use Case" required />
                                </div>
                                <button type="submit" disabled={formState === 'loading'}>
                                    {formState === 'loading' ? 'Encrypting...' : 'Request Invitation'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className={classes.successMessage}>
                            <h2>Invitation Requested.</h2>
                            <p>We'll reach out as soon as a slot opens in your category.</p>
                        </div>
                    )}
                </div>
            </section>

            <footer className={classes.pageFooter}>
                <p>“Animnow is an in-house product built by our creative engineering team.”</p>
            </footer>
        </div>
    );
}

export default Animnow;
