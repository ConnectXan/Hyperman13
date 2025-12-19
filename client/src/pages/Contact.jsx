import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useContent } from '../hooks/useContent';
import { servicesConfig as staticServices } from '../data/servicesConfig';
import classes from './Contact.module.css';

function Contact() {
    const { data: servicesConfig } = useContent('services', staticServices);
    const [selectedServices, setSelectedServices] = useState([]);
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleService = (id) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ATTENTION: To receive actual emails at connectxan@gmail.com, you must:
    // 1. Sign up at https://www.emailjs.com/
    // 2. Create a "Service" and a "Template"
    // 3. Replace the 'YOUR_SERVICE_ID', etc. placeholders below with your actual keys
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.name || !formData.company) {
            setStatus('Please fill in Name, Email, and Company.');
            return;
        }

        setIsSubmitting(true);
        setStatus('Initializing secure transmission...');

        const serviceLabels = selectedServices.map(id => servicesConfig.find(s => s.id === id)?.label).join(', ');

        const templateParams = {
            from_name: formData.name,      // Use {{from_name}} in EmailJS
            from_email: formData.email,    // Use {{from_email}} in EmailJS
            to_email: 'connectxan@gmail.com', // Explicitly set the recipient
            company: formData.company,      // Use {{company}} in EmailJS
            mobile: formData.mobile,        // Use {{mobile}} in EmailJS
            services: serviceLabels,       // Use {{services}} in EmailJS
            message: `Company: ${formData.company}\nMobile: ${formData.mobile}\nServices: ${serviceLabels}`, // Use {{message}}
            details: JSON.stringify(formData, null, 2) // Use {{details}}
        };

        try {
            // STEP 1: Replace 'YOUR_SERVICE_ID' with your ID from "Email Services" tab
            // STEP 2: Replace 'YOUR_TEMPLATE_ID' with your ID from "Email Templates" tab
            // STEP 3: Ensure your EmailJS template uses the {{variables}} listed above

            const response = await emailjs.send(
                'service_bak0ywo', // TODO: Get this from "Email Services" tab
                'template_erdsg4g', // TODO: Get this from "Email Templates" tab
                templateParams,
                'ZSiybtaWFWJ3P6qTO'
            );

            console.log('SUCCESS!', response.status, response.text);
            setStatus('Project sequence initiated. We will contact you shortly.');
            setIsSubmitting(false);
            setFormData({});
            setSelectedServices([]);

        } catch (error) {
            console.error('EMAILJS ERROR:', error);
            setStatus(`Transmission failed: ${error?.text || 'Check console'}`);
            setIsSubmitting(false);
        }
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
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.inputGroup}>
                        <label>Full Name</label>
                        <input type="text" name="name" value={formData.name || ''} placeholder="e.g. Alexander Pierce" onChange={handleInputChange} className={classes.input} required />
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Business Email</label>
                        <input type="email" name="email" value={formData.email || ''} placeholder="e.g. alex@hyper13.com" onChange={handleInputChange} className={classes.input} required />
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Company</label>
                        <input type="text" name="company" value={formData.company || ''} placeholder="e.g. Hyperman13 Ltd" onChange={handleInputChange} className={classes.input} required />
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Mobile Number (Optional)</label>
                        <input type="tel" name="mobile" value={formData.mobile || '+91 '} placeholder="e.g. +91 98765 43210" onChange={handleInputChange} className={classes.input} />
                    </div>

                    {/* Dynamic Fields */}
                    <AnimatePresence>
                        {selectedServices.map(serviceId => {
                            const service = servicesConfig.find(s => s.id === serviceId);
                            if (!service || !service.formFields) return null;

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
                                                <select name={field.name} value={formData[field.name] || ''} onChange={handleInputChange} className={classes.select}>
                                                    <option value="">Select option...</option>
                                                    {field.options && field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name] || ''}
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

                    {status && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={classes.status}
                            style={{ color: status.includes('failed') ? '#ff4b4b' : '#4E77FF' }}
                        >
                            {status}
                        </motion.p>
                    )}

                    <motion.button
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className={`${classes.submitButton} ${isSubmitting ? classes.loading : ''}`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Transmitting...' : 'Launch Project'}
                    </motion.button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
