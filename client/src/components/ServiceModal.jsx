import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ServiceIcon } from './ui/ServiceIcons';
import classes from './ServiceModal.module.css';

function ServiceModal({ service, onClose }) {
    if (!service || !service.modalInfo) return null;

    return (
        <AnimatePresence>
            <motion.div
                className={classes.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className={classes.modal}
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ '--service-color': service.color }}
                >
                    <button className={classes.closeBtn} onClick={onClose}>✕</button>

                    <div className={classes.modalHeader}>
                        <div className={classes.titleSection}>
                            <ServiceIcon 
                                serviceId={service.id}
                                size={32}
                                color={service.color}
                                className={classes.modalIcon}
                            />
                            <h2>{service.modalInfo.title}</h2>
                        </div>
                        <p className={classes.description}>{service.modalInfo.description}</p>
                    </div>

                    <div className={classes.modalBody}>
                        <div className={classes.section}>
                            <h3>Key Features</h3>
                            <ul className={classes.featureList}>
                                {service.modalInfo.features.map((feature, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <span className={classes.checkmark}>✓</span>
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className={classes.section}>
                            <h3>Deliverables</h3>
                            <p className={classes.deliverables}>{service.modalInfo.deliverables}</p>
                        </div>

                        {service.metrics && (
                            <div className={classes.metrics}>
                                {Object.entries(service.metrics).map(([key, value]) => (
                                    <div key={key} className={classes.metric}>
                                        <span className={classes.metricValue}>{value}</span>
                                        <span className={classes.metricLabel}>{key.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={classes.modalFooter}>
                        <Link href="/contact" className={classes.ctaButton}>
                            Get Started →
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ServiceModal;
