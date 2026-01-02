import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../hooks/useContent';
import classes from './PerformanceMeter.module.css';

const defaultMetrics = {
    enabled: true,
    overallScore: 92.4,
    metrics: [
        { label: 'Client Satisfaction', value: 94.2, icon: '😊', color: '#4CAF50' },
        { label: 'Project Success', value: 91.5, icon: '🚀', color: '#2196F3' },
        { label: 'Revenue Growth', value: 23, icon: '📈', color: '#FF9800', suffix: '%' },
        { label: 'Team Efficiency', value: 89, icon: '⚡', color: '#9C27B0' }
    ]
};

export function PerformanceMeter() {
    const { data: performanceData } = useContent('performance-metrics', defaultMetrics);
    const [isHovered, setIsHovered] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    if (!performanceData?.enabled) {
        return null;
    }

    const { overallScore, metrics } = performanceData;
    
    // Calculate performance level and color
    const getPerformanceLevel = (score) => {
        if (score >= 90) return { level: 'Excellent', color: '#4CAF50', glow: '#4CAF5040' };
        if (score >= 80) return { level: 'Good', color: '#FF9800', glow: '#FF980040' };
        if (score >= 70) return { level: 'Average', color: '#FFC107', glow: '#FFC10740' };
        return { level: 'Needs Work', color: '#F44336', glow: '#F4433640' };
    };

    const performance = getPerformanceLevel(overallScore);
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (overallScore / 100) * circumference;

    return (
        <div className={classes.performanceContainer}>
            <motion.div
                className={classes.performanceOrb}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowDetails(!showDetails)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    '--performance-color': performance.color,
                    '--performance-glow': performance.glow
                }}
            >
                {/* Animated Background Ring */}
                <div className={classes.orbBackground}>
                    <svg width="100" height="100" className={classes.progressRing}>
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="var(--color-border)"
                            strokeWidth="2"
                            opacity="0.2"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={performance.color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            style={{
                                transform: 'rotate(-90deg)',
                                transformOrigin: '50% 50%',
                                filter: `drop-shadow(0 0 8px ${performance.glow})`
                            }}
                        />
                    </svg>
                </div>

                {/* Core Content */}
                <div className={classes.orbCore}>
                    <motion.div
                        className={classes.scoreValue}
                        animate={{ 
                            scale: isHovered ? 1.1 : 1,
                            color: isHovered ? performance.color : 'var(--color-text)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {overallScore}
                    </motion.div>
                    <div className={classes.scoreLabel}>Performance</div>
                </div>

                {/* Pulsing Indicator */}
                <motion.div
                    className={classes.pulseIndicator}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ backgroundColor: performance.glow }}
                />

                {/* Status Badge */}
                <motion.div
                    className={classes.statusBadge}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10
                    }}
                    style={{ backgroundColor: performance.color }}
                >
                    {performance.level}
                </motion.div>
            </motion.div>

            {/* Detailed Metrics Popup */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        className={classes.detailsPopup}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className={classes.popupHeader}>
                            <h3>Performance Breakdown</h3>
                            <button 
                                className={classes.closeButton}
                                onClick={() => setShowDetails(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className={classes.metricsGrid}>
                            {metrics.map((metric, index) => (
                                <motion.div
                                    key={metric.label}
                                    className={classes.metricItem}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className={classes.metricIcon} style={{ color: metric.color }}>
                                        {metric.icon}
                                    </div>
                                    <div className={classes.metricInfo}>
                                        <div className={classes.metricLabel}>{metric.label}</div>
                                        <div className={classes.metricValue} style={{ color: metric.color }}>
                                            {metric.value}{metric.suffix || '%'}
                                        </div>
                                    </div>
                                    <div className={classes.metricBar}>
                                        <motion.div
                                            className={classes.metricBarFill}
                                            style={{ backgroundColor: metric.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${metric.value}%` }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className={classes.popupFooter}>
                            <div className={classes.lastUpdated}>
                                Updated: {new Date().toLocaleDateString()}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}