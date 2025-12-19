import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateToken, authenticateToken, loginAdmin } from './auth.js';

dotenv.config(); // Look in root
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') }); // Look in server/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const BLOCKS_FILE = path.join(__dirname, 'data', 'blocks.json');

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
}

// Helper to read blocks
const getBlocks = () => {
    const data = fs.readFileSync(BLOCKS_FILE, 'utf8');
    return JSON.parse(data);
};

// --- PUBLIC APIs ---

// Fetch blocks by section
app.get('/api/blocks/:section', (req, res) => {
    try {
        const { section } = req.params;
        const blocks = getBlocks();
        const filtered = blocks
            .filter(b => b.section === section && b.visible)
            .sort((a, b) => a.order - b.order);
        res.json(filtered);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blocks' });
    }
});

// Fetch all public content (for initial load)
app.get('/api/content', (req, res) => {
    try {
        const blocks = getBlocks();
        const publicContent = blocks.filter(b => b.visible);
        res.json(publicContent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch content' });
    }
});

// --- ADMIN APIs ---

// Admin Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = loginAdmin(username, password);

    if (user) {
        const token = generateToken(user);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Admin: CRUD blocks
app.get('/api/admin/blocks', authenticateToken, (req, res) => {
    try {
        const blocks = getBlocks();
        res.json(blocks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blocks' });
    }
});

app.post('/api/admin/blocks', authenticateToken, (req, res) => {
    try {
        const blocks = getBlocks();
        const newBlock = { ...req.body, id: `block-${Date.now()}` };
        blocks.push(newBlock);
        fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 2));
        res.status(201).json(newBlock);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create block' });
    }
});

app.put('/api/admin/blocks/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        let blocks = getBlocks();
        const index = blocks.findIndex(b => b.id === id);

        if (index === -1) return res.status(404).json({ error: 'Block not found' });

        blocks[index] = { ...blocks[index], ...req.body };
        fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 2));
        res.json(blocks[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update block' });
    }
});

app.delete('/api/admin/blocks/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        let blocks = getBlocks();
        const filtered = blocks.filter(b => b.id !== id);

        if (blocks.length === filtered.length) return res.status(404).json({ error: 'Block not found' });

        fs.writeFileSync(BLOCKS_FILE, JSON.stringify(filtered, null, 2));
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
