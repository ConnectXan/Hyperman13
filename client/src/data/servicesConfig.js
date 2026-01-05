export const servicesConfig = [
    {
        id: 'meta-ads',
        label: 'Meta Growth Ads',
        description: 'Scalable acquisition campaigns on Facebook & Instagram focused on high-ROAS growth.',
        color: '#DAC0A3',
        activeColor: '#C8A17E',
        metrics: { roas: '4.8x', revenue: '₹50Cr+' },
        formFields: [
            { name: 'monthlyBudget', label: 'Monthly Ad Budget', type: 'select', options: ['< ₹1L', '₹1L - ₹5L', '₹5L - ₹20L', '₹20L+'] }
        ],
        modalInfo: {
            title: "Meta Ads Scaling",
            description: "Scale your revenue with data-driven Meta campaigns optimized for maximum customer acquisition.",
            features: [
                "Advanced CBO/ABO targeting",
                "U-G-C and Creative Ad Testing",
                "Full-Funnel ROAS Optimization",
                "Deep Conversion Tracking Setup"
            ],
            deliverables: "Growth Strategy, Ad Creatives, Weekly Performance Reports"
        }
    },
    {
        id: 'google-ads',
        label: 'Google Search & Scale',
        description: 'Precision-targeted Search and Shopping campaigns to capture high-intent buyers.',
        color: '#F4D03F',
        activeColor: '#F1C40F',
        metrics: { roas: '5.5x', conversions: '10k+' },
        formFields: [
            { name: 'targetRegion', label: 'Target Market', type: 'text', placeholder: 'e.g. India, USA, Global' }
        ],
        modalInfo: {
            title: "Google Ads Growth",
            description: "Capture high-intent traffic with expertly managed Google Search, Display, and Video campaigns.",
            features: [
                "Intent-Based Keyword Research",
                "Smart Bidding & Alpha/Beta Structuring",
                "YouTube Conversion Funnels",
                "PMax & Shopping Optimization"
            ],
            deliverables: "Strategy Roadmap, Campaign Setup, Scaling Reports"
        }
    },
    {
        id: 'shopify-dev',
        label: 'E-com Growth Engines',
        description: 'High-converting Shopify systems designed to scale D2C brands globally.',
        color: '#7DCEA0',
        activeColor: '#52BE80',
        metrics: { conversion: '+120%', speed: '98/100' },
        formFields: [
            { name: 'storeUrl', label: 'Store URL / Niche', type: 'text', placeholder: 'e.g. fashion, wellness' }
        ],
        modalInfo: {
            title: "E-commerce Systems",
            description: "Build a high-performance Shopify store designed specifically for conversion and growth.",
            features: [
                "Custom UX for Higher AOV",
                "Proprietary Checkout Optimization",
                "Advanced Tech Stack Integration",
                "Mobile-First Growth Architecture"
            ],
            deliverables: "Ready-to-Scale Store, Custom Theme, Conversion Audit"
        }
    },
    {
        id: 'web-dev',
        label: 'Conversion-Optimized Web',
        description: 'Next-gen web applications built for lead generation and business automation.',
        color: '#3498DB',
        activeColor: '#2E86C1',
        metrics: { performance: '100', scalability: 'Infinite' },
        formFields: [
            { name: 'projectType', label: 'Business Vertical', type: 'select', options: ['B2B SaaS', 'Lead-Gen Portal', 'Enterprise App'] }
        ],
        modalInfo: {
            title: "Web Systems",
            description: "Leverage lightning-fast technology to build platforms that convert visitors into customers.",
            features: [
                "Next.js/React Enterprise Stack",
                "High-Conversion UI UX",
                "Marketing Tech Stack Sync",
                "Infinite Scale Infrastructure"
            ],
            deliverables: "Scalable Web Platform, Source Code, Growth Integration"
        }
    },
    {
        id: 'social-mgmt',
        label: 'Social Growth & Content',
        description: 'Building community-centric brands through strategic storytelling and content.',
        color: '#FF5C8D',
        activeColor: '#E91E63',
        metrics: { reach: '5M+', community: '100k+' },
        formFields: [
            { name: 'platforms', label: 'Priority Channels', type: 'text', placeholder: 'IG, LinkedIn, YouTube, Twitter' }
        ],
        modalInfo: {
            title: "Brand Storytelling",
            description: "Build a loyal community and long-term brand equity with strategic content management.",
            features: [
                "Story-Driven Content Calendars",
                "High-Engagement Micro-Content",
                "Influencer & Creator Management",
                "Omnichannel Growth Strategy"
            ],
            deliverables: "Content Strategy, Daily Management, Growth Analytics"
        }
    },
    {
        id: 'ai-animation',
        label: 'AI Brand Storytelling',
        description: 'Revolutionary AI-powered visual assets for modern brand identity.',
        color: '#BB86FC',
        activeColor: '#9965f4',
        metrics: { cost: '-85%', speed: '10x Faster' },
        formFields: [
            { name: 'videoStyle', label: 'Brand Aesthetic', type: 'select', options: ['Minimalist', 'Realistic', 'Cinematic', 'Hyper-Real'] }
        ],
        modalInfo: {
            title: "AI Visual Revolution",
            description: "Create disruptive visual content at scale using the latest in AI and creative design.",
            features: [
                "Automated Video Storytelling",
                "AI-Enhanced Brand Identity",
                "Rapid Creative Iteration",
                "Viral Content Production"
            ],
            deliverables: "AI Assets, Production Pipeline, Visual Strategy"
        }
    }
];
