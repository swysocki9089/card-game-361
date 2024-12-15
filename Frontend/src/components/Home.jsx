import React, { useState, useEffect } from 'react';


function Home() {
    const [items, setItems] = useState([]); // State to store API response
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5215/api/Users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse response as JSON
            })
            .then(data => {
                setItems(data); // Save data in state
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
            <ul>
                {items.map(item => (
                    <li key={item.userID}>
                        <h3>{item.username}</h3>
                        <p>{item.passwordHash}</p>
                        <p>{item.email}</p>
                        <p>{item.creationDate}</p>
                        <p>{item.lastLogin}</p>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;