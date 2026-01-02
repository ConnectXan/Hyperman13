// Service Icons Component with modern monotone SVG icons
export const ServiceIcons = {
    'meta-ads': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/>
            <line x1="8" y1="21" x2="16" y2="21" stroke={color} strokeWidth="2"/>
            <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="2"/>
            <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="none"/>
        </svg>
    ),

    'google-ads': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" fill="none"/>
            <path d="m21 21-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <circle cx="11" cy="8" r="2" stroke={color} strokeWidth="2" fill="none"/>
        </svg>
    ),

    'shopify-dev': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 3h18v18H3zM9 9h6v6H9z" stroke={color} strokeWidth="2" fill="none"/>
            <path d="M9 1v6M15 1v6M9 17v6M15 17v6M1 9h6M17 9h6M1 15h6M17 15h6" stroke={color} strokeWidth="2"/>
        </svg>
    ),

    'web-dev': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polyline points="16 18 22 12 16 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="8 6 2 12 8 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="14" y1="4" x2="10" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
    ),

    'social-mgmt': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),

    'ai-animation': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
};

// Helper component to render service icon by ID
export const ServiceIcon = ({ serviceId, size = 24, color = 'currentColor', className = '', variant = 'default' }) => {
    const IconComponent = ServiceIcons[serviceId];
    
    if (!IconComponent) {
        // Fallback icon if service ID not found
        return (
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            </svg>
        );
    }
    
    return <IconComponent size={size} color={color} className={className} variant={variant} />;
};