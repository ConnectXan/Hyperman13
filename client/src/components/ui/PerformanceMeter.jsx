import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../hooks/useContent';
import classes from './PerformanceMeter.module.css';

const defaultMetrics = {
    enabled: true,
    overallScore: 92.4,
    metrics: [
        { label: 'Client Satisfaction', value: 94.2, icon: 'user-check', color: '#4CAF50' },
        { label: 'Project Success', value: 91.5, icon: 'target', color: '#2196F3' },
        { label: 'Revenue Growth', value: 340, icon: 'trending-up', color: '#FF9800', suffix: '%' },
        { label: 'Team Efficiency', value: 89, icon: 'zap', color: '#9C27B0' },
        { label: 'Response Time', value: 98, icon: 'clock', color: '#00BCD4', suffix: '%' },
        { label: 'Innovation Index', value: 87, icon: 'lightbulb', color: '#795548' }
    ]
};

const Icon = ({ name, size = 20 }) => {
    const icons = {
        'user-check': (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <polyline points="16,11 18,13 22,9"/>
            </svg>
        ),
        'target': (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
            </svg>
        ),
        'trending-up': (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
                <polyline points="17,6 23,6 23,12"/>
            </svg>
        ),
        'zap': (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
            </svg>
        ),
        'clock': (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
            </svg>
        ),
        'lightbulb': (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21h6"/>
                <path d="M12 17h0"/>
                <path d="M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8"/>
                <path d="M6 9a6 6 0 0 1 6-6"/>
            </svg>
        ),
        'settings': (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m17-4a4 4 0 0 1-8 0 4 4 0 0 1 8 0zM7 12a4 4 0 0 1-8 0 4 4 0 0 1 8 0z"/>
            </svg>
        ),
        'gauge': (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4"/>
                <path d="M12 18v4"/>
                <path d="M4.93 4.93l2.83 2.83"/>
                <path d="M16.24 16.24l2.83 2.83"/>
                <path d="M2 12h4"/>
                <path d="M18 12h4"/>
                <path d="M4.93 19.07l2.83-2.83"/>
                <path d="M16.24 7.76l2.83-2.83"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        )
    };
    return icons[name] || null;
};

export function PerformanceMeter() {
    const { data: performanceData } = useContent('performance-metrics', defaultMetrics);
    const [showDetails, setShowDetails] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (showDetails) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showDetails]);

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

    return (
        <div className={classes.performanceContainer}>
            {/* Main Mechanical Gauge */}
            <motion.div
                className={classes.mechanicalGauge}
                onClick={() => setShowDetails(!showDetails)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Outer Ring with Markings */}
                <div className={classes.outerRing}>
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={classes.marking}
                            style={{
                                transform: `rotate(${i * 30}deg)`,
                                opacity: i * 8.33 <= overallScore ? 1 : 0.3
                            }}
                        />
                    ))}
                </div>

                {/* Main Gauge Body */}
                <div className={classes.gaugeBody}>
                    {/* Digital Display */}
                    <div className={classes.digitalDisplay}>
                        <div className={classes.displayValue}>
                            {overallScore.toFixed(1)}
                        </div>
                        <div className={classes.displayUnit}>%</div>
                    </div>

                    {/* Needle */}
                    <motion.div
                        className={classes.needle}
                        style={{
                            transform: `rotate(${(overallScore / 100) * 180 - 90}deg)`,
                            transformOrigin: '50% 90%'
                        }}
                        initial={{ rotate: -90 }}
                        animate={{ rotate: (overallScore / 100) * 180 - 90 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />

                    {/* Center Hub */}
                    <div className={classes.centerHub}>
                        <Icon name="gauge" size={16} />
                    </div>

                    {/* Performance Level Indicator */}
                    <div 
                        className={classes.levelIndicator}
                        style={{ backgroundColor: performance.color }}
                    >
                        {performance.level}
                    </div>
                </div>

                {/* Side Indicators */}
                <div className={classes.sideIndicators}>
                    {metrics.slice(0, 3).map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            className={classes.sideIndicator}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className={classes.indicatorIcon} style={{ color: metric.color }}>
                                <Icon name={metric.icon} size={14} />
                            </div>
                            <div className={classes.indicatorBar}>
                                <motion.div
                                    className={classes.indicatorBarFill}
                                    style={{ backgroundColor: metric.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metric.value}%` }}
                                    transition={{ duration: 1.5, delay: index * 0.3 }}
                                />
                            </div>
                            <div className={classes.indicatorValue}>
                                {metric.value}{metric.suffix || '%'}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mechanical Details */}
                <div className={classes.mechanicalDetails}>
                    <div className={classes.screw} style={{ top: '10px', left: '10px' }} />
                    <div className={classes.screw} style={{ top: '10px', right: '10px' }} />
                    <div className={classes.screw} style={{ bottom: '10px', left: '10px' }} />
                    <div className={classes.screw} style={{ bottom: '10px', right: '10px' }} />
                    
                    <div className={classes.ventGrille}>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={classes.ventLine} />
                        ))}
                    </div>
                </div>

                {/* Status LED */}
                <motion.div
                    className={classes.statusLed}
                    animate={{
                        backgroundColor: [performance.color, performance.glow, performance.color],
                        boxShadow: [`0 0 5px ${performance.color}`, `0 0 15px ${performance.color}`, `0 0 5px ${performance.color}`]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            {/* Detailed Metrics Panel */}
            <AnimatePresence>
                {showDetails && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            className={classes.backdrop}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDetails(false);
                            }}
                        />
                        
                        <motion.div
                            className={classes.detailsPanel}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={classes.panelHeader}>
                                <div className={classes.panelTitle}>
                                    <Icon name="settings" size={18} />
                                    Performance Analytics
                                </div>
                                <button 
                                    className={classes.closeButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDetails(false);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className={classes.metricsGrid}>
                                {metrics.map((metric, index) => (
                                    <motion.div
                                        key={metric.label}
                                        className={classes.metricCard}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={classes.metricHeader}>
                                            <div className={classes.metricIcon} style={{ color: metric.color }}>
                                                <Icon name={metric.icon} size={20} />
                                            </div>
                                            <div className={classes.metricInfo}>
                                                <div className={classes.metricLabel}>{metric.label}</div>
                                                <div className={classes.metricValue} style={{ color: metric.color }}>
                                                    {metric.value}{metric.suffix || '%'}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className={classes.metricProgress}>
                                            <motion.div
                                                className={classes.progressBar}
                                                style={{ backgroundColor: metric.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(metric.value, 100)}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className={classes.panelFooter}>
                                <div className={classes.systemStatus}>
                                    <div className={classes.statusIndicator} style={{ backgroundColor: performance.color }} />
                                    System Status: {performance.level}
                                </div>
                                <div className={classes.lastUpdated}>
                                    Last Updated: {new Date().toLocaleString()}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}