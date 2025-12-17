export const servicesConfig = [
    {
        id: 'meta-ads',
        label: 'Meta Ads',
        description: 'High-conversion campaigns on Facebook & Instagram.',
        color: '#3b5998',
        activeColor: '#4267B2',
        metrics: { roas: '4.5x', spend: '$50k/mo' },
        formFields: [
            { name: 'monthlyBudget', label: 'Monthly Ad Budget', type: 'select', options: ['<$5k', '$5k-$20k', '$20k+'] }
        ]
    },
    {
        id: 'google-ads',
        label: 'Google Ads',
        description: 'Search, Display, and Video campaigns that capture intent.',
        color: '#4285F4',
        activeColor: '#ea4335',
        metrics: { roas: '5.2x', conversions: '1.2k' },
        formFields: [
            { name: 'targetRegion', label: 'Target Region', type: 'text', placeholder: 'e.g. USA, Global' }
        ]
    },
    {
        id: 'shopify-dev',
        label: 'Shopify Development',
        description: 'Custom themes and apps for e-commerce scale.',
        color: '#96bf48',
        activeColor: '#008060',
        metrics: { uptime: '99.99%', loadTime: '0.8s' },
        formFields: [
            { name: 'storeUrl', label: 'Current Store URL (if any)', type: 'text' }
        ]
    },
    {
        id: 'web-dev',
        label: 'Web Development',
        description: 'Full-stack solutions using modern frameworks.',
        color: '#61DAFB',
        activeColor: '#20232a',
        metrics: { lighthouse: '100', deployments: 'Daily' },
        formFields: [
            { name: 'projectType', label: 'Project Type', type: 'select', options: ['Landing Page', 'Web App', 'Corporate Site'] }
        ]
    },
    {
        id: 'social-mgmt',
        label: 'Social Media Mgmt',
        description: 'Organic growth and community engagement strategies.',
        color: '#E1306C',
        activeColor: '#C13584',
        metrics: { engagement: '+300%', followers: '+10k' },
        formFields: [
            { name: 'platforms', label: 'Priority Platforms', type: 'text', placeholder: 'IG, TikTok, LinkedIn...' }
        ]
    },
    {
        id: 'ai-animation',
        label: 'AI 2D Animation',
        description: 'Cutting-edge generative video and motion graphics.',
        color: '#FF00FF',
        activeColor: '#00FFFF',
        metrics: { production: '-80% time', uniqueness: '100%' },
        formFields: [
            { name: 'videoStyle', label: 'Preferred Style', type: 'select', options: ['Abstract', 'Realistic', 'Cartoon', 'Anime'] }
        ]
    }
];
