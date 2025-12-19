import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') }); // Root
dotenv.config({ path: path.join(__dirname, '.env') }); // Server

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const generateToken = (user) => {
    return jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });
};

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

export const loginAdmin = (username, password) => {
    const u = (username || '').trim();
    const p = (password || '').trim();

    // Priority 1: .env variables
    const adminUser = (process.env.ADMIN_USER || '').trim();
    const adminPass = (process.env.ADMIN_PASS || '').trim();

    // Priority 2: Hardcoded Failsafe
    const fallbackUser = 'connectxan';
    const fallbackPass = 'cnxn@13';

    const isEnvMatch = adminUser && adminPass && u === adminUser && p === adminPass;
    const isFallbackMatch = u === fallbackUser && p === fallbackPass;

    console.log('[Auth Debug]', {
        providedUser: u,
        envSet: !!adminUser,
        envMatch: isEnvMatch,
        fallbackMatch: isFallbackMatch
    });

    if (isEnvMatch || isFallbackMatch) {
        return { username: u };
    }
    return null;
};
