// components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../supabaseClient';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/'); // Redirect to the login page after logout
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;
