import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    const filteredProjects = useMemo(() => {
        return portfolioData.filter(project => {
            const matchesGroup = project.group === activeGroup;
            const matchesService = selectedService === 'all' || project.serviceId === selectedService;
            return matchesGroup && matchesService;
        });
    }, [activeGroup, selectedService, portfolioData]);

    const agencyStats = [
        { label: 'Active Partnerships', value: '7+' },
        { label: 'Managed Assets', value: '₹4.5Cr+' },
        { label: 'Growth Rating', value: '98.2%' }
    ];

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

                <h1>Growth Intelligence</h1>
                <p>Decoding performance across our ecosystem.</p>

                <div className={classes.controls}>
                    <div className={classes.groupToggle}>
                        <button
                            className={activeGroup === 'live' ? classes.activeBtn : ''}
                            onClick={() => setActiveGroup('live')}
                        >
                            Live Operations
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={classes.clientSection}
                        >
                            <div className={classes.clientHeader}>
                                <div className={classes.clientTitle}>
                                    <div className={classes.statusIndicator} style={{ backgroundColor: project.color }} />
                                    <div>
                                        <h2>{project.name}</h2>
                                        <span className={classes.serviceTag}>
                                            {servicesConfig.find(s => s.id === project.serviceId)?.label}
                                        </span>
                                    </div>
                                </div>
                                <div className={classes.projectStatus}>
                                    {project.group === 'live' && (
                                        <div className={classes.miniProgress}>
                                            <span className={classes.progressText}>{project.progress}%</span>
                                            <div className={classes.progressRail}>
                                                <div
                                                    className={classes.progressFill}
                                                    style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <span className={classes.badge} style={{ color: project.color, borderColor: project.color }}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>

                            <div className={classes.widgetRow}>
                                {project.widgets.map((widget, idx) => (
                                    <DashboardWidget
                                        key={idx}
                                        {...widget}
                                        color={project.color}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default Portfolio;
