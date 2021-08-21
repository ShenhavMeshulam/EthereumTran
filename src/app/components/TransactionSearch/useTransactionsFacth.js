import { useEffect, useState } from 'react';
import axios from 'axios';


const ETHRSCAN_API = process.env.ETHRSCAN_API;
const API_KEY = process.env.API_KEY;
const SORT_RESULTS = process.env.SORT_RESULTS;
const MODULE = process.env.MODULE;
const ACTION = process.env.ACTION;
const START_BLOCK = parseInt(process.env.START_BLOCK);
const END_BLOCK = parseInt(process.env.END_BLOCK);
const OFFSET = parseInt(process.env.OFFSET);

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
                const { data: { status, result } } = await axios.get(ETHRSCAN_API, {
                    params: {
                        module: MODULE,
                        action: ACTION,
                        address: ethereumAdress,
                        startblock: START_BLOCK,
                        endblock: END_BLOCK,
                        page: pageNumber,
                        offset: OFFSET,
                        sort: SORT_RESULTS,
                        apikey: API_KEY,
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