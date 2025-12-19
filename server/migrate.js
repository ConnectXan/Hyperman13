import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const BLOCKS_FILE = path.join(__dirname, 'data', 'blocks.json');

// Mocking the data files since they are ESM and we are in a script context
// In a real scenario, we might import them, but for a one-off script, 
// parsing the text or having the content ready is easier.

const servicesConfigRaw = fs.readFileSync(path.join(DATA_DIR, 'servicesConfig.js'), 'utf8');
const portfolioDataRaw = fs.readFileSync(path.join(DATA_DIR, 'portfolioData.js'), 'utf8');
const caseStudyDataRaw = fs.readFileSync(path.join(DATA_DIR, 'caseStudyData.js'), 'utf8');

// Simple regex-based extraction (cleaner to use a proper parser but this is quick)
const extractData = (raw, variableName) => {
    const start = raw.indexOf('=');
    const end = raw.lastIndexOf(';');
    const jsonStr = raw.substring(start + 1, end).trim();
    // Convert JS object literal string to JSON-safe string
    // This is fragile, so we use a trick: Eval it in a controlled way or just clean it.
    // Given the task, I'll just write the final JSON based on what I read.
    return eval(`(${jsonStr})`);
};

const services = extractData(servicesConfigRaw, 'servicesConfig');
const portfolio = extractData(portfolioDataRaw, 'portfolioData');
const caseStudies = extractData(caseStudyDataRaw, 'caseStudyData');

const blocks = [];

// Migrate Services
services.forEach((s, idx) => {
    blocks.push({
        id: `service-${s.id}`,
        section: 'services',
        type: 'service-card',
        data: s,
        order: idx,
        visible: true
    });
});

// Migrate Portfolio
portfolio.forEach((p, idx) => {
    blocks.push({
        id: `portfolio-${p.id}`,
        section: 'portfolio',
        type: 'portfolio-item',
        data: p,
        order: idx,
        visible: true
    });
});

// Migrate Case Studies
caseStudies.forEach((c, idx) => {
    blocks.push({
        id: `case-${c.id}`,
        section: 'case-studies',
        type: 'case-study-card',
        data: c,
        order: idx,
        visible: true
    });
});

// Add Products (Initially just Animnow as requested)
blocks.push({
    id: 'product-animnow',
    section: 'products',
    type: 'product-item',
    data: {
        name: 'Animnow',
        status: 'Live', // Upcoming / Live / Archived
        description: 'A precision-engineered, browser-native 2D studio.',
        features: [
            'Vector Sovereignty',
            'Spatial Architect',
            'Keyframe Nirvana',
            'AI Co-Pilot',
            'Cloud Render'
        ],
        cta: 'Secure Early Access'
    },
    order: 0,
    visible: true
});

// Navigation & Theme (Placeholder)
blocks.push({
    id: 'nav-main',
    section: 'navigation',
    type: 'header-nav',
    data: [
        { label: 'Services', link: '/#services' },
        { label: 'Portfolio', link: '/#portfolio' },
        { label: 'Case Studies', link: '/#case-studies' },
        { label: 'Animnow', link: '/marketplace/animnow' }
    ],
    order: 0,
    visible: true
});

blocks.push({
    id: 'theme-config',
    section: 'theme',
    type: 'global-theme',
    data: {
        colors: {
            primary: '#DAC0A3',
            bg: '#000000',
            text: '#FFFFFF'
        },
        fonts: {
            main: 'Inter, sans-serif'
        },
        borderRadius: '4px'
    },
    order: 0,
    visible: true
});

fs.writeFileSync(BLOCKS_FILE, JSON.stringify(blocks, null, 2));
console.log('Successfully migrated data to server/data/blocks.json');
