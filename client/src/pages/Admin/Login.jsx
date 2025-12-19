import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAdminStore } from '../../store/adminStore';
import classes from './Admin.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAdminStore();
    const [, setLocation] = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) setLocation('/admin');
    };

    return (
        <div className={classes.loginContainer}>
            <form className={classes.loginCard} onSubmit={handleSubmit}>
                <h2>Hyper13 Admin</h2>
                <p>Secure Content Engine Access</p>
                {error && <div className={classes.error}>{error}</div>}
                <div className={classes.inputGroup}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={classes.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Authenticating...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
