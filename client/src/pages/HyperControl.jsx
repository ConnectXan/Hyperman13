import React from 'react';
import { motion } from 'framer-motion';
import classes from './Animnow.module.css'; // Reusing Animnow styles

function HyperControl() {
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
                        Internal Infrastructure System
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Hyper-Control <span>_</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={classes.lead}
                    >
                        The unified backend content engine powering Hyper13 agency and Animnow. Manages authentication, dynamic content, and API services with enterprise-grade security.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={classes.heroActions}
                    >
                        <a href="/admin/login" className={classes.primaryCTA}>Access Admin Panel</a>
                        <button className={classes.secondaryCTA}>View Documentation</button>
                    </motion.div>
                </div>

                {/* Backend Dashboard Visual */}
                <div className={classes.visualContainer}>
                    <div className={classes.editorWindow}>
                        <div className={classes.editorHeader}>
                            <div className={classes.dotGroup}><span></span><span></span><span></span></div>
                            <div className={classes.editorTab}>admin/blocks/services.json</div>
                        </div>
                        <div className={classes.editorBody}>
                            <aside className={classes.sidePanel}>
                                <div className={classes.panelGroup}>
                                    <div className={classes.panelTitle}>Content Blocks</div>
                                    <div className={classes.layerItem}><span>📦</span> services.json</div>
                                    <div className={classes.layerItem}><span>📦</span> portfolio.json</div>
                                    <div className={classes.layerItem + ' ' + classes.activeLayer}><span>📦</span> casestudies.json</div>
                                    <div className={classes.layerItem}><span>📦</span> navigation.json</div>
                                    <div className={classes.layerItem}><span>🔐</span> auth.js</div>
                                </div>
                            </aside>

                            <div className={classes.uiCanvas}>
                                <div className={classes.gridOverlay}></div>
                                <motion.div
                                    style={{
                                        padding: '1.5rem',
                                        color: 'var(--color-text)',
                                        fontSize: '0.75rem',
                                        fontFamily: 'monospace'
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div style={{ marginBottom: '0.5rem', color: 'var(--color-text-dim)' }}>
                                        <span style={{ color: 'var(--color-accent)' }}>GET</span> /api/blocks/case-studies
                                    </div>
                                    <div style={{
                                        background: 'var(--color-surface)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--color-border)',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ color: 'var(--color-text-dim)' }}>{'{'}</div>
                                        <div style={{ paddingLeft: '1rem' }}>
                                            <span style={{ color: 'var(--color-accent)' }}>"id"</span>:
                                            <span style={{ color: 'var(--color-primary)' }}> "case-meta-growth"</span>,
                                        </div>
                                        <div style={{ paddingLeft: '1rem' }}>
                                            <span style={{ color: 'var(--color-accent)' }}>"title"</span>:
                                            <span style={{ color: 'var(--color-primary)' }}> "Meta Ads Growth"</span>,
                                        </div>
                                        <div style={{ paddingLeft: '1rem' }}>
                                            <span style={{ color: 'var(--color-accent)' }}>"type"</span>:
                                            <span style={{ color: 'var(--color-primary)' }}> "blog"</span>,
                                        </div>
                                        <div style={{ paddingLeft: '1rem' }}>
                                            <span style={{ color: 'var(--color-accent)' }}>"visible"</span>:
                                            <span style={{ color: '#4CAF50' }}> true</span>
                                        </div>
                                        <div style={{ color: 'var(--color-text-dim)' }}>{'}'}</div>
                                    </div>
                                    <div style={{
                                        padding: '0.75rem',
                                        background: 'rgba(76, 175, 80, 0.1)',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(76, 175, 80, 0.3)',
                                        color: '#4CAF50',
                                        fontWeight: '600'
                                    }}>
                                        ✓ 200 OK • Authenticated • 12 blocks loaded
                                    </div>
                                </motion.div>
                            </div>

                            <aside className={classes.sidePanel + ' ' + classes.rightPanel}>
                                <div className={classes.panelGroup}>
                                    <div className={classes.panelTitle}>System Monitor</div>
                                    <div className={classes.property}><span>Auth:</span> JWT Active</div>
                                    <div className={classes.property}><span>Uptime:</span> 99.8%</div>
                                    <div className={classes.property}><span>Requests:</span> 12.4k</div>
                                    <div className={classes.property}><span>Storage:</span> 45 MB</div>
                                </div>
                                <div className={classes.panelGroup} style={{ marginTop: '1rem' }}>
                                    <div className={classes.panelTitle}>Active Users</div>
                                    <div className={classes.property}><span>Admin:</span> 1</div>
                                    <div className={classes.property}><span>Sessions:</span> 3</div>
                                </div>
                            </aside>
                        </div>
                        <div className={classes.uiTimeline}>
                            <div className={classes.timelineHeader}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>▶</span> Server: localhost:5000
                                </span>
                                <div className={classes.playbackBtns}>
                                    <span style={{ fontSize: '0.65rem' }}>Node.js v18.x</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Core System */}
            <section className={classes.problem}>
                <div className={classes.sectionContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={classes.problemHeader}
                    >
                        <span className={classes.label}>The Backend Engine</span>
                        <h2>Unified <span>infrastructure.</span></h2>
                        <p className={classes.problemIntro}>
                            Hyper-Control is the central nervous system powering all our applications. Built for performance, security, and scalability.
                        </p>
                    </motion.div>

                    <div className={classes.frictionList}>
                        {[
                            {
                                num: '01',
                                title: 'Content Management',
                                text: 'RESTful API for managing all website content blocks, themes, and configurations with real-time sync across applications.',
                                barrier: 'Dynamic Content'
                            },
                            {
                                num: '02',
                                title: 'Authentication & Authorization',
                                text: 'JWT-based secure authentication with role-based access control. Manages admin sessions for both agency site and Animnow.',
                                barrier: 'Security First'
                            },
                            {
                                num: '03',
                                title: 'File-Based Storage',
                                text: 'Lightweight JSON-based data storage for rapid reads and writes. No database overhead, perfect for content-driven applications.',
                                barrier: 'High Performance'
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
                                    <div className={classes.impactTag}>Feature: {item.barrier}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Tech Stack */}
            <section className={classes.features}>
                <div className={classes.sectionHeader}>
                    <span className={classes.statusTag}>Technology Stack</span>
                    <h2>Built on proven technology.</h2>
                </div>
                <div className={classes.featureGrid}>
                    {[
                        { title: 'Node.js + Express', desc: 'High-performance JavaScript runtime with Express framework for robust API endpoints.' },
                        { title: 'JWT Authentication', desc: 'Industry-standard token-based authentication for secure, stateless sessions.' },
                        { title: 'File-Based Storage', desc: 'Lightweight JSON storage for fast reads and easy version control.' },
                        { title: 'RESTful API', desc: 'Clean, predictable API design following REST principles for seamless integration.' },
                        { title: 'CORS Enabled', desc: 'Cross-origin resource sharing configured for secure frontend-backend communication.' }
                    ].map((f, i) => (
                        <div key={i} className={classes.featureCard}>
                            <div className={classes.cardNumber}>0{i + 1}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Status */}
            <section className={classes.status}>
                <div className={classes.statusContainer}>
                    <h2>System Status</h2>
                    <div className={classes.roadmap}>
                        <div className={classes.roadmapItem + ' ' + classes.completed}>
                            <span>Core API</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem + ' ' + classes.completed}>
                            <span>Authentication</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem + ' ' + classes.completed}>
                            <span>Content CRUD</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem + ' ' + classes.active}>
                            <span>Animnow Integration</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem}>
                            <span>Cloud Deployment</span>
                            <div className={classes.dot}></div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={classes.pageFooter}>
                <p>"Hyper-Control is the backbone infrastructure powering our entire product ecosystem."</p>
            </footer>
        </div>
    );
}

export default HyperControl;
