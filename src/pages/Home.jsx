import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../components/3d/Experience';
import { servicesConfig } from '../data/servicesConfig';
import { useStore } from '../hooks/useStore';
import classes from './Home.module.css'; // We'll create this next

function Home() {
    const { setActiveServiceId, activeServiceId } = useStore();

    return (
        <>
            {/* 3D Background */}
            <Experience />

            {/* UI Overlay */}
            <div className={classes.overlay}>
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={classes.header}
                >
                    <h1>HYPER13</h1>
                    <p>The Future of Digital Agencies</p>
                </motion.header>

                <nav className={classes.serviceList}>
                    {servicesConfig.map((service) => (
                        <motion.button
                            key={service.id}
                            className={`${classes.serviceItem} ${activeServiceId === service.id ? classes.active : ''}`}
                            onMouseEnter={() => setActiveServiceId(service.id)}
                            onMouseLeave={() => setActiveServiceId(null)}
                            onClick={() => setActiveServiceId(service.id)} // For mobile
                            whileHover={{ scale: 1.05, x: 10 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={classes.serviceLabel}>{service.label}</span>
                            {activeServiceId === service.id && (
                                <motion.span
                                    className={classes.indicator}
                                    layoutId="indicator"
                                    style={{ backgroundColor: service.color }}
                                />
                            )}
                        </motion.button>
                    ))}
                </nav>

                {/* Helper text for mobile/desktop */}
                <div className={classes.instruction}>
                    Select a service to explore
                </div>
            </div>
        </>
    );
}

export default Home;
