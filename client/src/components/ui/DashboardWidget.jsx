import React from 'react';
import { motion } from 'framer-motion';
import classes from './DashboardWidget.module.css';

export function DashboardWidget({ title, value, subtext, color, icon, type = 'stat' }) {
    return (
        <motion.div
            className={classes.widget}
            whileHover={{
                y: -5,
                boxShadow: `0 20px 40px -15px ${color}30`,
                borderColor: color
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                '--accent-color': color,
                borderTop: `2px solid ${color}`
            }}
        >
            <div className={classes.header}>
                <h3 className={classes.title}>{title}</h3>
                {icon && <span className={classes.icon}>{icon}</span>}
            </div>

            <div className={classes.content}>
                {type === 'stat' && (
                    <div className={classes.statValue} style={{ color: color }}>
                        {value}
                    </div>
                )}

                {type === 'progress' && (
                    <div className={classes.progressContainer}>
                        <div className={classes.progressBar}>
                            <motion.div
                                className={classes.progressFill}
                                style={{
                                    backgroundColor: color,
                                    boxShadow: `0 0 15px ${color}80`
                                }}
                                initial={{ width: 0 }}
                                whileInView={{ width: value }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>
                        <div className={classes.progressLabel}>{value} Complete</div>
                    </div>
                )}
            </div>

            {subtext && (
                <div className={classes.subtext}>
                    {subtext.toLowerCase().includes('live') && (
                        <span className={classes.pulseDot} style={{ backgroundColor: color }} />
                    )}
                    {subtext}
                </div>
            )}
        </motion.div>
    );
}
