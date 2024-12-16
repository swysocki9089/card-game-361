import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setLoading(true); // Start loading state
        setError(null);    // Reset error

        try {
            // Make API request using fetch or axios
            const response = await fetch('http://localhost:5215/api/Users/'+username+'/'+password, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json(); // Parse the response JSON
            console.log('Login successful:', data);
            if (data === 1) { navigate('../Solitaire'); }  // navigate if successful


            // Handle the successful login (store token, navigate to dashboard, etc.)

        } catch (error) {
            setError(error.message); // Set error state if the API call fails
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

    );
}

export default LoginForm;