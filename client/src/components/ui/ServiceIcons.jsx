import React from 'react';

// Service Icons Component with themed SVG icons
export const ServiceIcons = {
    'meta-ads': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => {
        if (variant === 'filled') {
            return (
                <svg 
                    width={size} 
                    height={size} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="10" fill={color} opacity="0.1"/>
                    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
                    <circle cx="12" cy="12" r="2" fill={color}/>
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            );
        }
        return (
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="2" fill={color}/>
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        );
    },

    'google-ads': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => {
        if (variant === 'filled') {
            return (
                <svg 
                    width={size} 
                    height={size} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="11" cy="11" r="8" fill={color} opacity="0.1"/>
                    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.5"/>
                    <path d="m21 21-4.35-4.35" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="11" cy="11" r="3" fill={color}/>
                </svg>
            );
        }
        return (
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.5"/>
                <path d="m21 21-4.35-4.35" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="11" cy="11" r="3" fill={color} opacity="0.3"/>
                <path d="M8 11h6M11 8v6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        );
    },

    'shopify-dev': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => {
        if (variant === 'filled') {
            return (
                <svg 
                    width={size} 
                    height={size} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke={color} strokeWidth="1.5" fill={color} opacity="0.1"/>
                    <line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.5"/>
                    <path d="M16 10a4 4 0 0 1-8 0" stroke={color} strokeWidth="1.5" fill="none"/>
                    <circle cx="9" cy="13" r="1" fill={color}/>
                    <circle cx="15" cy="13" r="1" fill={color}/>
                </svg>
            );
        }
        return (
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke={color} strokeWidth="1.5" fill="none"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.5"/>
                <path d="M16 10a4 4 0 0 1-8 0" stroke={color} strokeWidth="1.5" fill="none"/>
                <circle cx="9" cy="13" r="1" fill={color}/>
                <circle cx="15" cy="13" r="1" fill={color}/>
            </svg>
        );
    },

    'web-dev': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => {
        if (variant === 'filled') {
            return (
                <svg 
                    width={size} 
                    height={size} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="2" y="4" width="20" height="16" rx="2" fill={color} opacity="0.1" stroke={color} strokeWidth="1.5"/>
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="2" fill={color}/>
                </svg>
            );
        }
        return (
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4l-2 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="2" fill={color} opacity="0.3"/>
            </svg>
        );
    },

    'social-mgmt': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => {
        if (variant === 'filled') {
            return (
                <svg 
                    width={size} 
                    height={size} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill={color}/>
                    <circle cx="6" cy="6" r="2" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3"/>
                    <circle cx="18" cy="6" r="2" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3"/>
                    <circle cx="6" cy="18" r="2" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3"/>
                    <circle cx="18" cy="18" r="2" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3"/>
                    <path d="M9.09 9.09l5.82-5.82M14.91 9.09l5.82 5.82M9.09 14.91l-5.82 5.82M14.91 14.91l5.82-5.82" stroke={color} strokeWidth="1.5"/>
                </svg>
            );
        }
        return (
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3"/>
                <circle cx="6" cy="6" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
                <circle cx="18" cy="6" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
                <circle cx="6" cy="18" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
                <circle cx="18" cy="18" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
                <path d="M9.09 9.09l5.82-5.82M14.91 9.09l5.82 5.82M9.09 14.91l-5.82 5.82M14.91 14.91l5.82-5.82" stroke={color} strokeWidth="1.5"/>
            </svg>
        );
    },

    'ai-animation': ({ size = 24, color = 'currentColor', className = '', variant = 'default' }) => {
        if (variant === 'filled') {
            return (
                <svg 
                    width={size} 
                    height={size} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points="5,3 19,12 5,21" fill={color}/>
                    <circle cx="8" cy="8" r="1" fill="white"/>
                    <circle cx="8" cy="16" r="1" fill="white"/>
                    <circle cx="16" cy="12" r="1" fill="white"/>
                    <path d="M8 8l8 4M8 16l8-4" stroke="white" strokeWidth="0.8"/>
                </svg>
            );
        }
        return (
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <polygon points="5,3 19,12 5,21" fill={color} opacity="0.3"/>
                <path d="M5 3l14 9-14 9V3z" stroke={color} strokeWidth="1.5" fill="none"/>
                <circle cx="8" cy="8" r="1" fill={color}/>
                <circle cx="8" cy="16" r="1" fill={color}/>
                <circle cx="16" cy="12" r="1" fill={color}/>
                <path d="M8 8l8 4M8 16l8-4" stroke={color} strokeWidth="0.8" opacity="0.6"/>
            </svg>
        );
    }
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
                <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="3" fill={color}/>
            </svg>
        );
    }
    
    return <IconComponent size={size} color={color} className={className} variant={variant} />;
};