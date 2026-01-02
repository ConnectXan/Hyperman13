import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudyData as staticCaseStudies } from '../data/caseStudyData';
import { servicesConfig as staticServices } from '../data/servicesConfig';
import { MediaModal } from '../components/ui/MediaModal';
import { useContent } from '../hooks/useContent';
import classes from './CaseStudy.module.css';

function CaseStudy() {
    const { data: caseStudyData } = useContent('case-studies', staticCaseStudies);
    const { data: servicesConfig } = useContent('services', staticServices);
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedCase, setSelectedCase] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    const filteredAndSortedCases = useMemo(() => {
        let filtered = caseStudyData.filter(item => {
            // Filter by type
            const typeMatch = activeFilter === 'all' || item.type === activeFilter;
            
            // Filter by search query
            const searchMatch = searchQuery === '' || 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                item.industry?.toLowerCase().includes(searchQuery.toLowerCase());
            
            return typeMatch && searchMatch;
        });

        // Sort results
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'featured':
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return 0;
                case 'industry':
                    return (a.industry || '').localeCompare(b.industry || '');
                case 'duration':
                    return (a.duration || '').localeCompare(b.duration || '');
                default:
                    return 0;
            }
        });

        return filtered;
    }, [activeFilter, caseStudyData, searchQuery, sortBy]);

    const filters = [
        { id: 'all', label: 'All Content', icon: '✦' },
        { id: 'video', label: 'Video Case Studies', icon: '▶' },
        { id: 'social', label: 'Social Campaigns', icon: '📱' },
        { id: 'blog', label: 'In-Depth Analysis', icon: '📄' }
    ];

    const sortOptions = [
        { id: 'featured', label: 'Featured First' },
        { id: 'industry', label: 'By Industry' },
        { id: 'duration', label: 'By Duration' }
    ];

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={classes.eyebrow}
                >
                    Success Stories
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Case Studies & Results
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Real results from real clients. Discover how we've helped businesses transform their digital presence and achieve remarkable growth.
                </motion.p>

                <motion.div 
                    className={classes.controls}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className={classes.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search case studies, industries, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={classes.searchInput}
                        />
                        <div className={classes.searchIcon}>🔍</div>
                    </div>

                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className={classes.sortSelect}
                    >
                        {sortOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </motion.div>

                <motion.div 
                    className={classes.filterBar}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`${classes.filterBtn} ${activeFilter === filter.id ? classes.activeFilter : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            <span className={classes.fIcon}>{filter.icon}</span>
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                <div className={classes.resultsCount}>
                    {filteredAndSortedCases.length} case {filteredAndSortedCases.length === 1 ? 'study' : 'studies'} found
                </div>
            </header>

            <motion.div layout className={classes.grid}>
                <AnimatePresence mode="popLayout">
                    {filteredAndSortedCases.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            className={`${classes.card} ${project.featured ? classes.featuredCard : ''}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ 
                                delay: i * 0.05,
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            onClick={() => setSelectedCase(project)}
                        >
                            {project.featured && (
                                <div className={classes.featuredBadge}>
                                    ⭐ Featured
                                </div>
                            )}

                            <div className={classes.mediaFrame} style={{ borderColor: project.color }}>
                                <img src={project.thumbnail} alt={project.title} className={classes.thumbnail} />
                                <div className={classes.typeBadge} style={{ backgroundColor: project.color }}>
                                    {project.type === 'video' && 'Video'}
                                    {project.type === 'social' && 'Social'}
                                    {project.type === 'blog' && 'Case Study'}
                                </div>
                                <div className={classes.overlay}>
                                    <span>View Details →</span>
                                </div>
                                <div className={classes.gradientOverlay} />
                            </div>

                            <div className={classes.info}>
                                <div className={classes.meta}>
                                    <span className={classes.service} style={{ color: project.color }}>
                                        {servicesConfig.find(s => s.id === project.serviceId)?.label}
                                    </span>
                                    <span className={classes.duration}>{project.duration}</span>
                                </div>
                                
                                <h3>{project.title}</h3>
                                <p className={classes.description}>{project.description}</p>
                                
                                <div className={classes.industry}>
                                    <span>🏢 {project.industry}</span>
                                </div>

                                {project.metrics && (
                                    <div className={classes.metrics}>
                                        {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                                            <div key={key} className={classes.metric}>
                                                <span className={classes.metricValue}>{value}</span>
                                                <span className={classes.metricLabel}>
                                                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {project.tags && (
                                    <div className={classes.tags}>
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className={classes.tag} style={{ borderColor: project.color }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredAndSortedCases.length === 0 && (
                <motion.div 
                    className={classes.noResults}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className={classes.noResultsIcon}>🔍</div>
                    <h3>No case studies found</h3>
                    <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                    <button 
                        className={classes.clearFilters}
                        onClick={() => {
                            setSearchQuery('');
                            setActiveFilter('all');
                            setSortBy('featured');
                        }}
                    >
                        Clear All Filters
                    </button>
                </motion.div>
            )}

            <MediaModal
                isOpen={!!selectedCase}
                onClose={() => setSelectedCase(null)}
                data={selectedCase}
            />
        </div>
    );
}

export default CaseStudy;
