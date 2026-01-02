import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useContent } from '../hooks/useContent';
import { servicesConfig as staticServices } from '../data/servicesConfig';
import { ServiceIcon } from '../components/ui/ServiceIcons';
import classes from './Contact.module.css';

function Contact() {
    const { data: servicesConfig } = useContent('services', staticServices);
    const [selectedServices, setSelectedServices] = useState([]);
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    // Form validation
    const validateField = (name, value) => {
        const errors = { ...validationErrors };
        
        switch (name) {
            case 'name':
                if (!value || value.length < 2) {
                    errors.name = 'Name must be at least 2 characters';
                } else {
                    delete errors.name;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errors.email = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    errors.email = 'Please enter a valid email';
                } else {
                    delete errors.email;
                }
                break;
            case 'company':
                if (!value || value.length < 2) {
                    errors.company = 'Company name is required';
                } else {
                    delete errors.company;
                }
                break;
            case 'mobile':
                if (value && value.length > 0 && value.length < 10) {
                    errors.mobile = 'Please enter a valid mobile number';
                } else {
                    delete errors.mobile;
                }
                break;
            default:
                break;
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const toggleService = (id) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Real-time validation
        if (value) {
            validateField(name, value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all required fields
        const requiredFields = ['name', 'email', 'company'];
        let hasErrors = false;
        
        requiredFields.forEach(field => {
            if (!validateField(field, formData[field])) {
                hasErrors = true;
            }
        });
        
        if (hasErrors) {
            setStatus('Please fix the errors above');
            return;
        }

        if (selectedServices.length === 0) {
            setStatus('Please select at least one service');
            return;
        }

        setIsSubmitting(true);
        setStatus('Sending your message...');

        const serviceLabels = selectedServices.map(id => 
            servicesConfig.find(s => s.id === id)?.label
        ).join(', ');

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            to_email: 'connectxan@gmail.com',
            company: formData.company,
            mobile: formData.mobile || 'Not provided',
            services: serviceLabels,
            message: `Company: ${formData.company}\nMobile: ${formData.mobile || 'Not provided'}\nServices: ${serviceLabels}`,
            details: JSON.stringify(formData, null, 2)
        };

        try {
            const response = await emailjs.send(
                'service_bak0ywo',
                'template_erdsg4g',
                templateParams,
                'ZSiybtaWFWJ3P6qTO'
            );

            console.log('SUCCESS!', response.status, response.text);
            setIsSuccess(true);
            setStatus('Message sent successfully! We\'ll get back to you soon.');
            setIsSubmitting(false);
            
            // Reset form after success
            setTimeout(() => {
                setFormData({});
                setSelectedServices([]);
                setIsSuccess(false);
                setStatus('');
            }, 3000);

        } catch (error) {
            console.error('EMAILJS ERROR:', error);
            setStatus(`Failed to send message. Please try again.`);
            setIsSubmitting(false);
        }
    };

    // Clear status after 5 seconds
    useEffect(() => {
        if (status && !isSubmitting) {
            const timer = setTimeout(() => {
                if (!isSuccess) setStatus('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status, isSubmitting, isSuccess]);

    return (
        <div className={classes.container}>
            <motion.header 
                className={classes.header}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className={classes.title}>Start Your Project</h1>
                <p className={classes.subtitle}>Select services and tell us about your needs</p>
            </motion.header>

            <div className={classes.content}>
                {/* Service Selector */}
                <motion.div 
                    className={classes.servicesSection}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className={classes.sectionTitle}>Choose Services</h2>
                    <div className={classes.serviceGrid}>
                        {servicesConfig.map((service, index) => (
                            <motion.button
                                key={service.id}
                                className={`${classes.serviceCard} ${selectedServices.includes(service.id) ? classes.active : ''}`}
                                onClick={() => toggleService(service.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                                style={{ '--service-color': service.color }}
                                aria-label={`Select ${service.label} service`}
                            >
                                <div className={classes.cardHeader}>
                                    <div className={classes.serviceIconWrapper}>
                                        <ServiceIcon 
                                            serviceId={service.id} 
                                            size={24} 
                                            color={selectedServices.includes(service.id) ? service.color : 'var(--color-text-dim)'}
                                        />
                                    </div>
                                    <span className={classes.serviceName}>{service.label}</span>
                                </div>
                                <div className={classes.checkCircle}>
                                    <AnimatePresence>
                                        {selectedServices.includes(service.id) && (
                                            <motion.div 
                                                className={classes.checkInner}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div 
                    className={classes.formSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className={classes.sectionTitle}>Contact Details</h2>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <div className={classes.inputGroup}>
                            <label htmlFor="name">Full Name *</label>
                            <input 
                                id="name"
                                type="text" 
                                name="name" 
                                value={formData.name || ''} 
                                placeholder="e.g. Hyperman 13"
                                onChange={handleInputChange} 
                                className={`${classes.input} ${validationErrors.name ? classes.error : ''}`}
                                aria-describedby={validationErrors.name ? "name-error" : undefined}
                                required 
                            />
                            <AnimatePresence>
                                {validationErrors.name && (
                                    <motion.span 
                                        id="name-error"
                                        className={classes.errorMessage}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {validationErrors.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className={classes.inputGroup}>
                            <label htmlFor="email">Business Email *</label>
                            <input 
                                id="email"
                                type="email" 
                                name="email" 
                                value={formData.email || ''} 
                                placeholder="e.g. Hyperman@techstartup.com"
                                onChange={handleInputChange} 
                                className={`${classes.input} ${validationErrors.email ? classes.error : ''}`}
                                aria-describedby={validationErrors.email ? "email-error" : undefined}
                                required 
                            />
                            <AnimatePresence>
                                {validationErrors.email && (
                                    <motion.span 
                                        id="email-error"
                                        className={classes.errorMessage}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {validationErrors.email}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className={classes.inputGroup}>
                            <label htmlFor="company">Company *</label>
                            <input 
                                id="company"
                                type="text" 
                                name="company" 
                                value={formData.company || ''} 
                                placeholder="e.g. TechStartup Inc" 
                                onChange={handleInputChange} 
                                className={`${classes.input} ${validationErrors.company ? classes.error : ''}`}
                                aria-describedby={validationErrors.company ? "company-error" : undefined}
                                required 
                            />
                            <AnimatePresence>
                                {validationErrors.company && (
                                    <motion.span 
                                        id="company-error"
                                        className={classes.errorMessage}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {validationErrors.company}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className={classes.inputGroup}>
                            <label htmlFor="mobile">Mobile Number</label>
                            <input 
                                id="mobile"
                                type="tel" 
                                name="mobile" 
                                value={formData.mobile || ''} 
                                placeholder="e.g. +1 555 123 4567" 
                                onChange={handleInputChange} 
                                className={`${classes.input} ${validationErrors.mobile ? classes.error : ''}`}
                                aria-describedby={validationErrors.mobile ? "mobile-error" : undefined}
                            />
                            <AnimatePresence>
                                {validationErrors.mobile && (
                                    <motion.span 
                                        id="mobile-error"
                                        className={classes.errorMessage}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {validationErrors.mobile}
                                    </motion.span>
                                )}
                            </AnimatePresence>
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
                                                <label htmlFor={field.name}>{field.label}</label>
                                                {field.type === 'select' ? (
                                                    <select 
                                                        id={field.name}
                                                        name={field.name} 
                                                        value={formData[field.name] || ''} 
                                                        onChange={handleInputChange} 
                                                        className={classes.select}
                                                    >
                                                        <option value="">Select option...</option>
                                                        {field.options && field.options.map(opt => 
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        )}
                                                    </select>
                                                ) : (
                                                    <input
                                                        id={field.name}
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

                        {/* Status Message */}
                        <AnimatePresence>
                            {status && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`${classes.status} ${isSuccess ? classes.success : classes.error}`}
                                >
                                    {status}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={`${classes.submitButton} ${isSubmitting ? classes.loading : ''} ${isSuccess ? classes.success : ''}`}
                            type="submit"
                            disabled={isSubmitting}
                            aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                        >
                            <span className={classes.buttonText}>
                                {isSubmitting ? 'Sending...' : isSuccess ? 'Sent!' : 'Send Message'}
                            </span>
                            {isSubmitting && (
                                <div className={classes.spinner} />
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;