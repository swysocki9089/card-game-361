import React, { useState, useEffect } from 'react';


function Home() {
    const [data, setData] = useState(null); // State to store API response
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5161/api/example/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse response as JSON
            })
            .then(data => {
                setData(data); // Save data in state
                setLoading(false); // Set loading to false
            })
            .catch(err => {
                setError(err.message); // Save error message
                setLoading(false); // Set loading to false
            });
    }, []); // Empty dependency array ensures this runs only once

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Home Page</h2>
            <p>{data?.message || 'No data available'}</p>
        </div>
    );
}

export default Home;