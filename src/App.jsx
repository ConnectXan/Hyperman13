import React from 'react';
import { Route, Switch } from 'wouter';
import { Navigation } from './components/layout/Navigation';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';

function App() {
    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
            <Navigation />

            <Switch>
                <Route path="/" component={Home} />
                <Route path="/contact" component={Contact} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/case-study" component={CaseStudy} />

                {/* Fallback route */}
                <Route>
                    <div style={{
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-dim)'
                    }}>
                        404 | Page Not Found
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
