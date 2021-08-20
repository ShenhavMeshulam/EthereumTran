import { useEffect, useState } from 'react';
import axios from 'axios';

export default (ethereumAdress, pageNumber) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        try {
            var cancel;
            (async () => {
                setIsLoading(true);
                const { data: { status, result } } = await axios.get('https://api.etherscan.io/api', {
                    params: {
                        module: 'account',
                        action: 'txlist',
                        address: ethereumAdress,
                        startblock: 0,
                        endblock: 99999999,
                        page: pageNumber,
                        offset: 20,
                        sort: 'asc',
                        apikey: '3QVB3K2WRC6EG1UF3RVPD9TC4GI6E4SGA1'
                    },
                    cancelToken: new axios.CancelToken(c => cancel = c)
                })

                setIsLoading(false);
                setTransactions((prev) => status == 1 ? [...prev, ...result] : []);
                setHasMore(result.length > 0)
            })()
        } catch (e) {
            setError(true);
            if (axios.isCancel(e)) return;
        }

        return () => cancel()
    }, [ethereumAdress, pageNumber]);

    return { transactions, hasMore, isLoading, error };
};