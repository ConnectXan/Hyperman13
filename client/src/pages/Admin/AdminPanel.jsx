import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAdminStore } from '../../store/adminStore';
import classes from './Admin.module.css';

export default function AdminPanel() {
    const { token, blocks, fetchBlocks, updateBlock, deleteBlock, setToken } = useAdminStore();
    const [, setLocation] = useLocation();
    const [activeTab, setActiveTab] = useState('services');
    const [editingBlock, setEditingBlock] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        if (!token) {
            setLocation('/admin/login');
        } else {
            fetchBlocks();
        }
    }, [token, fetchBlocks, setLocation]);

    const handleLogout = () => {
        setToken(null);
        setLocation('/admin/login');
    };

    const toggleVisibility = async (block) => {
        await updateBlock(block.id, { visible: !block.visible });
    };

    const startAdd = () => {
        setEditingBlock({ id: 'new', section: activeTab, data: { type: 'blog', content: {} } });
        setEditData({ type: 'blog', content: {} });
    };

    const startEdit = (block) => {
        setEditingBlock(block);
        setEditData({ ...block.data });
    };

    const handleSave = async () => {
        if (editingBlock.id === 'new') {
            const newBlock = {
                section: activeTab,
                type: activeTab === 'case-studies' ? 'case-study-card' : 'generic-item',
                data: editData,
                visible: true,
                order: blocks.filter(b => b.section === activeTab).length
            };
            await useAdminStore.getState().createBlock(newBlock);
        } else {
            await updateBlock(editingBlock.id, { data: editData });
        }
        setEditingBlock(null);
        fetchBlocks();
    };

    const sections = ['services', 'portfolio', 'case-studies', 'products', 'navigation', 'theme'];

    return (
        <div className={classes.panelContainer}>
            <header className={classes.panelHeader}>
                <h1>Admin Control Center</h1>
                <button onClick={handleLogout} className={classes.logoutBtn}>Logout</button>
            </header>

            <nav className={classes.tabNav}>
                {sections.map(s => (
                    <button
                        key={s}
                        className={activeTab === s ? classes.activeTab : ''}
                        onClick={() => setActiveTab(s)}
                    >
                        {s.replace('-', ' ')}
                    </button>
                ))}
            </nav>

            <main className={classes.contentArea}>
                <div className={classes.blockList}>
                    <button onClick={startAdd} className={classes.addBtn}>+ Add New {activeTab.replace('-', ' ')} Item</button>
                    {blocks.filter(b => b.section === activeTab).map(block => (
                        <div key={block.id} className={classes.blockItem}>
                            <div className={classes.blockInfo}>
                                <span className={classes.blockType}>{block.type}</span>
                                <h3>{block.data.label || block.data.name || block.data.title || block.id}</h3>
                            </div>
                            <div className={classes.blockActions}>
                                <button
                                    onClick={() => toggleVisibility(block)}
                                    className={block.visible ? classes.visibleBtn : classes.hiddenBtn}
                                >
                                    {block.visible ? 'Visible' : 'Hidden'}
                                </button>
                                <button onClick={() => startEdit(block)} className={classes.editBtn}>Edit</button>
                                <button
                                    onClick={() => window.confirm('Delete this item?') && deleteBlock(block.id)}
                                    className={classes.deleteBtn}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {editingBlock && (
                    <div className={classes.modalOverlay}>
                        <div className={classes.modal}>
                            <h2>Edit {activeTab}</h2>
                            <div className={classes.form}>
                                {activeTab === 'case-studies' && (
                                    <>
                                        <label>Title</label>
                                        <input type="text" value={editData.title || ''} onChange={e => setEditData({ ...editData, title: e.target.value })} />

                                        <label>Type</label>
                                        <select value={editData.type || 'blog'} onChange={e => setEditData({ ...editData, type: e.target.value })}>
                                            <option value="blog">Blog</option>
                                            <option value="video">YouTube Video</option>
                                            <option value="social">Instagram Post</option>
                                        </select>

                                        <label>Thumbnail URL</label>
                                        <input type="text" value={editData.thumbnail || ''} onChange={e => setEditData({ ...editData, thumbnail: e.target.value })} />

                                        {editData.type === 'blog' ? (
                                            <>
                                                <label>Full Text (Markdown)</label>
                                                <textarea value={editData.content?.fullText || ''} onChange={e => setEditData({ ...editData, content: { ...editData.content, fullText: e.target.value } })} />
                                            </>
                                        ) : (
                                            <>
                                                <label>Media URL (YouTube Embed or IG Link)</label>
                                                <input type="text" value={editData.content?.url || ''} onChange={e => setEditData({ ...editData, content: { ...editData.content, url: e.target.value } })} />
                                            </>
                                        )}

                                        <label>Summary</label>
                                        <textarea value={editData.content?.summary || ''} onChange={e => setEditData({ ...editData, content: { ...editData.content, summary: e.target.value } })} />

                                        <label>Color (Hex)</label>
                                        <input type="text" value={editData.color || '#DAC0A3'} onChange={e => setEditData({ ...editData, color: e.target.value })} />

                                        <label>Service ID (e.g. meta-ads, google-ads)</label>
                                        <input type="text" value={editData.serviceId || ''} onChange={e => setEditData({ ...editData, serviceId: e.target.value })} />
                                    </>
                                )}

                                {activeTab === 'services' && (
                                    <>
                                        <label>Service Label</label>
                                        <input type="text" value={editData.label || ''} onChange={e => setEditData({ ...editData, label: e.target.value })} />

                                        <label>Description</label>
                                        <textarea value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} />

                                        <label>Color (Hex)</label>
                                        <input type="text" value={editData.color || ''} onChange={e => setEditData({ ...editData, color: e.target.value })} />
                                    </>
                                )}

                                {activeTab === 'portfolio' && (
                                    <>
                                        <label>Project Name</label>
                                        <input type="text" value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} />

                                        <label>Status</label>
                                        <input type="text" value={editData.status || ''} onChange={e => setEditData({ ...editData, status: e.target.value })} />

                                        <label>Service ID</label>
                                        <input type="text" value={editData.serviceId || ''} onChange={e => setEditData({ ...editData, serviceId: e.target.value })} />

                                        <label>Progress (%)</label>
                                        <input type="number" min="0" max="100" value={editData.progress || 0} onChange={e => setEditData({ ...editData, progress: parseInt(e.target.value) })} />
                                    </>
                                )}

                                {activeTab === 'products' && (
                                    <>
                                        <label>Product Name</label>
                                        <input type="text" value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} />

                                        <label>Description</label>
                                        <textarea value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} />

                                        <label>Link</label>
                                        <input type="text" value={editData.link || ''} onChange={e => setEditData({ ...editData, link: e.target.value })} />
                                    </>
                                )}

                                {(activeTab === 'navigation' || activeTab === 'theme') && (
                                    <>
                                        <label>Data (JSON)</label>
                                        <textarea
                                            rows="10"
                                            value={JSON.stringify(editData, null, 2)}
                                            onChange={e => {
                                                try {
                                                    setEditData(JSON.parse(e.target.value));
                                                } catch (err) {
                                                    // Invalid JSON, don't update
                                                }
                                            }}
                                        />
                                        <small style={{ color: 'var(--color-text-dim)' }}>Edit as JSON for advanced configuration</small>
                                    </>
                                )}
                            </div>
                            <div className={classes.modalActions}>
                                <button onClick={() => setEditingBlock(null)}>Cancel</button>
                                <button onClick={handleSave} className={classes.saveBtn}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
