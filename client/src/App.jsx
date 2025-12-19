import React from 'react';
import { Route, Switch } from 'wouter';
import { Navigation } from './components/layout/Navigation';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';

import { ThemeProvider } from './context/ThemeContext';

import Marketplace from './pages/Marketplace';
import Animnow from './pages/Animnow';
import HyperControl from './pages/HyperControl';
import AdminPanel from './pages/Admin/AdminPanel';
import Login from './pages/Admin/Login';

function App() {
    return (
        <ThemeProvider>
            <div className="app">
                <Navigation />
                <main>
                    <Switch>
                        <Route path="/" component={Home} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/portfolio" component={Portfolio} />
                        <Route path="/case-study" component={CaseStudy} />
                        <Route path="/marketplace" component={Marketplace} />
                        <Route path="/marketplace/animnow" component={Animnow} />
                        <Route path="/marketplace/hyper-control" component={HyperControl} />

                        <Route path="/admin/login" component={Login} />
                        <Route path="/admin" component={AdminPanel} />
                        <Route>
                            <div style={{ padding: '100px', textAlign: 'center' }}>
                                404 | Page Not Found
                            </div>
                        </Route>
                    </Switch>
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
