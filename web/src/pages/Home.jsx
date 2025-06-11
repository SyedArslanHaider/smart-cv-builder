import { useState, useEffect } from "react";
import { fetchData } from "../apiClient"

export default function Home(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const loadData = async () => {
            try {
              setLoading(true);
              setError(null);
              const result = await fetchData('/example');
              setData(result);
            } catch (err) {
              setError(err.message);
              console.error("Failed to fetch data:", err);
            } finally {
              setLoading(false);
            }
          };

        loadData()
    },[]);

    if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
    
      if (!data) {
        return <p>No data available.</p>;
      }


    return <h1>Hello: {data?.data?.key}</h1>
}