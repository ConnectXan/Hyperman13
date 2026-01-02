import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useAdminStore } from '../../store/adminStore';
import classes from './Admin.module.css';

export default function AdminPanel() {
    const { token, blocks, fetchBlocks, updateBlock, deleteBlock, createBlock, setToken } = useAdminStore();
    const [, setLocation] = useLocation();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [editingBlock, setEditingBlock] = useState(null);
    const [editData, setEditData] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!token) {
            setLocation('/admin/login');
        } else {
            fetchBlocks();
        }
    }, [token, fetchBlocks, setLocation]);

    const handleLogout = () => {
        setToken(null);
        setLocation('/');
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setMobileMenuOpen(false); // Close mobile menu when tab changes
    };

    const toggleVisibility = async (block) => {
        await updateBlock(block.id, { visible: !block.visible });
    };

    const startAdd = () => {
        let initialData = {};
        if (activeTab === 'case-studies') initialData = { type: 'blog', content: {} };
        if (activeTab === 'portfolio') initialData = { name: '', status: 'Active', progress: 0 };
        if (activeTab === 'services') initialData = { label: '', description: '', color: '#DAC0A3' };
        if (activeTab === 'performance-metrics') initialData = { 
            label: '', 
            value: 0, 
            color: '#4CAF50', 
            icon: '📊'
        };

        setEditingBlock({ id: 'new', section: activeTab, data: initialData });
        setEditData(initialData);
    };

    const startEdit = (block) => {
        setEditingBlock(block);
        setEditData({ ...block.data });
    };

    const handleSave = async () => {
        if (editingBlock.id === 'new') {
            // Ensure correct type mapping for industry standard storage
            let type = 'generic-item';
            if (activeTab === 'case-studies') type = 'case-study-card';
            if (activeTab === 'portfolio') type = 'portfolio-item';
            if (activeTab === 'services') type = 'service-card';
            if (activeTab === 'products') type = 'product-item';
            if (activeTab === 'performance-metrics') type = 'performance-metric';

            const newBlock = {
                section: activeTab,
                type: type,
                data: editData,
                visible: true,
                order: blocks.filter(b => b.section === activeTab).length
            };
            await createBlock(newBlock);
        } else {
            await updateBlock(editingBlock.id, { data: editData });
        }
        setEditingBlock(null);
        fetchBlocks();
    };

    const sections = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'performance-metrics', label: 'Performance Metrics', icon: '🎯' },
        { id: 'services', label: 'Services', icon: '🛠️' },
        { id: 'portfolio', label: 'Portfolio', icon: '💼' },
        { id: 'case-studies', label: 'Case Studies', icon: '📂' },
        { id: 'about-us', label: 'About Us', icon: '👤' },
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'navigation', label: 'Navigation', icon: '🔗' },
        { id: 'theme', label: 'Theme Config', icon: '🎨' }
    ];

    const getCount = (sectionId) => {
        return blocks.filter(b => b.section === sectionId).length;
    };

    // Derived list of services for selectors
    const availableServices = useMemo(() => {
        return blocks
            .filter(b => b.section === 'services')
            .map(b => ({ id: b.data.id || b.id, label: b.data.label }));
    }, [blocks]);

    const stats = useMemo(() => ([
        { label: 'Total Blocks', value: blocks.length },
        { label: 'Active Services', value: blocks.filter(b => b.section === 'services' && b.visible).length },
        { label: 'Case Studies', value: blocks.filter(b => b.section === 'case-studies').length },
        { label: 'System Uptime', value: '99.9%' }
    ]), [blocks]);

    return (
        <div className={classes.panelContainer}>
            {/* Mobile Menu Toggle */}
            <button 
                className={classes.mobileMenuToggle}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                ☰
            </button>

            {/* Mobile Overlay */}
            <div 
                className={`${classes.mobileOverlay} ${mobileMenuOpen ? classes.active : ''}`}
                onClick={closeMobileMenu}
            />

            {/* Sidebar Navigation */}
            <aside className={`${classes.sidebar} ${mobileMenuOpen ? classes.mobileOpen : ''}`}>
                <div className={classes.sidebarHeader}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Hyperman<span>Control</span></h2>
                        <button 
                            className={classes.mobileCloseBtn}
                            onClick={closeMobileMenu}
                        >
                            ✕
                        </button>
                    </div>
                </div>
                <nav className={classes.sidebarNav}>
                    {sections.map(s => (
                        <button
                            key={s.id}
                            className={`${classes.navItem} ${activeTab === s.id ? classes.activeTab : ''}`}
                            onClick={() => handleTabChange(s.id)}
                        >
                            <div className={classes.itemLabel}>
                                <span>{s.icon}</span> {s.label}
                            </div>
                            {s.id !== 'dashboard' && (
                                <span className={classes.countBadge}>{getCount(s.id)}</span>
                            )}
                        </button>
                    ))}
                </nav>
                <div className={classes.sidebarFooter}>
                    <div style={{ padding: '0 0.5rem 1rem', fontSize: '0.65rem', color: '#333' }}>
                        DEBUG: Sync Nodes [{blocks.length}]
                    </div>
                    <button onClick={handleLogout} className={classes.logoutBtn}>Sign Out</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={classes.mainContent}>
                <header className={classes.contentHeader}>
                    <div className={classes.headerTitles}>
                        <span className={classes.breadcrumb}>Sector / {activeTab}</span>
                        <h1>{activeTab.replace('-', ' ')}</h1>
                    </div>
                    <div className={classes.headerActions}>
                        <button onClick={fetchBlocks} className={classes.actionBtn} style={{ marginRight: '1rem' }}>
                            ⟳ Refresh Nodes
                        </button>
                        {activeTab !== 'dashboard' && (
                            <button onClick={startAdd} className={classes.addBtn}>
                                + New Protocol
                            </button>
                        )}
                    </div>
                </header>

                <div className={classes.contentArea}>
                    {activeTab === 'dashboard' ? (
                        <div className={classes.dashboardOverview}>
                            <div className={classes.statsGrid}>
                                {stats.map((s, i) => (
                                    <div key={i} className={classes.statCard}>
                                        <div className={classes.statLabel}>{s.label}</div>
                                        <div className={classes.statValue}>{s.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className={classes.welcomeMsg}>
                                <h2>Industrial Management Hub</h2>
                                <p>Operational integrity is optimal. Use the sidebar to manage your enterprise infrastructure. All data nodes are synchronized with the primary SQLite engine.</p>
                                <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.5 }}>
                                    Current session: {new Date().toLocaleTimeString()} | DB: SQLite-Hyper.db
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.blockList}>
                            {blocks.filter(b => b.section === activeTab).map(block => (
                                <div key={block.id} className={classes.blockItem}>
                                    <div className={classes.blockInfo}>
                                        <div className={classes.idBadge}>ID: {block.id}</div>
                                        <span className={classes.blockType}>{block.type}</span>
                                        <h3>{block.data.label || block.data.name || block.data.title || block.id}</h3>
                                        {block.data.serviceId && (
                                            <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '4px' }}>
                                                Linked Service: {availableServices.find(s => s.id === block.data.serviceId)?.label || block.data.serviceId}
                                            </div>
                                        )}
                                    </div>
                                    <div className={classes.blockActions}>
                                        <button
                                            onClick={() => toggleVisibility(block)}
                                            className={`${classes.actionBtn} ${block.visible ? classes.visibleBtn : classes.hiddenBtn}`}
                                        >
                                            {block.visible ? 'Published' : 'Draft'}
                                        </button>
                                        <button onClick={() => startEdit(block)} className={`${classes.actionBtn} ${classes.editBtn}`}>Modify</button>
                                        <button
                                            onClick={() => window.confirm('Permanently delete this item?') && deleteBlock(block.id)}
                                            className={`${classes.actionBtn} ${classes.deleteBtn}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {blocks.filter(b => b.section === activeTab).length === 0 && (
                                <div className={classes.emptyState}>
                                    <div className={classes.emptyIcon}>∅</div>
                                    <p>No operational records found in the "{activeTab}" sector.</p>
                                    <button onClick={startAdd} className={classes.addBtn} style={{ marginTop: '2rem' }}>
                                        Initialize First Entry
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {editingBlock && (
                    <div className={classes.modalOverlay}>
                        <div className={classes.modal}>
                            <h2>{editingBlock.id === 'new' ? 'New' : 'Edit'} {activeTab}</h2>
                            <div className={classes.form}>
                                {activeTab === 'case-studies' && (
                                    <>
                                        <div className={classes.inputGroup}>
                                            <label>Industrial Title</label>
                                            <input type="text" value={editData.title || ''} onChange={e => setEditData({ ...editData, title: e.target.value })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Content Vector (Type)</label>
                                            <select value={editData.type || 'blog'} onChange={e => setEditData({ ...editData, type: e.target.value })}>
                                                <option value="blog">Article / Case</option>
                                                <option value="video">System Visual (YouTube)</option>
                                                <option value="social">Social Integration</option>
                                            </select>
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Assigned Unit (Service)</label>
                                            <select value={editData.serviceId || ''} onChange={e => setEditData({ ...editData, serviceId: e.target.value })}>
                                                <option value="">Unassigned</option>
                                                {availableServices.map(s => (
                                                    <option key={s.id} value={s.id}>{s.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Visual Asset (URL)</label>
                                            <input type="text" value={editData.thumbnail || ''} onChange={e => setEditData({ ...editData, thumbnail: e.target.value })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Status Color (Hex)</label>
                                            <input type="text" value={editData.color || '#DAC0A3'} onChange={e => setEditData({ ...editData, color: e.target.value })} />
                                        </div>
                                        {editData.type === 'blog' ? (
                                            <div className={classes.inputGroup}>
                                                <label>Technical Log (Markdown)</label>
                                                <textarea rows="6" value={editData.content?.fullText || ''} onChange={e => setEditData({ ...editData, content: { ...editData.content, fullText: e.target.value } })} />
                                            </div>
                                        ) : (
                                            <div className={classes.inputGroup}>
                                                <label>Media Source Link (URL)</label>
                                                <input type="text" value={editData.content?.url || ''} onChange={e => setEditData({ ...editData, content: { ...editData.content, url: e.target.value } })} />
                                            </div>
                                        )}
                                        <div className={classes.inputGroup}>
                                            <label>Architecture Summary</label>
                                            <textarea value={editData.content?.summary || ''} onChange={e => setEditData({ ...editData, content: { ...editData.content, summary: e.target.value } })} />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'services' && (
                                    <>
                                        <div className={classes.inputGroup}>
                                            <label>System Capability (Label)</label>
                                            <input type="text" value={editData.label || ''} onChange={e => setEditData({ ...editData, label: e.target.value })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Service ID (Internal)</label>
                                            <input type="text" value={editData.id || ''} onChange={e => setEditData({ ...editData, id: e.target.value })} placeholder="e.g. digital-marketing" />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Deployment Description</label>
                                            <textarea value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Status Color (Hex)</label>
                                            <input type="text" value={editData.color || '#DAC0A3'} onChange={e => setEditData({ ...editData, color: e.target.value })} />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'portfolio' && (
                                    <>
                                        <div className={classes.inputGroup}>
                                            <label>Project Designation (Name)</label>
                                            <input type="text" value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Assigned Unit (Service)</label>
                                            <select value={editData.serviceId || ''} onChange={e => setEditData({ ...editData, serviceId: e.target.value })}>
                                                <option value="">Unassigned</option>
                                                {availableServices.map(s => (
                                                    <option key={s.id} value={s.id}>{s.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Lifecycle Status</label>
                                            <select value={editData.status || 'Active'} onChange={e => setEditData({ ...editData, status: e.target.value })}>
                                                <option value="Active">Active / Scaling</option>
                                                <option value="Deployment">Deployment Mode</option>
                                                <option value="Stable">Stable Operations</option>
                                                <option value="Optimizing">Optimization Phase</option>
                                                <option value="Success">Success Story (Completed)</option>
                                            </select>
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Operational Group</label>
                                            <select value={editData.group || 'live'} onChange={e => setEditData({ ...editData, group: e.target.value })}>
                                                <option value="live">Live Operations</option>
                                                <option value="finished">Success Stories</option>
                                            </select>
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Optimization Index (%)</label>
                                            <input type="number" min="0" max="100" value={editData.progress || 0} onChange={e => setEditData({ ...editData, progress: parseInt(e.target.value) })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Visual Identity (Hex Color)</label>
                                            <input type="text" value={editData.color || '#DAC0A3'} onChange={e => setEditData({ ...editData, color: e.target.value })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Metrics Visualization (JSON Array)</label>
                                            <textarea
                                                rows="6"
                                                value={JSON.stringify(editData.widgets || [], null, 2)}
                                                onChange={e => {
                                                    try {
                                                        const widgets = JSON.parse(e.target.value);
                                                        setEditData({ ...editData, widgets });
                                                    } catch (err) { }
                                                }}
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'about-us' && (
                                    <>
                                        <div className={classes.inputGroup}>
                                            <label>Content Section</label>
                                            <select value={editData.section || 'hero'} onChange={e => setEditData({ ...editData, section: e.target.value })}>
                                                <option value="hero">Hero Content</option>
                                                <option value="approach">Approach Card</option>
                                                <option value="story">Company Story</option>
                                                <option value="capabilities">Capabilities</option>
                                                <option value="team">Team Member</option>
                                                <option value="settings">Page Settings</option>
                                            </select>
                                        </div>

                                        {editData.section === 'hero' && (
                                            <>
                                                <div className={classes.inputGroup}>
                                                    <label>Badge Text</label>
                                                    <input type="text" value={editData.badge || ''} onChange={e => setEditData({ ...editData, badge: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Main Headline</label>
                                                    <input type="text" value={editData.headline || ''} onChange={e => setEditData({ ...editData, headline: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Subtitle</label>
                                                    <textarea value={editData.subtitle || ''} onChange={e => setEditData({ ...editData, subtitle: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Description</label>
                                                    <textarea rows="4" value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} />
                                                </div>
                                            </>
                                        )}

                                        {editData.section === 'approach' && (
                                            <>
                                                <div className={classes.inputGroup}>
                                                    <label>Card Title</label>
                                                    <input type="text" value={editData.title || ''} onChange={e => setEditData({ ...editData, title: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Description</label>
                                                    <textarea value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Icon (Emoji)</label>
                                                    <input type="text" value={editData.icon || ''} onChange={e => setEditData({ ...editData, icon: e.target.value })} placeholder="🚀" />
                                                </div>
                                            </>
                                        )}

                                        {editData.section === 'story' && (
                                            <>
                                                <div className={classes.inputGroup}>
                                                    <label>Story Title</label>
                                                    <input type="text" value={editData.title || ''} onChange={e => setEditData({ ...editData, title: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Story Content</label>
                                                    <textarea rows="6" value={editData.content || ''} onChange={e => setEditData({ ...editData, content: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Milestone Year</label>
                                                    <input type="text" value={editData.year || ''} onChange={e => setEditData({ ...editData, year: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Milestone Event</label>
                                                    <input type="text" value={editData.event || ''} onChange={e => setEditData({ ...editData, event: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Event Description</label>
                                                    <textarea value={editData.eventDescription || ''} onChange={e => setEditData({ ...editData, eventDescription: e.target.value })} />
                                                </div>
                                            </>
                                        )}

                                        {editData.section === 'capabilities' && (
                                            <div className={classes.inputGroup}>
                                                <label>Capability Name</label>
                                                <input type="text" value={editData.capability || ''} onChange={e => setEditData({ ...editData, capability: e.target.value })} />
                                            </div>
                                        )}

                                        {editData.section === 'team' && (
                                            <>
                                                <div className={classes.inputGroup}>
                                                    <label>Team Member Name</label>
                                                    <input type="text" value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Role/Position</label>
                                                    <input type="text" value={editData.role || ''} onChange={e => setEditData({ ...editData, role: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Bio</label>
                                                    <textarea rows="4" value={editData.bio || ''} onChange={e => setEditData({ ...editData, bio: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>Photo URL</label>
                                                    <input type="text" value={editData.image || ''} onChange={e => setEditData({ ...editData, image: e.target.value })} />
                                                </div>
                                                <div className={classes.inputGroup}>
                                                    <label>LinkedIn URL</label>
                                                    <input type="text" value={editData.linkedin || ''} onChange={e => setEditData({ ...editData, linkedin: e.target.value })} />
                                                </div>
                                            </>
                                        )}

                                        {editData.section === 'settings' && (
                                            <div className={classes.inputGroup}>
                                                <label>Show Team Section</label>
                                                <select value={editData.showTeam ? 'true' : 'false'} onChange={e => setEditData({ ...editData, showTeam: e.target.value === 'true' })}>
                                                    <option value="true">Yes - Show Team Section</option>
                                                    <option value="false">No - Hide Team Section</option>
                                                </select>
                                            </div>
                                        )}
                                    </>
                                )}

                                {activeTab === 'performance-metrics' && (
                                    <>
                                        <div className={classes.inputGroup}>
                                            <label>Metric Label</label>
                                            <input 
                                                type="text" 
                                                value={editData.label || ''} 
                                                onChange={e => setEditData({ ...editData, label: e.target.value })} 
                                                placeholder="e.g. Client Satisfaction"
                                            />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Current Value (%)</label>
                                            <input 
                                                type="number" 
                                                value={editData.value || 0} 
                                                onChange={e => setEditData({ ...editData, value: parseFloat(e.target.value) })} 
                                                min="0"
                                                max="100"
                                                step="0.1"
                                            />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Color</label>
                                            <input 
                                                type="color" 
                                                value={editData.color || '#4CAF50'} 
                                                onChange={e => setEditData({ ...editData, color: e.target.value })} 
                                            />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Icon (Emoji)</label>
                                            <input 
                                                type="text" 
                                                value={editData.icon || ''} 
                                                onChange={e => setEditData({ ...editData, icon: e.target.value })} 
                                                placeholder="📊"
                                                maxLength="2"
                                            />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Suffix (optional)</label>
                                            <input 
                                                type="text" 
                                                value={editData.suffix || ''} 
                                                onChange={e => setEditData({ ...editData, suffix: e.target.value })} 
                                                placeholder="e.g. %, +, x"
                                                maxLength="3"
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'products' && (
                                    <>
                                        <div className={classes.inputGroup}>
                                            <label>Product Domain</label>
                                            <input type="text" value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Technical Specs</label>
                                            <textarea value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} />
                                        </div>
                                        <div className={classes.inputGroup}>
                                            <label>Access Link</label>
                                            <input type="text" value={editData.link || ''} onChange={e => setEditData({ ...editData, link: e.target.value })} />
                                        </div>
                                    </>
                                )}

                                {(activeTab === 'navigation' || activeTab === 'theme') && (
                                    <div className={classes.inputGroup}>
                                        <label>Technical Node (JSON Archive)</label>
                                        <textarea
                                            rows="12"
                                            value={JSON.stringify(editData, null, 2)}
                                            onChange={e => {
                                                try {
                                                    setEditData(JSON.parse(e.target.value));
                                                } catch (err) { }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={classes.modalActions}>
                                <button onClick={() => setEditingBlock(null)} className={classes.cancelBtn}>Abort</button>
                                <button onClick={handleSave} className={classes.saveBtn}>Commit Changes</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
