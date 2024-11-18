// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';  // Import the default export

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Sign up using Supabase Auth
        const { user, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            setError(error.message);  // Display error message if signup fails
        } else {
            navigate('/login');  // Redirect to login page if signup is successful
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>

            {error && <p>{error}</p>} {/* Display error if exists */}
            <p>
                Already have an account? <a href="/login">Sign Up</a>
            </p>
        </div>
    );
}

export default SignUp;
