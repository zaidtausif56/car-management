import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCars } from '../api';
import supabase from '../supabaseClient';
import './CarList.css';
import { useNavigate } from 'react-router-dom';


const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const Cars = async () => {

            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    setError(error.message); // Display error if authentication fails
                    return;
                }
                if (data.session === null) {
                    setError(error, 'Access token is missing. Please log in again.');
                    alert("'Account not logged in. Please log in again.'")
                    setLoading(false);
                    navigate('/');
                    return;
                }
                const accessToken = data.session.access_token;
                //console.log(accessToken) // Retrieve the token from localStorage
                const userid = data.session.user.id;
                const carData = await fetchCars(userid, accessToken); // Call the getCars function
                const carsList = carData.data.data;
                setCars(carsList);
            } catch (err) {
                setError('Failed to fetch cars. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        Cars();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredCars(cars); // Show all cars if searchTerm is empty
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const results = cars.filter((car) =>
                ["title", "tags", "description", "car_type"].some((key) =>
                    car[key]?.toLowerCase().includes(lowerCaseSearchTerm)
                )
            );
            setFilteredCars(results);
        }
    }, [searchTerm, cars]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div>
            <h1>Car List</h1>
            <button><Link to="/add-car">Add Car</Link></button>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    padding: "8px",
                    marginBottom: "20px",
                    width: "80%",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />

            {/* Filtered Cars */}
            <div className="carlist">
                {loading && <p>Loading cars...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <div key={car.id} className="car-card">
                            <h3>{car.title}</h3>
                            <p>{car.description}</p>
                            <p>Type: {car.car_type}</p>
                            <p>Tags: {car.tags}</p>
                            <Link to={`/view-car/${car.id}`}>Edit/View Car</Link>
                        </div>
                    ))
                ) : (
                    !loading && <p>No cars found matching "{searchTerm}"</p>
                )}
            </div>

        </div>
    );

};

export default CarList;

