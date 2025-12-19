import { useState, useEffect } from 'react';

const API_BASE = '/api';

export const useContent = (section, fallback = []) => {
    const [data, setData] = useState(fallback);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE}/blocks/${section}`);
                if (!res.ok) throw new Error('API error');
                const blocks = await res.json();

                if (isMounted) {
                    const extracted = blocks.map(b => b.data);
                    if (extracted.length > 0) {
                        setData(extracted);
                    }
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, [section]);

    return { data, loading, error };
};
