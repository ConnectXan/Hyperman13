import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import classes from './AboutUs.module.css';

function AboutUs() {
    const { data: aboutContent } = useContent('about-us', {
        hero: {
            badge: 'Digital Marketing Excellence',
            headline: 'Transforming Ideas Into Digital Success',
            subtitle: 'We are Hyperman13 - a modern digital marketing agency that combines cutting-edge technology with strategic creativity to deliver exceptional results for forward-thinking businesses.',
            description: 'Founded on the principle that great marketing requires both art and science, we leverage data-driven insights and innovative technologies to create campaigns that not only look stunning but drive measurable growth.'
        },
        approach: [
            {
                title: 'Data-Driven Strategy',
                description: 'Every campaign begins with deep analytics and market research to ensure maximum ROI and targeted reach.',
                icon: '📊'
            },
            {
                title: 'Creative Innovation',
                description: 'We blend artistic vision with technical precision to create memorable brand experiences that resonate.',
                icon: '🎨'
            },
            {
                title: 'Technology Integration',
                description: 'Leveraging cutting-edge tools and platforms to automate, optimize, and scale your marketing efforts.',
                icon: '⚡'
            },
            {
                title: 'Results Focus',
                description: 'Measurable outcomes drive everything we do. We track, analyze, and optimize for continuous improvement.',
                icon: '🎯'
            }
        ],
        story: {
            title: 'Our Story',
            content: 'Hyperman13 was born from a vision to bridge the gap between traditional marketing and the digital future. As a founder-led agency, we understand the challenges modern businesses face in an increasingly complex digital landscape.',
            milestones: [
                { year: '2024', event: 'Agency Founded', description: 'Launched with a mission to revolutionize digital marketing' },
                { year: '2024', event: 'First Major Campaign', description: 'Delivered exceptional results for early clients' },
                { year: '2024', event: 'Technology Stack', description: 'Developed proprietary tools and processes' }
            ]
        },
        capabilities: [
            'Advanced Analytics & Attribution',
            'Multi-Platform Campaign Management',
            'Creative Content Production',
            'Marketing Automation',
            'Performance Optimization',
            'Brand Strategy & Development'
        ],
        showTeam: true,
        team: [
            {
                name: 'Founder & CEO',
                role: 'Strategic Director',
                bio: 'Visionary leader with expertise in digital strategy, technology integration, and business growth. Passionate about creating marketing solutions that drive real results.',
                image: '/placeholder-team.svg',
                linkedin: '#'
            }
        ]
    });

    const [activeApproach, setActiveApproach] = useState(0);

    const hero = aboutContent?.hero || {};
    const approach = aboutContent?.approach || [];
    const story = aboutContent?.story || {};
    const capabilities = aboutContent?.capabilities || [];
    const team = aboutContent?.team || [];
    const showTeam = aboutContent?.showTeam || false;

    return (
        <div className={classes.container}>
            {/* Hero Section */}
            <section className={classes.hero}>
                <div className={classes.heroContent}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={classes.badge}
                    >
                        {hero.badge}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {hero.headline} <span className={classes.cursor}>_</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={classes.subtitle}
                    >
                        {hero.subtitle}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={classes.description}
                    >
                        {hero.description}
                    </motion.p>
                </div>
            </section>

            {/* Our Approach Section */}
            <section className={classes.approach}>
                <div className={classes.sectionContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={classes.sectionHeader}
                    >
                        <span className={classes.label}>Our Methodology</span>
                        <h2>Strategic <span>Approach</span></h2>
                        <p>We combine proven methodologies with innovative thinking to deliver exceptional results.</p>
                    </motion.div>

                    <div className={classes.approachGrid}>
                        {approach.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`${classes.approachCard} ${activeApproach === idx ? classes.active : ''}`}
                                onMouseEnter={() => setActiveApproach(idx)}
                            >
                                <div className={classes.cardIcon}>{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <div className={classes.cardNumber}>0{idx + 1}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Story Section */}
            <section className={classes.story}>
                <div className={classes.sectionContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={classes.storyHeader}
                    >
                        <h2>{story.title}</h2>
                        <p className={classes.storyContent}>{story.content}</p>
                    </motion.div>

                    <div className={classes.timeline}>
                        {story.milestones?.map((milestone, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className={classes.timelineItem}
                            >
                                <div className={classes.timelineYear}>{milestone.year}</div>
                                <div className={classes.timelineContent}>
                                    <h4>{milestone.event}</h4>
                                    <p>{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section className={classes.capabilities}>
                <div className={classes.sectionContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={classes.sectionHeader}
                    >
                        <span className={classes.label}>Core Expertise</span>
                        <h2>What We <span>Deliver</span></h2>
                    </motion.div>

                    <div className={classes.capabilitiesGrid}>
                        {capabilities.map((capability, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className={classes.capabilityItem}
                            >
                                {capability}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section (Conditional) */}
            {showTeam && team.length > 0 && (
                <section className={classes.team}>
                    <div className={classes.sectionContent}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={classes.sectionHeader}
                        >
                            <span className={classes.label}>Leadership</span>
                            <h2>Meet The <span>Team</span></h2>
                        </motion.div>

                        <div className={classes.teamGrid}>
                            {team.map((member, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className={classes.teamCard}
                                >
                                    <div className={classes.memberImage}>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            onError={(e) => {
                                                e.target.src = '/placeholder-team.svg';
                                            }}
                                        />
                                    </div>
                                    <div className={classes.memberInfo}>
                                        <h3>{member.name}</h3>
                                        <div className={classes.memberRole}>{member.role}</div>
                                        <p>{member.bio}</p>
                                        {member.linkedin && (
                                            <a href={member.linkedin} className={classes.socialLink}>
                                                LinkedIn →
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className={classes.cta}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={classes.ctaContent}
                >
                    <h2>Ready to Transform Your Digital Presence?</h2>
                    <p>Let's discuss how we can help accelerate your business growth through strategic digital marketing.</p>
                    <div className={classes.ctaActions}>
                        <a href="/contact" className={classes.primaryCTA}>Start Your Project</a>
                        <a href="/portfolio" className={classes.secondaryCTA}>View Our Work</a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

export default AboutUs;