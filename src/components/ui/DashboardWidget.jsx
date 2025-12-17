import React from 'react';
import { motion } from 'framer-motion';
import classes from './DashboardWidget.module.css';

export function DashboardWidget({ title, value, subtext, color, icon, type = 'stat' }) {
    return (
        <motion.div
            className={classes.widget}
            whileHover={{ y: -5, boxShadow: `0 10px 30px -10px ${color}40` }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ borderTop: `2px solid ${color}` }}
        >
            <div className={classes.header}>
                <h3 className={classes.title}>{title}</h3>
                {icon && <span className={classes.icon}>{icon}</span>}
            </div>

            <div className={classes.content}>
                {type === 'stat' && (
                    <div className={classes.statValue} style={{ color: color }}>{value}</div>
                )}

                {type === 'progress' && (
                    <div className={classes.progressContainer}>
                        <div className={classes.progressBar}>
                            <motion.div
                                className={classes.progressFill}
                                style={{ backgroundColor: color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: value }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>
                        <div className={classes.progressLabel}>{value} Complete</div>
                    </div>
                )}

                {/* Can extend with 'chart' type if needed */}
            </div>

            {subtext && <div className={classes.subtext}>{subtext}</div>}
        </motion.div>
    );
}
