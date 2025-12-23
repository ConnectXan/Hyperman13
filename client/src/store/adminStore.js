import { create } from 'zustand';

const API_BASE = '/api';

export const useAdminStore = create((set, get) => ({
    token: localStorage.getItem('admin_token') || null,
    blocks: [],
    loading: false,
    error: null,

    setToken: (token) => {
        if (token) {
            localStorage.setItem('admin_token', token);
        } else {
            localStorage.removeItem('admin_token');
        }
        set({ token });
    },

    login: async (username, password) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                get().setToken(data.token);
                return true;
            } else {
                set({ error: data.error });
                return false;
            }
        } catch {
            set({ error: 'Connection failed' });
            return false;
        } finally {
            set({ loading: false });
        }
    },

    fetchBlocks: async () => {
        const { token } = get();
        if (!token) return;
        set({ loading: true });
        try {
            const res = await fetch(`${API_BASE}/admin/blocks`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                set({ blocks: data });
            } else if (res.status === 403) {
                get().setToken(null);
            }
        } catch (err) {
            console.error('Fetch blocks failed', err);
        } finally {
            set({ loading: false });
        }
    },

    updateBlock: async (id, updates) => {
        const { token, blocks } = get();
        try {
            const res = await fetch(`${API_BASE}/admin/blocks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates),
            });
            if (res.ok) {
                const updated = await res.json();
                set({ blocks: blocks.map(b => b.id === id ? updated : b) });
                return true;
            }
        } catch (err) {
            console.error('Update block failed', err);
        }
        return false;
    },

    createBlock: async (newBlock) => {
        const { token, blocks } = get();
        try {
            const res = await fetch(`${API_BASE}/admin/blocks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newBlock),
            });
            if (res.ok) {
                const created = await res.json();
                set({ blocks: [...blocks, created] });
                return true;
            }
        } catch (err) {
            console.error('Create block failed', err);
        }
        return false;
    },

    deleteBlock: async (id) => {
        const { token, blocks } = get();
        try {
            const res = await fetch(`${API_BASE}/admin/blocks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (res.ok) {
                set({ blocks: blocks.filter(b => b.id !== id) });
                return true;
            }
        } catch (err) {
            console.error('Delete block failed', err);
        }
        return false;
    }
}));
