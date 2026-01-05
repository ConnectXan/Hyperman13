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
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);

    const filteredProjects = useMemo(() => {
        return portfolioData.filter(project => {
            const matchesGroup = project.group === activeGroup;
            const matchesService = selectedService === 'all' || project.serviceId === selectedService;
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (project.industry || '').toLowerCase().includes(searchTerm.toLowerCase());
            return matchesGroup && matchesService && matchesSearch;
        });
    }, [activeGroup, selectedService, searchTerm, portfolioData]);

    const displayedProjects = useMemo(() => {
        return filteredProjects.slice(0, visibleCount);
    }, [filteredProjects, visibleCount]);

    const agencyStats = [
        { label: 'Asset Management', value: '₹6.8Cr+' },
        { label: 'Active Partnerships', value: '18' },
        { label: 'Success Rate', value: '94.2%' }
    ];



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


                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Scaling D2C brands and tech ecosystems with industrial precision.
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

                    <div className={classes.searchBar}>
                        <input
                            type="text"
                            placeholder="Search by client or industry..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className={classes.searchIcon}>🔍</span>
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
                    {displayedProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={classes.clientSection}
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ y: -5 }}
                            style={{ '--service-color': project.color }}
                        >
                            <div className={classes.cardHeader}>
                                <div className={classes.tagRow}>
                                    <span className={classes.serviceTag}>
                                        {servicesConfig.find(s => s.id === project.serviceId)?.label || 'Strategy'}
                                    </span>
                                    <span className={classes.industryTag}>{project.industry}</span>
                                </div>
                                <h2 className={classes.projectTitle}>{project.name}</h2>
                            </div>

                            <div className={classes.cardStats}>
                                {project.widgets?.slice(0, 2).map((widget, idx) => (
                                    <div key={idx} className={classes.miniStat}>
                                        <span className={classes.miniLabel}>{widget.label}</span>
                                        <span className={classes.miniValue}>{widget.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={classes.cardProgress}>
                                <div className={classes.progressHeader}>
                                    <span className={classes.statusText}>{project.status}</span>
                                    <span className={classes.pctText}>{project.progress}%</span>
                                </div>
                                <div className={classes.progressRail}>
                                    <motion.div
                                        className={classes.progressFill}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.progress}%` }}
                                        style={{ backgroundColor: project.color }}
                                    />
                                </div>
                            </div>

                            <div className={classes.cardAction}>
                                <span>Analysis Details</span>
                                <span className={classes.arrowIcon}>→</span>
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

            {filteredProjects.length > visibleCount && (
                <div className={classes.loadMoreContainer}>
                    <button
                        className={classes.loadMoreBtn}
                        onClick={() => setVisibleCount(prev => prev + 12)}
                    >
                        Load More Partners
                    </button>
                </div>
            )}

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
