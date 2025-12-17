import React from 'react';
import { DashboardWidget } from '../components/ui/DashboardWidget';
import classes from './Portfolio.module.css';

function Portfolio() {
    const mockClients = [
        {
            name: 'Neon Logic Co.',
            service: 'Web Development',
            color: '#00f0ff',
            status: 'Live',
            widgets: [
                { title: 'Uptime', value: '99.99%', subtext: 'Last 30 days', type: 'stat' },
                { title: 'Project Completion', value: '100%', subtext: 'Delivered', type: 'progress' },
                { title: 'Avg Load Time', value: '0.4s', subtext: 'Top 1% Global', type: 'stat' }
            ]
        },
        {
            name: 'Vortex Apparel',
            service: 'Shopify Growth',
            color: '#96bf48',
            status: 'Scaling',
            widgets: [
                { title: 'ROAS', value: '6.4x', subtext: '+12% vs last month', type: 'stat' },
                { title: 'Monthly Revenue', value: '$124k', subtext: 'Record High', type: 'stat' },
                { title: 'Conversion Rate', value: '3.2%', subtext: 'Above Industry Avg', type: 'stat' }
            ]
        }
    ];

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <h1>Client Intelligence</h1>
                <p>Real-time transparency into our active partnerships.</p>
            </header>

            <div className={classes.clientGrid}>
                {mockClients.map((client, i) => (
                    <div key={i} className={classes.clientSection}>
                        <div className={classes.clientHeader}>
                            <h2 style={{ borderLeft: `4px solid ${client.color}`, paddingLeft: '1rem' }}>{client.name}</h2>
                            <span className={classes.badge} style={{ color: client.color, borderColor: client.color }}>
                                {client.status}
                            </span>
                        </div>

                        <div className={classes.widgetRow}>
                            {client.widgets.map((widget, idx) => (
                                <DashboardWidget
                                    key={idx}
                                    {...widget}
                                    color={client.color}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Portfolio;
