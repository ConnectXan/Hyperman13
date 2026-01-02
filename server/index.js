import express from 'express';
import cors from 'cors';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateToken, authenticateToken, loginAdmin } from './auth.js';
import { query, run, get as dbGet } from './db.js';

dotenv.config(); // Look in root
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') }); // Look in server/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
    cors({
        origin: process.env.NODE_ENV === 'production'
            ? [
                process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
                'https://hyperman13.vercel.app',
                /^https:\/\/.*\.vercel\.app$/
              ].filter(Boolean)
            : '*',
        credentials: true
    })
);

app.use(express.json());


// Serve static files from the React app
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
}

// Helper to map DB rows to frontend format
const formatBlock = (row) => ({
    ...row,
    data: JSON.parse(row.data),
    visible: !!row.visible
});

// --- PUBLIC APIs ---

// Fetch blocks by section
app.get('/api/blocks/:section', async (req, res) => {
    try {
        const { section } = req.params;
        const rows = await query(
            'SELECT * FROM blocks WHERE section = ? AND visible = 1 ORDER BY [order] ASC',
            [section]
        );
        res.json(rows.map(formatBlock));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch blocks' });
    }
});

// Fetch all public content (for initial load)
app.get('/api/content', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM blocks WHERE visible = 1 ORDER BY section, [order] ASC');
        res.json(rows.map(formatBlock));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
});

// --- ADMIN APIs ---

// Admin Login
app.post('/api/login', (req, res) => {
    console.log('Login attempt:', { username: req.body.username, hasPassword: !!req.body.password });
    const { username, password } = req.body;
    const user = loginAdmin(username, password);

    if (user) {
        const token = generateToken(user);
        console.log('Login successful for:', username);
        res.json({ token });
    } else {
        console.log('Login failed for:', username);
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Admin: CRUD blocks
app.get('/api/admin/blocks', authenticateToken, async (req, res) => {
    try {
        const rows = await query('SELECT * FROM blocks ORDER BY section, [order] ASC');
        res.json(rows.map(formatBlock));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blocks' });
    }
});

app.post('/api/admin/blocks', authenticateToken, async (req, res) => {
    try {
        const { section, type, data, order, visible } = req.body;
        const id = `block-${Date.now()}`;
        await run(
            'INSERT INTO blocks (id, section, type, data, [order], visible) VALUES (?, ?, ?, ?, ?, ?)',
            [id, section, type, JSON.stringify(data), order || 0, visible ? 1 : 0]
        );
        res.status(201).json({ id, ...req.body });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create block' });
    }
});

app.put('/api/admin/blocks/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { section, type, data, order, visible } = req.body;

        await run(
            'UPDATE blocks SET section = ?, type = ?, data = ?, [order] = ?, visible = ? WHERE id = ?',
            [section, type, JSON.stringify(data), order, visible ? 1 : 0, id]
        );

        res.json({ id, ...req.body });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update block' });
    }
});

app.delete('/api/admin/blocks/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await run('DELETE FROM blocks WHERE id = ?', [id]);

        if (result.changes === 0) return res.status(404).json({ error: 'Block not found' });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete block' });
    }
});

// Fallback to index.html for SPA
app.get(/^(?!\/api).+/, (req, res) => {
    const indexPath = path.join(clientBuildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send('Hyper13 API Server is running. Frontend build not found.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
