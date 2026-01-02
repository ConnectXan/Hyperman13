import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { DashboardWidget } from '../components/ui/DashboardWidget';
import { useContent } from '../hooks/useContent';
import { portfolioData as staticPortfolio } from '../data/portfolioData';
import { servicesConfig as staticServices } from '../data/servicesConfig';
import classes from './Portfolio.module.css';

function Portfolio() {
    const { data: portfolioData } = useContent('portfolio', staticPortfolio);
    const { data: servicesConfig } = useContent('services', staticServices);
    const [activeGroup, setActiveGroup] = useState('live');
    const [selectedService, setSelectedService] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [showPerformancePopup, setShowPerformancePopup] = useState(false);

    const filteredProjects = useMemo(() => {
        return portfolioData.filter(project => {
            const matchesGroup = project.group === activeGroup;
            const matchesService = selectedService === 'all' || project.serviceId === selectedService;
            return matchesGroup && matchesService;
        });
    }, [activeGroup, selectedService, portfolioData]);

    const agencyStats = [
        { label: 'Asset Management', value: '₹6.8Cr+' },
        { label: 'Active Partnerships', value: '18' },
        { label: 'Success Rate', value: '94.2%' }
    ];

    const PerformancePopup = () => (
        <motion.div
            className={classes.popupOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPerformancePopup(false)}
        >
            <motion.div
                className={classes.popupContent}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                onClick={e => e.stopPropagation()}
            >
                <div className={classes.popupHeader}>
                    <div className={classes.popupIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v4"/>
                            <path d="M12 18v4"/>
                            <path d="M4.93 4.93l2.83 2.83"/>
                            <path d="M16.24 16.24l2.83 2.83"/>
                            <path d="M2 12h4"/>
                            <path d="M18 12h4"/>
                            <path d="M4.93 19.07l2.83-2.83"/>
                            <path d="M16.24 7.76l2.83-2.83"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </div>
                    <h3>Performance Analytics</h3>
                    <button 
                        className={classes.popupClose}
                        onClick={() => setShowPerformancePopup(false)}
                    >
                        ×
                    </button>
                </div>
                
                <div className={classes.popupBody}>
                    <p>View our comprehensive performance metrics and analytics dashboard.</p>
                    <div className={classes.popupActions}>
                        <Link href="/about">
                            <button className={classes.popupPrimary}>
                                View Performance Meter
                            </button>
                        </Link>
                        <button 
                            className={classes.popupSecondary}
                            onClick={() => setShowPerformancePopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );

    const ProjectModal = ({ project, onClose }) => {
        if (!project) return null;

        return (
            <motion.div
                className={classes.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className={classes.modalContent}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                    style={{ '--project-color': project.color }}
                >
                    <div className={classes.modalHeader}>
                        <div>
                            <span className={classes.modalServiceTag}>
                                {servicesConfig.find(s => s.id === project.serviceId)?.label}
                            </span>
                            <h2>{project.name}</h2>
                            <p className={classes.modalDescription}>{project.description}</p>
                        </div>
                        <button className={classes.closeButton} onClick={onClose}>×</button>
                    </div>

                    <div className={classes.modalBody}>
                        <div className={classes.modalSection}>
                            <h3>Project Details</h3>
                            <div className={classes.projectMeta}>
                                <div className={classes.metaItem}>
                                    <span className={classes.metaLabel}>Industry</span>
                                    <span className={classes.metaValue}>{project.industry}</span>
                                </div>
                                <div className={classes.metaItem}>
                                    <span className={classes.metaLabel}>Duration</span>
                                    <span className={classes.metaValue}>{project.duration}</span>
                                </div>
                                <div className={classes.metaItem}>
                                    <span className={classes.metaLabel}>Team Size</span>
                                    <span className={classes.metaValue}>{project.teamSize} specialists</span>
                                </div>
                                <div className={classes.metaItem}>
                                    <span className={classes.metaLabel}>Status</span>
                                    <span className={classes.metaValue}>{project.status}</span>
                                </div>
                            </div>
                        </div>

                        {project.results && (
                            <div className={classes.modalSection}>
                                <h3>Results Comparison</h3>
                                <div className={classes.resultsComparison}>
                                    <div className={classes.resultColumn}>
                                        <h4>Before</h4>
                                        {Object.entries(project.results.before).map(([key, value]) => (
                                            <div key={key} className={classes.resultItem}>
                                                <span className={classes.resultLabel}>{key}</span>
                                                <span className={classes.resultValue}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={classes.resultArrow}>→</div>
                                    <div className={classes.resultColumn}>
                                        <h4>After</h4>
                                        {Object.entries(project.results.after).map(([key, value]) => (
                                            <div key={key} className={classes.resultItem}>
                                                <span className={classes.resultLabel}>{key}</span>
                                                <span className={classes.resultValue} style={{ color: project.color }}>
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {project.technologies && (
                            <div className={classes.modalSection}>
                                <h3>Technologies Used</h3>
                                <div className={classes.techStack}>
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className={classes.techTag}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.testimonial && (
                            <div className={classes.modalSection}>
                                <h3>Client Testimonial</h3>
                                <div className={classes.testimonial}>
                                    <blockquote>"{project.testimonial.quote}"</blockquote>
                                    <cite>— {project.testimonial.author}</cite>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={classes.intelBanner}
                >
                    {agencyStats.map((stat, i) => (
                        <div key={i} className={classes.statBox}>
                            <span className={classes.statLabel}>{stat.label}</span>
                            <span className={classes.statValue}>{stat.value}</span>
                        </div>
                    ))}
                </motion.div>

                <div className={classes.titleSection}>
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Growth<br />Intelligence<span>_</span>
                    </motion.h1>
                    
                    {/* Performance Meter Redirect Button */}
                    <div className={classes.performanceRedirect}>
                        <motion.button
                            className={classes.performanceButton}
                            onClick={() => setShowPerformancePopup(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className={classes.performanceIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v4"/>
                                    <path d="M12 18v4"/>
                                    <path d="M4.93 4.93l2.83 2.83"/>
                                    <path d="M16.24 16.24l2.83 2.83"/>
                                    <path d="M2 12h4"/>
                                    <path d="M18 12h4"/>
                                    <path d="M4.93 19.07l2.83-2.83"/>
                                    <path d="M16.24 7.76l2.83-2.83"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </div>
                            <span>Performance</span>
                        </motion.button>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Scaling D2C brands and tech ecosystems with industrial precision.
                    Real-time performance metrics across our active partner network.
                </motion.p>

                <div className={classes.controls}>
                    <div className={classes.groupToggle}>
                        <button
                            className={activeGroup === 'live' ? classes.activeBtn : ''}
                            onClick={() => setActiveGroup('live')}
                        >
                            Live Ops
                        </button>
                        <button
                            className={activeGroup === 'finished' ? classes.activeBtn : ''}
                            onClick={() => setActiveGroup('finished')}
                        >
                            Success Stories
                        </button>
                    </div>

                    <div className={classes.serviceFilters}>
                        <button
                            className={selectedService === 'all' ? classes.activeFilter : ''}
                            onClick={() => setSelectedService('all')}
                        >
                            All Units
                        </button>
                        {servicesConfig.map(service => (
                            <button
                                key={service.id}
                                className={selectedService === service.id ? classes.activeFilter : ''}
                                onClick={() => setSelectedService(service.id)}
                                style={{ '--service-color': service.color }}
                            >
                                {service.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <motion.div layout className={classes.clientGrid}>
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={classes.clientSection}
                            style={{ '--service-color': project.color }}
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className={classes.clientHeader}>
                                <div className={classes.clientTitle}>
                                    <div className={classes.titleRow}>
                                        <span className={classes.serviceTag}>
                                            {servicesConfig.find(s => s.id === project.serviceId)?.label || 'Strategy'}
                                        </span>
                                        <span className={classes.industryTag}>{project.industry}</span>
                                    </div>
                                    <h2>{project.name}</h2>
                                    <p className={classes.projectDescription}>{project.description}</p>
                                </div>
                                <div className={classes.projectStatus}>
                                    {project.group === 'live' && (
                                        <div className={classes.miniProgress}>
                                            <span className={classes.progressText}>{project.progress}% Optimization</span>
                                            <div className={classes.progressRail}>
                                                <motion.div
                                                    className={classes.progressFill}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${project.progress}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    style={{ backgroundColor: project.color }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <span className={classes.badge} style={{ color: project.color, borderColor: `${project.color}33` }}>
                                        {project.status}
                                    </span>
                                    <div className={classes.projectMeta}>
                                        <span className={classes.metaText}>{project.duration} • {project.teamSize} team</span>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.widgetRow}>
                                {project.widgets?.map((widget, idx) => (
                                    <DashboardWidget
                                        key={idx}
                                        {...widget}
                                        color={project.color}
                                    />
                                ))}
                                {(!project.widgets || project.widgets.length === 0) && (
                                    <div style={{ color: '#444', fontStyle: 'italic', fontSize: '0.9rem' }}>
                                        Initializing technical instrumentation...
                                    </div>
                                )}
                            </div>

                            {project.testimonial && (
                                <div className={classes.testimonialPreview}>
                                    <blockquote>"{project.testimonial.quote}"</blockquote>
                                    <cite>— {project.testimonial.author}</cite>
                                </div>
                            )}

                            <div className={classes.projectFooter}>
                                <span className={classes.viewDetails}>Click to view detailed case study →</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredProjects.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        No intelligence reports found for this sector.
                    </div>
                )}
            </motion.div>

            {/* Performance Popup */}
            <AnimatePresence>
                {showPerformancePopup && <PerformancePopup />}
            </AnimatePresence>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal 
                        project={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Portfolio;
