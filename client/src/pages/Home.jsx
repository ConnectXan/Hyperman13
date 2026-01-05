import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import { servicesConfig as staticServices } from '../data/servicesConfig';
import { useStore } from '../hooks/useStore';
import ServiceModal from '../components/ServiceModal';
import { ServiceIcon } from '../components/ui/ServiceIcons';
import NeuralCore from '../components/three/NeuralCore';
import classes from './Home.module.css';

function Home() {
    const { data: servicesConfig } = useContent('services', staticServices);
    const { setActiveServiceId, activeServiceId } = useStore();
    const [selectedService, setSelectedService] = useState(null);

    return (
        <>
            {/* Plain Background */}
            <div className={classes.plainBackground} />

            {/* 3D Particle System */}
            <NeuralCore />

            {/* UI Overlay */}
            <div className={classes.overlay}>
                <motion.header
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={classes.header}
                >
                    <p className={classes.mainTagline}>Accelerating Business Growth through Strategic Marketing</p>
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
                            <div className={classes.serviceContent}>
                                <ServiceIcon
                                    serviceId={service.id}
                                    size={20}
                                    color={activeServiceId === service.id ? service.color : 'var(--color-text-dim)'}
                                    className={classes.serviceIcon}
                                />
                                <span className={classes.serviceLabel}>{service.label}</span>
                            </div>
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
                    Discover Your Growth Potential
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
