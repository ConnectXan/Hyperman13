export const servicesConfig = [
    {
        id: 'meta-ads',
        label: 'Meta Ads',
        description: 'High-conversion campaigns on Facebook & Instagram in India.',
        color: '#DAC0A3',
        activeColor: '#C8A17E',
        metrics: { roas: '4.8x', spend: '₹5L+/mo' },
        formFields: [
            { name: 'monthlyBudget', label: 'Monthly Ad Budget', type: 'select', options: ['< ₹1L', '₹1L - ₹5L', '₹5L - ₹20L', '₹20L+'] }
        ],
        modalInfo: {
            title: "Meta Ads Excellence",
            description: "Dominate Facebook & Instagram with data-driven campaigns optimized for the Indian market.",
            features: [
                "Advanced audience targeting",
                "A/B creative testing",
                "Real-time ROAS optimization",
                "Conversion tracking setup"
            ],
            deliverables: "Campaign strategy, ad creatives, performance reports"
        }
    },
    {
        id: 'google-ads',
        label: 'Google Ads',
        description: 'Search, Display, and Video campaigns for the Indian market.',
        color: '#F4D03F',
        activeColor: '#F1C40F',
        metrics: { roas: '5.5x', conversions: '1.5k+' },
        formFields: [
            { name: 'targetRegion', label: 'Target Region', type: 'text', placeholder: 'e.g. Pan India, Mumbai, Bangalore' }
        ],
        modalInfo: {
            title: "Google Ads Mastery",
            description: "Capture high-intent customers with precision-targeted Search, Display, and Video campaigns.",
            features: [
                "Keyword research & optimization",
                "Smart bidding strategies",
                "YouTube video ads",
                "Performance tracking & analytics"
            ],
            deliverables: "Ad strategy, campaign setup, monthly optimization reports"
        }
    },
    {
        id: 'shopify-dev',
        label: 'Shopify Development',
        description: 'Custom themes and apps for Indian D2C brands.',
        color: '#7DCEA0',
        activeColor: '#52BE80',
        metrics: { uptime: '99.99%', loadTime: '0.6s' },
        formFields: [
            { name: 'storeUrl', label: 'Current Store URL (if any)', type: 'text', placeholder: 'e.g. www.your-brand.in' }
        ],
        modalInfo: {
            title: "Shopify Expertise",
            description: "Build high-converting Shopify stores tailored for Indian D2C brands.",
            features: [
                "Custom theme development",
                "Payment gateway integration (Razorpay, Paytm)",
                "App development & integration",
                "Speed optimization"
            ],
            deliverables: "Fully functional Shopify store, custom theme, technical support"
        }
    },
    {
        id: 'web-dev',
        label: 'Web Development',
        description: 'Next-gen web solutions for high-growth Indian startups.',
        color: '#3498DB',
        activeColor: '#2E86C1',
        metrics: { lighthouse: '100', deployments: 'Daily' },
        formFields: [
            { name: 'projectType', label: 'Project Type', type: 'select', options: ['E-commerce', 'SaaS Platform', 'Corporate Portal'] }
        ],
        modalInfo: {
            title: "Web Development",
            description: "Build lightning-fast, scalable web applications with modern technologies.",
            features: [
                "React/Next.js development",
                "Responsive design",
                "SEO optimization",
                "Cloud deployment"
            ],
            deliverables: "Production-ready website, source code, deployment & hosting setup"
        }
    },
    {
        id: 'social-mgmt',
        label: 'Social Media Mgmt',
        description: 'Organic growth strategies for the Indian demographic.',
        color: '#FF5C8D',
        activeColor: '#E91E63',
        metrics: { engagement: '+350%', followers: '+15k' },
        formFields: [
            { name: 'platforms', label: 'Priority Platforms', type: 'text', placeholder: 'IG, TikTok (Intl), LinkedIn, WhatsApp...' }
        ],
        modalInfo: {
            title: "Social Media Management",
            description: "Grow your brand presence with strategic content and community management.",
            features: [
                "Content calendar & creation",
                "Community engagement",
                "Influencer collaborations",
                "Analytics & growth tracking"
            ],
            deliverables: "Monthly content plan, posts & stories, engagement reports"
        }
    },
    {
        id: 'ai-animation',
        label: 'AI 2D Animation',
        description: 'Cutting-edge AI visuals for Indian brands and agencies.',
        color: '#BB86FC',
        activeColor: '#9965f4',
        metrics: { production: '-90% time', uniqueness: '100%' },
        formFields: [
            { name: 'videoStyle', label: 'Preferred Style', type: 'select', options: ['Abstract', 'Realistic', 'Bollywood Style', 'Anime'] }
        ],
        modalInfo: {
            title: "AI 2D Animation",
            description: "Create stunning animated content with AI-powered tools and human creativity.",
            features: [
                "Character animation",
                "Explainer videos",
                "Social media animations",
                "Brand storytelling"
            ],
            deliverables: "Animated videos, source files, revisions included"
        }
    }
];
