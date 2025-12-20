import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Navigation.module.css';
import { useContent } from '../../hooks/useContent';

import { useTheme } from '../../context/ThemeContext';

export function Navigation() {
    const { data: navBlocks } = useContent('navigation');
    const [location] = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    // Hide global navigation on admin routes to prevent UI overlap
    if (location.startsWith('/admin')) {
        return null;
    }

    const staticLinks = [
        { path: '/', label: 'Home', icon: '⌂' },
        { path: '/contact', label: 'Contact', icon: '✉' },
        { path: '/portfolio', label: 'Portfolio', icon: '◈' },
        { path: '/case-study', label: 'Cases', icon: '✦' },
        { path: '/marketplace', label: 'Market', icon: '⊞' }
    ];

    // Intelligent merge: Backend items override static links if paths match,
    // or are added as new items if they are unique.
    const links = [...staticLinks];

    if (navBlocks && navBlocks[0] && Array.isArray(navBlocks[0])) {
        navBlocks[0].forEach(backendItem => {
            const existingIndex = links.findIndex(l =>
                l.path === backendItem.link || l.label.toLowerCase() === backendItem.label.toLowerCase()
            );

            if (existingIndex !== -1) {
                // Update existing
                links[existingIndex] = { ...links[existingIndex], label: backendItem.label, path: backendItem.link };
            } else {
                // Add new (if not a duplicate of a standard route logic and not one of the filtered ones)
                const isFiltered = ['services'].includes(backendItem.label.toLowerCase());
                if (!isFiltered) {
                    links.push({ path: backendItem.link, label: backendItem.label, icon: '✦' });
                }
            }
        });
    }

    const toggleMenu = () => setIsOpen(!isOpen);

    const ThemeToggle = () => (
        <button
            className={classes.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );

    return (
        <>
            {/* Global Brand Logo (Top Left) */}
            <div className={classes.logoWrapper}>
                <Link href="/">
                    <a className={classes.brandLogo}>
                        <div className={classes.logoText}>
                            Hyperman<span>13</span>
                        </div>
                    </a>
                </Link>
            </div>

            {/* Desktop Navigation (Pill) */}
            <nav className={`${classes.nav} ${classes.desktopOnly}`}>
                <ul className={classes.list}>
                    {links.map((link) => {
                        const isActive = location === link.path;
                        return (
                            <li key={link.path}>
                                <Link
                                    href={link.path}
                                    className={`${classes.link} ${isActive ? classes.active : ''}`}
                                >
                                    {link.label}
                                    {isActive && <motion.div layoutId="nav-pill" className={classes.pill} />}
                                </Link>
                            </li>
                        );
                    })}
                    <li><ThemeToggle /></li>
                </ul>
            </nav>

            {/* Mobile Bottom Navigation (Icons Only) */}
            <nav className={classes.mobileBottomNav}>
                {links.map((link) => {
                    const isActive = location === link.path;
                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`${classes.mobileIconLink} ${isActive ? classes.active : ''}`}
                        >
                            <span className={classes.navIcon}>{link.icon}</span>
                        </Link>
                    );
                })}
                <ThemeToggle />
            </nav>
        </>
    );
}

