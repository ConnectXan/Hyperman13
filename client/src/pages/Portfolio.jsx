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
        { label: 'Asset Management', value: '₹4.5Cr+' },
        { label: 'Active Partnerships', value: '12' },
        { label: 'Ecosystem Growth', value: '98.2%' }
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

                <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Growth<br />Intelligence<span>_</span>
                </motion.h1>
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
                        >
                            <div className={classes.clientHeader}>
                                <div className={classes.clientTitle}>
                                    <span className={classes.serviceTag}>
                                        {servicesConfig.find(s => s.id === project.serviceId)?.label || 'Strategy'}
                                    </span>
                                    <h2>{project.name}</h2>
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
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredProjects.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        No intelligence reports found for this sector.
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default Portfolio;
