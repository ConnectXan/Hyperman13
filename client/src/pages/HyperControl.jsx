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
                        Enterprise Infrastructure Engine
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
                        The ultimate industrial-grade backend engine. Designed for rapid integration, Hyper-Control centralizes your content, security, and data architecture into a single, high-performance SQLite-powered hub.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={classes.heroActions}
                    >
                        <a href="/admin/login" className={classes.primaryCTA}>Deploy Control Hub</a>
                        <button className={classes.secondaryCTA}>API Documentation</button>
                    </motion.div>
                </div>

                {/* Backend Dashboard Visual */}
                <div className={classes.visualContainer}>
                    <div className={classes.editorWindow}>
                        <div className={classes.editorHeader}>
                            <div className={classes.dotGroup}><span></span><span></span><span></span></div>
                            <div className={classes.editorTab}>hyper-control/db/blocks.sqlite</div>
                        </div>
                        <div className={classes.editorBody}>
                            <aside className={classes.sidePanel}>
                                <div className={classes.panelGroup}>
                                    <div className={classes.panelTitle}>Schema Tables</div>
                                    <div className={classes.layerItem}><span>📊</span> blocks</div>
                                    <div className={classes.layerItem}><span>👥</span> users</div>
                                    <div className={classes.layerItem + ' ' + classes.activeLayer}><span>📡</span> api_nodes</div>
                                    <div className={classes.layerItem}><span>🛡️</span> security_logs</div>
                                    <div className={classes.layerItem}><span>⚙️</span> config_global</div>
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
                                        <span style={{ color: 'var(--color-accent)' }}>QUERY</span> SELECT * FROM blocks WHERE section='pro'
                                    </div>
                                    <div style={{
                                        background: 'var(--color-surface)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--color-border)',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ color: 'var(--color-text-dim)' }}>[{'{'}</div>
                                        <div style={{ paddingLeft: '1rem' }}>
                                            <span style={{ color: 'var(--color-accent)' }}>"node"</span>:
                                            <span style={{ color: 'var(--color-primary)' }}> "enterprise-sync"</span>,
                                        </div>
                                        <div style={{ paddingLeft: '1rem' }}>
                                            <span style={{ color: 'var(--color-accent)' }}>"status"</span>:
                                            <span style={{ color: 'var(--color-primary)' }}> "optimal"</span>,
                                        </div>
                                        <div style={{ paddingLeft: '1rem' }}>
                                            <span style={{ color: 'var(--color-accent)' }}>"engine"</span>:
                                            <span style={{ color: 'var(--color-primary)' }}> "SQLite 3.x"</span>,
                                        </div>
                                        <div style={{ paddingLeft: '1rem' }}>
                                            <span style={{ color: 'var(--color-accent)' }}>"active"</span>:
                                            <span style={{ color: '#4CAF50' }}> true</span>
                                        </div>
                                        <div style={{ color: 'var(--color-text-dim)' }}>{'}'}]</div>
                                    </div>
                                    <div style={{
                                        padding: '0.75rem',
                                        background: 'rgba(76, 175, 80, 0.1)',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(76, 175, 80, 0.3)',
                                        color: '#4CAF50',
                                        fontWeight: '600'
                                    }}>
                                        ✓ SQL Execution: 0.2ms • Persistence: Secure
                                    </div>
                                </motion.div>
                            </div>

                            <aside className={classes.sidePanel + ' ' + classes.rightPanel}>
                                <div className={classes.panelGroup}>
                                    <div className={classes.panelTitle}>Engine Core</div>
                                    <div className={classes.property}><span>DB:</span> SQLite Indexed</div>
                                    <div className={classes.property}><span>IO:</span> Ultra-Low Latency</div>
                                    <div className={classes.property}><span>Scale:</span> Infinity Ready</div>
                                    <div className={classes.property}><span>Security:</span> JWT-AES</div>
                                </div>
                                <div className={classes.panelGroup} style={{ marginTop: '1rem' }}>
                                    <div className={classes.panelTitle}>Integration</div>
                                    <div className={classes.property}><span>Any Web App:</span> YES</div>
                                    <div className={classes.property}><span>CMS Mode:</span> Active</div>
                                </div>
                            </aside>
                        </div>
                        <div className={classes.uiTimeline}>
                            <div className={classes.timelineHeader}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>▶</span> Instance: cluster-alpha-13
                                </span>
                                <div className={classes.playbackBtns}>
                                    <span style={{ fontSize: '0.65rem' }}>Production Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Industry Standard Section */}
            <section className={classes.problem}>
                <div className={classes.sectionContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={classes.problemHeader}
                    >
                        <span className={classes.label}>Industry Standard</span>
                        <h2>One Engine. <span>Every App.</span></h2>
                        <p className={classes.problemIntro}>
                            Hyper-Control isn't just for us. It's a plug-and-play backbone designed for developers who need enterprise-level content management without the complexity of traditional databases.
                        </p>
                    </motion.div>

                    <div className={classes.frictionList}>
                        {[
                            {
                                num: '01',
                                title: 'Universal Integration',
                                text: 'Sync your entire product ecosystem. Whether it is a marketing site, a web app, or a 2D studio, Hyper-Control provides the single source of truth.',
                                barrier: 'Connect Any App'
                            },
                            {
                                num: '02',
                                title: 'Industrial Security',
                                text: 'Military-grade session management and JWT authentication. Your data is protected by industry-standard protocols and role-based access.',
                                barrier: 'Shielded Data'
                            },
                            {
                                num: '03',
                                title: 'Lightning Architecture',
                                text: 'Powered by an optimized SQLite engine. Massive performance gains with zero-configuration persistence and instant query resolution.',
                                barrier: 'Blazing Fast'
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
                                    <div className={classes.impactTag}>Standard: {item.barrier}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Integration Grid */}
            <section className={classes.features}>
                <div className={classes.sectionHeader}>
                    <span className={classes.statusTag}>Developer Friendly</span>
                    <h2>Scalable Integration.</h2>
                </div>
                <div className={classes.featureGrid}>
                    {[
                        { title: 'Global API Endpoint', desc: 'Secure /api/blocks endpoint ready for any frontend framework (React, Vue, Next.js).' },
                        { title: 'Dynamic Theme Sync', desc: 'Control your brand colors, fonts, and assets globally from one central dashboard.' },
                        { title: 'SQLite Core', desc: 'Enterprise data persistence with the simplicity of local file management.' },
                        { title: 'Role-Based ACL', desc: 'Granular control over who can view, edit, or delete specific content modules.' },
                        { title: 'Instant Deployment', desc: 'Built-in Vercel and Render optimization for zero-downtime infrastructure updates.' }
                    ].map((f, i) => (
                        <div key={i} className={classes.featureCard}>
                            <div className={classes.cardNumber}>0{i + 1}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Infrastructure Status */}
            <section className={classes.status}>
                <div className={classes.statusContainer}>
                    <h2>Infrastructure Roadmap</h2>
                    <div className={classes.roadmap}>
                        <div className={classes.roadmapItem + ' ' + classes.completed}>
                            <span>Core SQLite Engine</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem + ' ' + classes.completed}>
                            <span>JWT Shield</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem + ' ' + classes.completed}>
                            <span>Universal API</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem + ' ' + classes.active}>
                            <span>Partner Integration Hub</span>
                            <div className={classes.dot}></div>
                        </div>
                        <div className={classes.roadmapItem}>
                            <span>Auto-Scaling Clusters</span>
                            <div className={classes.dot}></div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={classes.pageFooter}>
                <p>"Hyper-Control: The industry-standard backbone for professional web applications."</p>
            </footer>
        </div>
    );
}

export default HyperControl;
