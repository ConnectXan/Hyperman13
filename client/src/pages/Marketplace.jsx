import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import classes from './Marketplace.module.css';

function Marketplace() {
    const products = [
        {
            id: 'animnow',
            name: 'Animnow',
            description: 'Professional browser-based 2D animation studio. Powered by Hyper-Control backend infrastructure.',
            tag: 'Featured Product',
            status: 'Private Beta Coming Soon',
            path: '/marketplace/animnow',
            color: '#BB86FC'
        },
        {
            id: 'hyper-control',
            name: 'Hyper-Control',
            description: 'The backend content engine powering this agency website and Animnow. Manages all dynamic content and authentication.',
            tag: 'Internal Tool',
            status: 'Internal Use Only',
            path: '/marketplace/hyper-control',
            color: '#DAC0A3'
        }
    ];

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <span className={classes.eyebrow}>The Marketplace</span>
                <h1>In-House Products</h1>
                <p>Proprietary tools built by our creative engineering team to solve real-world problems.</p>
            </header>

            <div className={classes.grid}>
                {products.map((product) => (
                    <Link key={product.id} href={product.path}>
                        <motion.a
                            className={classes.productCard}
                            whileHover={{ y: -10 }}
                            style={{ '--accent': product.color }}
                        >
                            <div className={classes.cardStatus}>
                                <span>{product.status}</span>
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
                                <span className={classes.tag}>{product.tag}</span>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <div className={classes.cta}>
                                    Explore Product <span>→</span>
                                </div>
                            </div>
                        </motion.a>
                    </Link>
                ))}
            </div>

            <footer className={classes.footer}>
                <p>“Animnow is an in-house product built by our creative engineering team.”</p>
            </footer>
        </div>
    );
}

export default Marketplace;
