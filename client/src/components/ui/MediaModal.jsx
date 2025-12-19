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
                                    <h3>Instagram Content</h3>
                                    <p>Embedded post would appear here.</p>
                                    <a href={data.content.url} target="_blank" rel="noopener noreferrer" style={{ color: data.color }}>
                                        View Post on Instagram →
                                    </a>
                                </div>
                            )}
                            {data.type === 'blog' && (
                                <div className={classes.blogScroll}>
                                    <div className={classes.blogHeader} style={{ background: data.color + '20' }}>
                                        <span className={classes.tag} style={{ backgroundColor: data.color }}>Case Study</span>
                                        <h1>{data.title}</h1>
                                    </div>
                                    <div className={classes.blogBody}>
                                        <pre className={classes.fullText}>{data.content.fullText}</pre>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={classes.footer}>
                            <h2>{data.title}</h2>
                            <p>{data.content.summary}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
