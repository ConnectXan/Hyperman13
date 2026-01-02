import React from 'react';
import { ServiceIcon } from './ServiceIcons';
import { servicesConfig } from '../../data/servicesConfig';

// Quick preview component to see all icons
export const IconPreview = () => {
    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem', 
            padding: '2rem',
            background: 'var(--color-surface)',
            borderRadius: '8px'
        }}>
            {servicesConfig.map(service => (
                <div key={service.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: 'var(--color-bg)',
                    borderRadius: '8px',
                    border: `1px solid ${service.color}20`
                }}>
                    <ServiceIcon 
                        serviceId={service.id}
                        size={24}
                        color={service.color}
                    />
                    <div>
                        <div style={{ 
                            fontWeight: 'bold', 
                            color: service.color,
                            fontSize: '0.9rem'
                        }}>
                            {service.label}
                        </div>
                        <div style={{ 
                            fontSize: '0.75rem', 
                            color: 'var(--color-text-dim)',
                            marginTop: '0.25rem'
                        }}>
                            {service.id}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};