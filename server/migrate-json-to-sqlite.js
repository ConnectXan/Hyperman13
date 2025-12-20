import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { run, query } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOCKS_FILE = path.join(__dirname, 'data', 'blocks.json');

async function migrate() {
    if (!fs.existsSync(BLOCKS_FILE)) {
        console.log('No blocks.json found. Skipping migration.');
        return;
    }

    try {
        const data = fs.readFileSync(BLOCKS_FILE, 'utf8');
        const blocks = JSON.parse(data);

        console.log(`Found ${blocks.length} blocks to migrate.`);

        for (const block of blocks) {
            const { id, section, type, data: blockData, order, visible } = block;

            // Check if already exists
            const existing = await query('SELECT id FROM blocks WHERE id = ?', [id]);
            if (existing.length > 0) {
                console.log(`Skipping block ${id} (already exists).`);
                continue;
            }

            await run(
                'INSERT INTO blocks (id, section, type, data, [order], visible) VALUES (?, ?, ?, ?, ?, ?)',
                [id, section, type, JSON.stringify(blockData), order || 0, visible ? 1 : 0]
            );
            console.log(`Migrated block: ${id}`);
        }

        console.log('Migration completed successfully.');

        // Backup the file
        const backupFile = `${BLOCKS_FILE}.bak`;
        fs.renameSync(BLOCKS_FILE, backupFile);
        console.log(`Backed up blocks.json to ${backupFile}`);

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        // Exit process after migration since db connection might stay open
        process.exit(0);
    }
}

migrate();
