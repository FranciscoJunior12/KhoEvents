import axios from "axios";
import { useState, useEffect } from "react";



// const url = import.meta.env.VITE_SOME_KEY;

export const api = axios.create({ baseURL: "http://localhost:3333/api/v1/", withCredentials: true });


export function useFetch(url) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        api.get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error)
            })
    }, []);

    return { data, error }
}