export const portfolioData = [
    {
        id: 'vedic-wellness',
        name: 'Vedic Wellness India',
        serviceId: 'meta-ads',
        status: 'Scaling Aggressively',
        group: 'live',
        progress: 88,
        color: '#DAC0A3',
        industry: 'Health & Wellness',
        duration: '8 months',
        teamSize: 3,
        description: 'Ayurvedic wellness brand targeting health-conscious millennials across tier-1 cities',
        metrics: {
            roas: 4.8,
            revenue: 1800000,
            cac: 380,
            conversion: 3.2,
            totalBudget: 1200000,
            clientSatisfaction: 9.5,
            onTimeDelivery: true,
            growthRate: 18.5
        },
        testimonial: {
            quote: "Hyperman13 transformed our digital presence. Our ROAS improved by 340% in just 6 months.",
            author: "Priya Sharma, Founder"
        },
        widgets: [
            { title: 'ROAS', value: '4.8x', subtext: 'Target: 4.0x', type: 'stat', icon: '📈' },
            { title: 'Managed Spend', value: '₹12L', subtext: 'Monthly Operating', type: 'stat', icon: '💰' },
            { title: 'CAC', value: '₹380', subtext: '-12% vs Prev Month', type: 'stat', icon: '👥' },
            { title: 'Conversion Rate', value: '3.2%', subtext: 'Industry avg: 1.8%', type: 'stat', icon: '🎯' }
        ],
        technologies: ['Facebook Ads Manager', 'Google Analytics', 'Shopify Plus', 'Klaviyo'],
        results: {
            before: { revenue: '₹2.5L/month', roas: '1.8x', cac: '₹650' },
            after: { revenue: '₹18L/month', roas: '4.8x', cac: '₹380' }
        }
    },
    {
        id: 'rajputana-d2c',
        name: 'Royal Rajputana D2C',
        serviceId: 'shopify-dev',
        status: 'Handover Complete',
        group: 'finished',
        progress: 100,
        color: '#7DCEA0',
        industry: 'Fashion & Lifestyle',
        duration: '4 months',
        teamSize: 4,
        description: 'Premium ethnic wear brand with focus on modern Indian fashion and global shipping',
        metrics: {
            revenue: 240000,
            conversion: 3.8,
            loadTime: 0.8,
            mobileScore: 98,
            totalBudget: 450000,
            clientSatisfaction: 9.8,
            onTimeDelivery: true,
            growthRate: 22.3
        },
        testimonial: {
            quote: "The new store design increased our conversion rate by 180%. Exceptional work!",
            author: "Rajesh Mehra, CEO"
        },
        widgets: [
            { title: 'Daily Revenue', value: '₹2.4L', subtext: 'Post-Launch Peak', type: 'stat', icon: '💎' },
            { title: 'Core Web Vitals', value: '98/100', subtext: 'Mobile Performance', type: 'stat', icon: '⚡' },
            { title: 'Conversion Rate', value: '3.8%', subtext: 'Industry Benchmark: 2.1%', type: 'stat', icon: '🛒' },
            { title: 'Page Load Speed', value: '0.8s', subtext: 'Lightning Fast', type: 'stat', icon: '🚀' }
        ],
        technologies: ['Shopify Plus', 'React', 'Liquid', 'Razorpay', 'Shiprocket'],
        results: {
            before: { conversion: '1.2%', loadTime: '4.2s', mobileScore: '45' },
            after: { conversion: '3.8%', loadTime: '0.8s', mobileScore: '98' }
        }
    },
    {
        id: 'bengaluru-tech',
        name: 'Bengaluru Tech Hub',
        serviceId: 'web-dev',
        status: 'Development',
        group: 'live',
        progress: 65,
        color: '#3498DB',
        industry: 'Technology',
        duration: '6 months',
        teamSize: 5,
        description: 'B2B SaaS platform for startup ecosystem management and investor relations',
        metrics: {
            progress: 65,
            featuresCompleted: 82,
            codeCoverage: 94,
            activeDevs: 4,
            totalBudget: 2500000,
            clientSatisfaction: 9.2,
            onTimeDelivery: false,
            growthRate: 12.8
        },
        testimonial: {
            quote: "Their technical expertise and agile approach helped us launch 2 months ahead of schedule.",
            author: "Ankit Gupta, CTO"
        },
        widgets: [
            { title: 'Build Health', value: 'Stable', subtext: 'CI/CD Pipelines', type: 'stat', icon: '🔧' },
            { title: 'Feature Set', value: '82%', subtext: 'Sprint 8/12', type: 'progress', icon: '📋' },
            { title: 'Active Devs', value: '4', subtext: 'High Velocity', type: 'stat', icon: '👨‍💻' },
            { title: 'Code Coverage', value: '94%', subtext: 'Test Suite', type: 'stat', icon: '🧪' }
        ],
        technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'TypeScript'],
        results: {
            before: { features: '0', tests: '0%', deployment: 'Manual' },
            after: { features: '45+', tests: '94%', deployment: 'Automated CI/CD' }
        }
    },
    {
        id: 'mumbai-glam',
        name: 'Mumbai Glam Cosmetics',
        serviceId: 'social-mgmt',
        status: 'Content Production',
        group: 'live',
        progress: 42,
        color: '#FF5C8D',
        industry: 'Beauty & Cosmetics',
        duration: '5 months',
        teamSize: 3,
        description: 'Premium cosmetics brand targeting Gen-Z with sustainable beauty solutions',
        metrics: {
            engagement: 8.4,
            reach: 1200000,
            leads: 450,
            followers: 85000,
            totalBudget: 350000,
            clientSatisfaction: 8.9,
            onTimeDelivery: true,
            growthRate: 15.2
        },
        testimonial: {
            quote: "Our Instagram engagement increased by 450%. The content strategy is phenomenal!",
            author: "Kavya Patel, Brand Manager"
        },
        widgets: [
            { title: 'Weekly Reach', value: '1.2M', subtext: 'Organic Focus', type: 'stat', icon: '📱' },
            { title: 'Engagement', value: '8.4%', subtext: 'High Interaction', type: 'stat', icon: '❤️' },
            { title: 'Inbound Leads', value: '450+', subtext: 'Weekly Average', type: 'stat', icon: '📧' },
            { title: 'UGC Content', value: '120+', subtext: 'Monthly Posts', type: 'stat', icon: '📸' }
        ],
        technologies: ['Instagram Creator Studio', 'Canva Pro', 'Later', 'Sprout Social'],
        results: {
            before: { followers: '12K', engagement: '1.8%', leads: '50/week' },
            after: { followers: '85K', engagement: '8.4%', leads: '450/week' }
        }
    },
    {
        id: 'jaipur-jewels',
        name: 'Jaipur Jewels',
        serviceId: 'google-ads',
        status: 'Optimizing Filters',
        group: 'live',
        progress: 75,
        color: '#F4D03F',
        industry: 'Jewelry & Luxury',
        duration: '7 months',
        teamSize: 2,
        description: 'Traditional jewelry house expanding online presence with modern digital marketing',
        metrics: {
            roas: 5.8,
            ctr: 4.8,
            qualityScore: 9.2,
            monthlyProfit: 820000,
            totalBudget: 950000,
            clientSatisfaction: 9.6,
            onTimeDelivery: true,
            growthRate: 19.7
        },
        testimonial: {
            quote: "ROI improved by 280%. Their Google Ads expertise is unmatched in the jewelry sector.",
            author: "Vikram Singh, Managing Director"
        },
        widgets: [
            { title: 'Impression Share', value: '82%', subtext: 'Top of Page', type: 'stat', icon: '👁️' },
            { title: 'Profitability', value: '₹8.2L', subtext: 'Net Monthly', type: 'stat', icon: '💰' },
            { title: 'Quality Score', value: '9.2/10', subtext: 'Excellent', type: 'stat', icon: '⭐' },
            { title: 'CTR', value: '4.8%', subtext: 'Above Industry Avg', type: 'stat', icon: '🖱️' }
        ],
        technologies: ['Google Ads', 'Google Analytics', 'Google Tag Manager', 'Merchant Center'],
        results: {
            before: { roas: '2.1x', ctr: '1.2%', qualityScore: '6.5' },
            after: { roas: '5.8x', ctr: '4.8%', qualityScore: '9.2' }
        }
    },
    {
        id: 'ai-visuals-delhi',
        name: 'Cyber Delhi AI',
        serviceId: 'ai-animation',
        status: 'Deployment Complete',
        group: 'finished',
        progress: 100,
        color: '#BB86FC',
        industry: 'Technology & AI',
        duration: '3 months',
        teamSize: 2,
        description: 'AI startup creating next-gen visual content for enterprise clients and agencies',
        metrics: {
            assetsProduced: 120,
            productionTimeSaved: 85,
            satisfaction: 9.8,
            costSaved: 1200000,
            totalBudget: 300000,
            clientSatisfaction: 9.8,
            onTimeDelivery: true,
            growthRate: 25.4
        },
        testimonial: {
            quote: "The AI animations revolutionized our client presentations. Production time reduced by 85%!",
            author: "Rohit Sharma, Creative Director"
        },
        widgets: [
            { title: 'Assets Produced', value: '120+', subtext: 'AI-Generated 2D', type: 'stat', icon: '🎨' },
            { title: 'Production Time', value: '-85%', subtext: 'vs Traditional', type: 'stat', icon: '⏱️' },
            { title: 'Client Satisfaction', value: '9.8/10', subtext: 'Average Rating', type: 'stat', icon: '😊' },
            { title: 'Cost Savings', value: '₹12L', subtext: 'Annual Savings', type: 'stat', icon: '💸' }
        ],
        technologies: ['Stable Diffusion', 'After Effects', 'Lottie', 'Figma', 'Runway ML'],
        results: {
            before: { productionTime: '5 days', cost: '₹25K/video', quality: '7/10' },
            after: { productionTime: '8 hours', cost: '₹4K/video', quality: '9.5/10' }
        }
    },
    // New projects to add more variety
    {
        id: 'kerala-spices',
        name: 'Kerala Spice Co.',
        serviceId: 'meta-ads',
        status: 'Launch Phase',
        group: 'live',
        progress: 25,
        color: '#DAC0A3',
        industry: 'Food & Beverages',
        duration: '2 months',
        teamSize: 2,
        description: 'Organic spice brand expanding from local Kerala markets to pan-India distribution',
        metrics: {
            roas: 2.8,
            audienceReach: 2500000,
            testBudget: 200000,
            totalBudget: 200000,
            clientSatisfaction: 8.2,
            onTimeDelivery: true,
            growthRate: 8.5
        },
        testimonial: {
            quote: "Early results are promising. Looking forward to scaling with Hyperman13.",
            author: "Meera Nair, Founder"
        },
        widgets: [
            { title: 'Initial ROAS', value: '2.8x', subtext: 'Growing Steadily', type: 'stat', icon: '🌶️' },
            { title: 'Test Budget', value: '₹2L', subtext: 'Monthly Allocation', type: 'stat', icon: '💰' },
            { title: 'Audience Size', value: '2.5M', subtext: 'Qualified Reach', type: 'stat', icon: '🎯' }
        ],
        technologies: ['Facebook Ads Manager', 'Instagram Shopping', 'WhatsApp Business'],
        results: {
            before: { sales: 'Local only', reach: '5K', channels: '1' },
            after: { sales: 'Pan-India', reach: '2.5M', channels: '4' }
        }
    },
    {
        id: 'pune-fitness',
        name: 'Pune Fitness Studio',
        serviceId: 'social-mgmt',
        status: 'Content Strategy',
        group: 'finished',
        progress: 100,
        color: '#FF5C8D',
        industry: 'Health & Fitness',
        duration: '6 months',
        teamSize: 3,
        description: 'Boutique fitness studio chain building community-driven social presence',
        metrics: {
            members: 340,
            followers: 25000,
            engagement: 12.3,
            ugcPosts: 200,
            totalBudget: 180000,
            clientSatisfaction: 9.4,
            onTimeDelivery: true,
            growthRate: 16.8
        },
        testimonial: {
            quote: "Membership increased by 200% through social media. Outstanding community building!",
            author: "Arjun Desai, Owner"
        },
        widgets: [
            { title: 'New Members', value: '340+', subtext: 'Social Referrals', type: 'stat', icon: '💪' },
            { title: 'Community Size', value: '25K', subtext: 'Active Followers', type: 'stat', icon: '👥' },
            { title: 'Engagement Rate', value: '12.3%', subtext: 'Fitness Industry High', type: 'stat', icon: '🔥' },
            { title: 'UGC Posts', value: '200+', subtext: 'Monthly Member Posts', type: 'stat', icon: '📱' }
        ],
        technologies: ['Instagram', 'YouTube', 'TikTok', 'WhatsApp Groups', 'Calendly'],
        results: {
            before: { members: '120', followers: '800', engagement: '2.1%' },
            after: { members: '360', followers: '25K', engagement: '12.3%' }
        }
    }
];
