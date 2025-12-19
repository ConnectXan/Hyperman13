import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../components/3d/Experience';
import { useContent } from '../hooks/useContent';
import { servicesConfig as staticServices } from '../data/servicesConfig';
import { useStore } from '../hooks/useStore';
import ServiceModal from '../components/ServiceModal';
import classes from './Home.module.css';

function Home() {
    const { data: servicesConfig } = useContent('services', staticServices);
    const { data: caseStudies } = useContent('case-studies', []);
    const { setActiveServiceId, activeServiceId } = useStore();
    const [selectedService, setSelectedService] = useState(null);

    return (
        <>
            {/* 3D Background */}
            <Experience />

            {/* UI Overlay */}
            <div className={classes.overlay}>
                <motion.header
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={classes.header}
                >
                    <p className={classes.mainTagline}>High-Performance Systems for the Digital Era</p>
                </motion.header>

                <nav className={classes.serviceList}>
                    {servicesConfig.map((service, i) => (
                        <motion.button
                            key={service.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className={`${classes.serviceItem} ${activeServiceId === service.id ? classes.active : ''}`}
                            style={{
                                color: activeServiceId === service.id ? service.color : 'var(--color-text-dim)'
                            }}
                            onMouseEnter={() => setActiveServiceId(service.id)}
                            onMouseLeave={() => setActiveServiceId(null)}
                            onClick={() => setSelectedService(service)}
                            whileTap={{ scale: 0.98 }}
                        >
                            {service.label}
                            {activeServiceId === service.id && (
                                <motion.span
                                    layoutId="menu-indicator"
                                    className={classes.indicator}
                                    style={{ backgroundColor: service.color }}
                                />
                            )}
                        </motion.button>
                    ))}
                </nav>

                <div className={classes.instruction}>
                    Interact with the core to explore services
                </div>
            </div>

            {/* Service Info Modal */}
            {selectedService && (
                <ServiceModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </>
    );
}

export default Home;
