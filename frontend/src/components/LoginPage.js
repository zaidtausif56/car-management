import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient'; // Ensure correct path to supabaseClient.js

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous error

        try {
            // Attempt to sign in with Supabase
            const { user, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            // if (data?.session.access_token) {
            //     // Store the access token in local storage
            //     localStorage.setItem('access_token', data.access_token);
            //     alert('Login successful!');
            //     navigate('/cars'); // Redirect to the CarList page
            // } else {
            //     throw new Error('Login successful, but no access token received.');
            // }
            if (error) {
                setError(error.message); // Display error if authentication fails
                return;
            }
            else {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    setError(error.message); // Display error if authentication fails
                    return;
                }
                //console.log(data.session.access_token);
                //setAccessToken(data.session.access_token);
                localStorage.setItem('access_token', data.session.access_token); // Store token in localStorage
                navigate('/cars');
            }
            // Send this token to the backend
            //localStorage.setItem('access_token', user.session.access_token);
            //console.log(user.session);
            // On successful login, redirect to the cars page (or any other page you want)
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login to Your Account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            <p>
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
}

export default Login;
