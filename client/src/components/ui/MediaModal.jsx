import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './MediaModal.module.css';

export function MediaModal({ isOpen, onClose, data }) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={classes.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={classes.content}
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={classes.closeBtn} onClick={onClose}>×</button>

                        <div className={classes.header}>
                            <div className={classes.headerContent}>
                                <span className={classes.eyebrow} style={{ color: data.color }}>
                                    {data.type === 'video' && 'Video Case Study'}
                                    {data.type === 'social' && 'Social Campaign'}
                                    {data.type === 'blog' && 'In-Depth Analysis'}
                                </span>
                                <h1>{data.title}</h1>
                                <p>{data.description}</p>
                                
                                <div className={classes.headerMeta}>
                                    <div className={classes.metaItem}>
                                        <span className={classes.metaLabel}>Industry</span>
                                        <span className={classes.metaValue}>{data.industry}</span>
                                    </div>
                                    <div className={classes.metaItem}>
                                        <span className={classes.metaLabel}>Duration</span>
                                        <span className={classes.metaValue}>{data.duration}</span>
                                    </div>
                                    {data.featured && (
                                        <div className={classes.featuredBadge}>
                                            ⭐ Featured Case
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={classes.mediaContainer}>
                            {data.type === 'video' && (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={data.content.url}
                                    title={data.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}
                            {data.type === 'social' && (
                                <div className={classes.socialPlaceholder}>
                                    <div className={classes.socialIcon}>📱</div>
                                    <h3>Social Media Campaign</h3>
                                    <p>This campaign showcases our social media expertise and engagement strategies.</p>
                                    <a 
                                        href={data.content.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={classes.socialLink}
                                        style={{ backgroundColor: data.color }}
                                    >
                                        View Campaign →
                                    </a>
                                </div>
                            )}
                            {data.type === 'blog' && (
                                <div className={classes.blogScroll}>
                                    <div className={classes.blogContent}>
                                        <pre className={classes.fullText}>{data.content.fullText}</pre>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={classes.footer}>
                            <div className={classes.footerGrid}>
                                {/* Challenge, Solution, Results */}
                                <div className={classes.insights}>
                                    <div className={classes.insightCard}>
                                        <h4>🎯 Challenge</h4>
                                        <p>{data.content.challenge}</p>
                                    </div>
                                    <div className={classes.insightCard}>
                                        <h4>💡 Solution</h4>
                                        <p>{data.content.solution}</p>
                                    </div>
                                    <div className={classes.insightCard}>
                                        <h4>📈 Results</h4>
                                        <p>{data.content.results}</p>
                                    </div>
                                </div>

                                {/* Metrics */}
                                {data.metrics && (
                                    <div className={classes.metricsSection}>
                                        <h4>Key Metrics</h4>
                                        <div className={classes.metricsGrid}>
                                            {Object.entries(data.metrics).map(([key, value]) => (
                                                <div key={key} className={classes.metricCard}>
                                                    <span className={classes.metricValue} style={{ color: data.color }}>
                                                        {value}
                                                    </span>
                                                    <span className={classes.metricLabel}>
                                                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Client Testimonial */}
                                {data.client && (
                                    <div className={classes.testimonial}>
                                        <h4>Client Testimonial</h4>
                                        <div className={classes.testimonialCard}>
                                            <blockquote>"{data.client.testimonial}"</blockquote>
                                            <div className={classes.clientInfo}>
                                                <img 
                                                    src={data.client.avatar} 
                                                    alt={data.client.name}
                                                    className={classes.clientAvatar}
                                                />
                                                <span className={classes.clientName}>{data.client.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {data.tags && (
                                    <div className={classes.tagsSection}>
                                        <h4>Tags</h4>
                                        <div className={classes.tagsList}>
                                            {data.tags.map(tag => (
                                                <span 
                                                    key={tag} 
                                                    className={classes.tag}
                                                    style={{ borderColor: data.color, color: data.color }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
