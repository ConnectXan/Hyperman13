import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesConfig } from '../data/servicesConfig';
import classes from './Contact.module.css';

function Contact() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [formData, setFormData] = useState({});

    const toggleService = (id) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <h1 className={classes.title}>Start Your Project</h1>
                <p className={classes.subtitle}>Select services to configure your plan.</p>
            </header>

            <div className={classes.content}>
                {/* Service Selector */}
                <div className={classes.serviceGrid}>
                    {servicesConfig.map(service => (
                        <motion.button
                            key={service.id}
                            className={`${classes.serviceCard} ${selectedServices.includes(service.id) ? classes.active : ''}`}
                            onClick={() => toggleService(service.id)}
                            whileHover={{ scale: 1.02, borderColor: service.color }}
                            whileTap={{ scale: 0.98 }}
                            style={{ '--service-color': service.color }}
                        >
                            <div className={classes.cardHeader}>
                                <span className={classes.checkCircle}>
                                    {selectedServices.includes(service.id) && <motion.div layoutId="check" className={classes.checkInner} />}
                                </span>
                                <span className={classes.serviceName}>{service.label}</span>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Dynamic Form */}
                <form className={classes.form}>
                    <div className={classes.inputGroup}>
                        <label>Name</label>
                        <input type="text" name="name" placeholder="John Doe" onChange={handleInputChange} className={classes.input} />
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="john@company.com" onChange={handleInputChange} className={classes.input} />
                    </div>

                    {/* Dynamic Fields */}
                    <AnimatePresence>
                        {selectedServices.map(serviceId => {
                            const service = servicesConfig.find(s => s.id === serviceId);
                            if (!service.formFields) return null;

                            return (
                                <motion.div
                                    key={serviceId}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={classes.dynamicSection}
                                    style={{ borderLeft: `3px solid ${service.color}` }}
                                >
                                    <h4 style={{ color: service.color }}>{service.label} Details</h4>
                                    {service.formFields.map(field => (
                                        <div key={field.name} className={classes.inputGroup}>
                                            <label>{field.label}</label>
                                            {field.type === 'select' ? (
                                                <select name={field.name} onChange={handleInputChange} className={classes.select}>
                                                    <option value="">Select option...</option>
                                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    placeholder={field.placeholder || ''}
                                                    onChange={handleInputChange}
                                                    className={classes.input}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={classes.submitButton}
                        type="button"
                    >
                        Launch Project
                    </motion.button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
