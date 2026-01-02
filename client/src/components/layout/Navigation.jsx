import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Navigation.module.css';
import { useContent } from '../../hooks/useContent';
import NavigationIcon from '../ui/NavigationIcon';

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
        { path: '/', label: 'Home', icon: 'home' },
        { path: '/contact', label: 'Contact', icon: 'mail' },
        { path: '/portfolio', label: 'Portfolio', icon: 'briefcase' },
        { path: '/case-study', label: 'Cases', icon: 'file-text' },
        { path: '/about', label: 'About', icon: 'user' },
        { path: '/marketplace', label: 'Market', icon: 'grid' }
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
                    links.push({ path: backendItem.link, label: backendItem.label, icon: 'file-text' });
                }
            }
        });
    }

    const toggleMenu = () => setIsOpen(!isOpen);

    const ThemeToggle = ({ isDesktop = false }) => (
        <button
            className={classes.themeToggle}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`${isDesktop ? 'Desktop' : 'Mobile'} theme toggle clicked`);
                toggleTheme();
            }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            style={isDesktop ? {
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                width: 'auto',
                height: 'auto'
            } : {}}
        >
            <NavigationIcon name={theme === 'light' ? 'moon' : 'sun'} size={18} />
        </button>
    );

    return (
        <>
            {/* Global Brand Logo (Top Left) */}
            <div className={classes.logoWrapper}>
                <Link href="/">
                    <div className={classes.brandLogo}>
                        <div className={classes.logoText}>
                            Hyperman<span>13</span>
                        </div>
                    </div>
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
                    <li><ThemeToggle isDesktop={true} /></li>
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
                            <NavigationIcon name={link.icon} size={20} />
                        </Link>
                    );
                })}
                <ThemeToggle isDesktop={false} />
            </nav>
        </>
    );
}

