import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudyData as staticCaseStudies } from '../data/caseStudyData';
import { servicesConfig as staticServices } from '../data/servicesConfig';
import { MediaModal } from '../components/ui/MediaModal';
import { useContent } from '../hooks/useContent';
import classes from './CaseStudy.module.css';

function CaseStudy() {
    const { data: caseStudyData } = useContent('case-studies', staticCaseStudies);
    const { data: servicesConfig } = useContent('services', staticServices);
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedCase, setSelectedCase] = useState(null);

    const filteredCases = useMemo(() => {
        return caseStudyData.filter(item => {
            if (activeFilter === 'all') return true;
            return item.type === activeFilter;
        });
    }, [activeFilter, caseStudyData]);

    const filters = [
        { id: 'all', label: 'All Content', icon: '✦' },
        { id: 'video', label: 'YouTube', icon: '▶' },
        { id: 'social', label: 'Instagram', icon: '📸' },
        { id: 'blog', label: 'Blogs', icon: '✍' }
    ];

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={classes.eyebrow}
                >
                    Knowledge Hub
                </motion.span>
                <h1>Case Studies & Insights</h1>
                <p>Decoding the strategies that drive Indian D2C growth.</p>

                <div className={classes.filterBar}>
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`${classes.filterBtn} ${activeFilter === filter.id ? classes.activeFilter : ''} `}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            <span className={classes.fIcon}>{filter.icon}</span>
                            {filter.label}
                        </button>
                    ))}
                </div>
            </header>

            <motion.div layout className={classes.grid}>
                <AnimatePresence mode="popLayout">
                    {filteredCases.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            className={classes.card}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedCase(project)}
                        >
                            <div className={classes.mediaFrame} style={{ borderColor: project.color }}>
                                <img src={project.thumbnail} alt={project.title} className={classes.thumbnail} />
                                <div className={classes.typeBadge} style={{ backgroundColor: project.color }}>
                                    {project.type === 'video' && 'YouTube'}
                                    {project.type === 'social' && 'Instagram'}
                                    {project.type === 'blog' && 'Blog'}
                                </div>
                                <div className={classes.overlay}>
                                    <span>Expand Insight →</span>
                                </div>
                            </div>

                            <div className={classes.info}>
                                <div className={classes.meta}>
                                    <span className={classes.service}>
                                        {servicesConfig.find(s => s.id === project.serviceId)?.label}
                                    </span>
                                </div>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <MediaModal
                isOpen={!!selectedCase}
                onClose={() => setSelectedCase(null)}
                data={selectedCase}
            />
        </div>
    );
}

export default CaseStudy;
