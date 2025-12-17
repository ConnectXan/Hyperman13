import React from 'react';
import { motion } from 'framer-motion';
import classes from './CaseStudy.module.css';

function CaseStudy() {
    const cases = [
        {
            id: 1,
            title: 'Future Synth',
            type: 'Brand & Web',
            mediaType: 'video',
            description: 'A complete rebrand for the leading synth-wave label.',
            color: '#ff0055'
        },
        {
            id: 2,
            title: 'EcoDrone',
            type: 'Product Design',
            mediaType: 'image',
            description: 'Designing the controller interface for next-gen agriculture drones.',
            color: '#00f0ff'
        },
        {
            id: 3,
            title: 'MetaVerse Fashion',
            type: 'Social Ads',
            mediaType: 'stat',
            stat: '+400% ROI',
            description: 'Scaling a digital fashion brand from zero to hero.',
            color: '#7000ff'
        }
    ];

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <h1>Selected Works</h1>
                <p>Deep dives into our most impactful projects.</p>
            </header>

            <div className={classes.grid}>
                {cases.map((project, i) => (
                    <motion.div
                        key={project.id}
                        className={classes.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                    >
                        <div className={classes.mediaFrame} style={{ borderColor: project.color }}>
                            {project.mediaType === 'video' && (
                                <div className={classes.placeholderMedia}>
                                    <span>▶ Play Reel</span>
                                </div>
                            )}
                            {project.mediaType === 'image' && (
                                <div className={classes.placeholderMedia}>
                                    <span>📷 Project Stills</span>
                                </div>
                            )}
                            {project.mediaType === 'stat' && (
                                <div className={classes.placeholderMedia} style={{ background: project.color }}>
                                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{project.stat}</span>
                                </div>
                            )}
                        </div>

                        <div className={classes.info}>
                            <span className={classes.type}>{project.type}</span>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <button className={classes.linkBtn}>View Case Study →</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default CaseStudy;
