import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { deleteCar, viewCar, updateCar } from '../api';
import './viewCar.css'; // Optional: Add your custom styles here

const ViewCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchCar = async () => {

            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    setError(error.message); // Display error if authentication fails
                    return;
                }
                if (data.session === null) {
                    setError(error, 'Access token is missing. Please log in again.');
                    alert("'Account not logged in. Please log in again.'")
                    navigate('/');
                    return;
                }
                const accessToken = data.session.access_token;
                //console.log(accessToken) // Retrieve the token from localStorage
                const userid = data.session.user.id;

                console.log(id);
                const details = await viewCar(id, userid, accessToken); // Call the getCars function
                // if (!details.ok) {
                //     throw new Error('Failed to fetch car details');
                // }
                //const car = (Object.entries(JSON.parse(carData)));
                const carsList = details.data.data;
                console.log(carsList);
                setCar(carsList); // Update state with fetched cars
                setFormData(carsList);

            } catch (err) {
                setError(err.message);
            }
        };

        fetchCar();
    }, [id]);


    const handleDelete = async (id) => {
        const accessToken = localStorage.getItem('access_token'); // Retrieve the token from localStorage
        if (!accessToken) {
            setError(error, 'Access token is missing. Please log in again.');
            // setLoading(false);
            return;
        }
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                const userid = user.id;
                console.log(id);
                await deleteCar(id, userid, accessToken);
                setTimeout(function () {
                    alert('Car deleted successfully!');
                }, 500);
                navigate('/cars'); // Redirect to the car list page
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const { data: { user } } = await supabase.auth.getUser();
            console.log(user.id);
            const accessToken = localStorage.getItem('access_token');
            const { res, error } = updateCar(id, formData, accessToken);
            setCar(formData);
            if (!error) {
                setTimeout(function () {
                    alert('Car updated successfully!');
                }, 500);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating car details:', error);
            setIsEditing(true);
        }


    };


    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!car) {
        return <div className="loading">Loading car details...</div>;
    }

    return (
        <div className="car-details">
            <h2>{isEditing ? 'Edit Car' : 'View Car'} Details</h2>

            {isEditing ? (
                <form onSubmit={handleEdit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={setCar.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={setFormData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="car_type">Car Type</label>
                        <input
                            type="text"
                            id="car_type"
                            name="car_type"
                            value={setFormData.car_type}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="tags">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={setFormData.tags}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="image_urls">Image URLs (comma-separated)</label>
                        <input
                            type="text"
                            id="image_urls"
                            name="image_urls"
                            value={car.image_urls}
                            onChange={handleInputChange}
                        />
                    </div> */}
                    <button type="submit">Update Car</button>
                </form>
            ) : (
                <div>
                    <p><strong>Title:</strong> {car.title}</p>
                    <p><strong>Description:</strong> {car.description}</p>
                    <p><strong>Car Type:</strong> {car.car_type}</p>
                    <p><strong>Tags:</strong> {car.tags}</p>
                    <p><strong>Images:</strong> {car.image_urls ? car.image_urls : 'No images available'}</p>
                    <button onClick={() => handleDelete(car.id)} className="delete-button">Delete</button>

                </div>
            )}

            <div>
                {/* Toggle between view and edit mode */}
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel Edit' : 'Edit Car'}
                </button>
                {/* Back to car list */}
                <button onClick={() => navigate('/cars')}>Back to Car List</button>
            </div>
        </div>
    );
};

export default ViewCar;

