import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import classes from './Marketplace.module.css';

function Marketplace() {
    const [activeFilter, setActiveFilter] = useState('all');

    const products = [
        {
            id: 'animnow',
            name: 'Animnow',
            description: 'Professional browser-based 2D animation studio with advanced timeline controls and export capabilities.',
            category: 'Creative Tools',
            status: 'Alpha Development',
            progress: 75,
            features: ['Timeline Animation', 'Vector Graphics', 'Export Engine', 'Cloud Sync'],
            techStack: ['React', 'Canvas API', 'WebGL', 'Node.js'],
            path: '/marketplace/animnow',
            color: '#BB86FC',
            estimatedLaunch: 'Q2 2025'
        },
        {
            id: 'hyper-control',
            name: 'Hyper-Control',
            description: 'Headless CMS and backend infrastructure powering dynamic content management and authentication systems.',
            category: 'Backend Tools',
            status: 'Beta Testing',
            progress: 90,
            features: ['Content Management', 'User Authentication', 'API Gateway', 'Real-time Updates'],
            techStack: ['Node.js', 'SQLite', 'Express', 'JWT'],
            path: '/marketplace/hyper-control',
            color: '#DAC0A3',
            estimatedLaunch: 'Q1 2025'
        },
        {
            id: 'ai-content-engine',
            name: 'AI Content Engine',
            description: 'Intelligent content generation system for marketing campaigns with brand voice consistency.',
            category: 'AI Tools',
            status: 'Concept Phase',
            progress: 25,
            features: ['Brand Voice Training', 'Multi-format Output', 'Campaign Integration', 'Performance Analytics'],
            techStack: ['Python', 'OpenAI API', 'TensorFlow', 'FastAPI'],
            path: '/marketplace/ai-content-engine',
            color: '#4CAF50',
            estimatedLaunch: 'Q3 2025'
        }
    ];

    const categories = ['all', 'Creative Tools', 'Backend Tools', 'AI Tools'];
    
    const filteredProducts = activeFilter === 'all' 
        ? products 
        : products.filter(product => product.category === activeFilter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Beta Testing': return '#4CAF50';
            case 'Alpha Development': return '#FF9800';
            case 'Concept Phase': return '#9C27B0';
            default: return '#757575';
        }
    };

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <motion.span 
                    className={classes.eyebrow}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Development Marketplace
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    In-House Productions
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Explore our internal development projects and tools being built by the Hyperman13 engineering team. 
                    These products will be available on a subscription basis once development is complete.
                </motion.p>
            </header>

            {/* Filter Tabs */}
            <motion.div 
                className={classes.filterTabs}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`${classes.filterTab} ${activeFilter === category ? classes.active : ''}`}
                        onClick={() => setActiveFilter(category)}
                    >
                        {category === 'all' ? 'All Projects' : category}
                    </button>
                ))}
            </motion.div>

            <motion.div 
                className={classes.grid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {filteredProducts.map((product, index) => (
                    <Link key={product.id} href={product.path}>
                        <motion.a
                            className={classes.productCard}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ y: -10 }}
                            style={{ '--accent': product.color }}
                        >
                            <div className={classes.cardHeader}>
                                <div className={classes.cardStatus}>
                                    <span 
                                        className={classes.statusDot}
                                        style={{ backgroundColor: getStatusColor(product.status) }}
                                    />
                                    <span>{product.status}</span>
                                </div>
                                <div className={classes.category}>{product.category}</div>
                            </div>

                            <div className={classes.cardContent}>
                                {product.id === 'animnow' && (
                                    <div className={classes.iconWrapper}>
                                        <svg className={classes.productIcon} viewBox="0 0 200 200" fill="none">
                                            <circle cx="100" cy="100" r="90" fill="url(#animnowGradient)" />
                                            <path d="M75 100L120 75V125L75 100Z" fill="white" />
                                            <path d="M135 85Q145 90 145 100Q145 110 135 115" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
                                            <path d="M155 75Q170 85 170 100Q170 115 155 125" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
                                            <defs>
                                                <linearGradient id="animnowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#BB86FC" />
                                                    <stop offset="100%" stopColor="#9965f4" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                )}
                                {product.id === 'hyper-control' && (
                                    <div className={classes.iconWrapper}>
                                        <svg className={classes.productIcon} viewBox="0 0 200 200" fill="none">
                                            <circle cx="100" cy="100" r="90" fill="url(#hyperGradient)" />
                                            <rect x="65" y="70" width="70" height="15" rx="3" fill="white" />
                                            <rect x="65" y="92" width="70" height="15" rx="3" fill="white" opacity="0.8" />
                                            <rect x="65" y="114" width="70" height="15" rx="3" fill="white" opacity="0.6" />
                                            <circle cx="55" cy="77" r="3" fill="white" />
                                            <circle cx="55" cy="99" r="3" fill="white" opacity="0.8" />
                                            <circle cx="55" cy="121" r="3" fill="white" opacity="0.6" />
                                            <defs>
                                                <linearGradient id="hyperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#DAC0A3" />
                                                    <stop offset="100%" stopColor="#C8A17E" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                )}
                                {product.id === 'ai-content-engine' && (
                                    <div className={classes.iconWrapper}>
                                        <svg className={classes.productIcon} viewBox="0 0 200 200" fill="none">
                                            <circle cx="100" cy="100" r="90" fill="url(#aiGradient)" />
                                            <path d="M70 80h60v8H70z" fill="white" />
                                            <path d="M70 96h45v8H70z" fill="white" opacity="0.8" />
                                            <path d="M70 112h55v8H70z" fill="white" opacity="0.6" />
                                            <circle cx="150" cy="84" r="8" fill="white" />
                                            <circle cx="140" cy="100" r="6" fill="white" opacity="0.8" />
                                            <circle cx="145" cy="116" r="7" fill="white" opacity="0.6" />
                                            <defs>
                                                <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#4CAF50" />
                                                    <stop offset="100%" stopColor="#388E3C" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                )}

                                <h2>{product.name}</h2>
                                <p>{product.description}</p>

                                {/* Progress Bar */}
                                <div className={classes.progressSection}>
                                    <div className={classes.progressHeader}>
                                        <span>Development Progress</span>
                                        <span>{product.progress}%</span>
                                    </div>
                                    <div className={classes.progressBar}>
                                        <motion.div
                                            className={classes.progressFill}
                                            style={{ backgroundColor: product.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${product.progress}%` }}
                                            transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                                        />
                                    </div>
                                </div>

                                {/* Features */}
                                <div className={classes.features}>
                                    <h4>Key Features</h4>
                                    <div className={classes.featureList}>
                                        {product.features.map((feature, idx) => (
                                            <span key={idx} className={classes.featureTag}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className={classes.techStack}>
                                    <h4>Technology Stack</h4>
                                    <div className={classes.techList}>
                                        {product.techStack.map((tech, idx) => (
                                            <span key={idx} className={classes.techTag}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={classes.cardFooter}>
                                    <div className={classes.estimatedLaunch}>
                                        <span>Est. Launch: {product.estimatedLaunch}</span>
                                    </div>
                                    <div className={classes.cta}>
                                        View Development <span>→</span>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    </Link>
                ))}
            </motion.div>

            <motion.footer 
                className={classes.footer}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className={classes.footerContent}>
                    <h3>Development Philosophy</h3>
                    <p>
                        "We build tools that solve real problems we face in our agency work. Each product starts as an internal solution 
                        and evolves into a comprehensive platform. Our development process is transparent, iterative, and driven by 
                        actual use cases from our client projects."
                    </p>
                    <div className={classes.footerNote}>
                        <strong>Note:</strong> All products are currently in development and will be available via subscription model upon completion.
                    </div>
                </div>
            </motion.footer>
        </div>
    );
}

export default Marketplace;