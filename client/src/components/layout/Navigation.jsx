import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import classes from './Navigation.module.css';
import { useContent } from '../../hooks/useContent';
import NavigationIcon from '../ui/NavigationIcon';
import { useTheme } from '../../context/ThemeContext';

export function Navigation() {
    const { data: navBlocks } = useContent('navigation');
    const [location] = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Scroll handler for hide/show nav
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Only toggle if we've scrolled a bit to avoid jitter at top
            if (Math.abs(currentScrollY - lastScrollY) > 10) {
                if (currentScrollY > lastScrollY && currentScrollY > 50) {
                    setHidden(true); // Scroll Down -> Hide
                } else {
                    setHidden(false); // Scroll Up -> Show
                }
                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

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

    const links = [...staticLinks];

    if (navBlocks && navBlocks[0] && Array.isArray(navBlocks[0])) {
        navBlocks[0].forEach(backendItem => {
            const existingIndex = links.findIndex(l =>
                l.path === backendItem.link || l.label.toLowerCase() === backendItem.label.toLowerCase()
            );

            if (existingIndex !== -1) {
                links[existingIndex] = { ...links[existingIndex], label: backendItem.label, path: backendItem.link };
            } else {
                const isFiltered = ['services'].includes(backendItem.label.toLowerCase());
                if (!isFiltered) {
                    links.push({ path: backendItem.link, label: backendItem.label, icon: 'file-text' });
                }
            }
        });
    }

    return (
        <>
            {/* Global Brand Logo (Top Left) */}
            <div className={classes.logoWrapper}>
                <Link href="/" className={classes.brandLogo}>
                    <div className={classes.logoText}>
                        Hyperman<span>13</span>
                    </div>
                </Link>
            </div>

            {/* Desktop Navigation (Pill) */}
            <nav className={`${classes.nav} ${classes.desktopOnly} ${hidden ? classes.hidden : ''}`}>
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
                    <li>
                        <button
                            className={classes.themeToggle}
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            <NavigationIcon name={theme === 'light' ? 'moon' : 'sun'} size={18} />
                        </button>
                    </li>
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
                <button
                    className={classes.themeToggle}
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    <NavigationIcon name={theme === 'light' ? 'moon' : 'sun'} size={18} />
                </button>
            </nav>
        </>
    );
}

