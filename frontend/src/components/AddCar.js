import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { createCar } from '../api';
import supabase from '../supabaseClient';

const AddCar = () => {
    const [formData, setFormData] = useState({
        title: "",
        carType: "",
        description: "",
        tags: "",
        images: [],
    });
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // const handleImageChange = (e) => {
    //     setFormData([...e.target.files]);
    // };

    // Handle file input changes
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            images: Array.from(e.target.files), // Convert FileList to Array
        });
    };

    const Cars = async () => {

        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                setError(error.message); // Display error if authentication fails
                return;
            }
            if (data.session === null) {
                setError(error, 'Access token is missing. Please log in again.');
                alert("'Access token is missing. Please log in again.'")
                navigate('/');
                return;
            }
        } catch (err) {
            setError('Failed to fetch cars. Please try again later.');
        }
    }
    Cars();

    const handleAddCar = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.getSession();
            const accessToken = data.session.access_token;
            //console.log(accessToken) // Retrieve the token from localStorage
            const userData = data.session.user;
            //formData.append('user', user);
            // const accessToken = localStorage.getItem('access_token');
            const response = createCar(formData, userData, accessToken)
            console.log(response);
            setTimeout(function () {
                alert('Car added successfully!');
            }, 500);
            navigate('/cars');
        } catch (error) { console.log(error); }

    };

    return (
        <div className="add-car">
            <h2>Add Car</h2>
            <form onSubmit={handleAddCar}>
                {/* Title */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="title" style={{ display: "block", fontWeight: "bold" }}>
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        style={{
                            padding: "8px",
                            width: "100%",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>

                {/* Car Type */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="carType" style={{ display: "block", fontWeight: "bold" }}>
                        Car Type:
                    </label>
                    <input
                        type="text"
                        id="carType"
                        name="carType"
                        value={formData.carType}
                        onChange={handleInputChange}
                        required
                        style={{
                            padding: "8px",
                            width: "100%",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="description" style={{ display: "block", fontWeight: "bold" }}>
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        style={{
                            padding: "8px",
                            width: "100%",
                            height: "80px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    ></textarea>
                </div>

                {/* Tags */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="tags" style={{ display: "block", fontWeight: "bold" }}>
                        Tags:
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        required
                        style={{
                            padding: "8px",
                            width: "100%",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>

                {/* Images */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="images" style={{ display: "block", fontWeight: "bold" }}>
                        Images (up to 10):
                    </label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        style={{ padding: "8px" }}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Add Car
                </button>
            </form>
            <button><Link to="/cars">Back</Link></button>
        </div>
    );
};

export default AddCar;
