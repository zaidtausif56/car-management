import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    // Function to redirect to login page
    const goToLogin = () => {
        navigate('/login');
    };

    // Function to redirect to sign up page
    const goToSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="auth-container">
            <h2>Welcome to the Car Management System</h2>
            <p>Choose an option to continue:</p>
            <div>
                <button onClick={goToLogin}>Log In</button>
                <button onClick={goToSignUp}>Sign Up</button>
            </div>
        </div>
    );
}

export default HomePage;
