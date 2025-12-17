import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import classes from './Navigation.module.css';

export function Navigation() {
    const [location] = useLocation();

    const links = [
        { path: '/', label: 'Home' },
        { path: '/contact', label: 'Contact' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/case-study', label: 'Cases' }
    ];

    return (
        <nav className={classes.nav}>
            <ul className={classes.list}>
                {links.map((link) => {
                    const isActive = location === link.path;
                    return (
                        <li key={link.path}>
                            <Link href={link.path}>
                                <a className={`${classes.link} ${isActive ? classes.active : ''}`}>
                                    {link.label}
                                    {isActive && <motion.div layoutId="nav-pill" className={classes.pill} />}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
