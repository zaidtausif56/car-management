// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './components/CarList';
import SignUp from './components/SignUp';
import AddCar from './components/AddCar';
import ViewCar from './components/ViewCar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import LogoutButton from './components/LogoutButton';
// import EditCar from './components/EditCar';
import { getSession } from './supabaseClient'; // Use the new getSession method
import supabase from './supabaseClient'; // Import supabase client

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the current session using getSession
    const fetchSession = async () => {
      const { data, error } = await getSession();
      if (error) {
        console.error('Error fetching session:', error);
        setUser(null);
      } else {
        setUser(data?.session?.user || null);
      }
    };

    fetchSession();

    // Listen for changes in auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.unsubscribe(); // Cleanup listener on unmount
    };
  }, []); // Only run once when the component mounts

  return (
    <Router>
      <div>
        {/* Render Logout Button only if user is logged in */}
        {user && <LogoutButton />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/view-car/:id" element={<ViewCar />} />
          {/* <Route path="/edit-car/:id" element={<ViewCar />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
