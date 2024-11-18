import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchCars = (userData, access_token) => {
    return axios.get(`${API_BASE_URL}/cars`,
        {
            headers: {
                'Content-Type': `application/Json`,
                'userId': userData,
                Authorization: `Bearer ${access_token}`,

            }
        });
}
export const viewCar = (id, userData, access_token) => {
    return axios.get(`${API_BASE_URL}/cars/${id}`,
        {
            headers: {
                'Content-Type': `application/Json`,
                'userId': userData,
                Authorization: `Bearer ${access_token}`,

            }
        });
}
export const createCar = (carData, userData, access_token) => {
    //const formData = new FormData();
    //Object.keys(carData).forEach((key) => formData.append(key, carData[key]));
    //images.forEach((image) => formData.append('images', image));
    console.log(JSON.stringify(carData));
    return axios.post(`${API_BASE_URL}/cars`,
        carData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'userId': userData,
                Authorization: `Bearer ${access_token}`
            }
        });
};
export const updateCar = (id, carData, access_token) => {
    return axios.put(`${API_BASE_URL}/cars/${id}`,
        JSON.stringify(carData),
        { headers: { 'Content-Type': `application/Json`, Authorization: `Bearer ${access_token}` } });
}
export const deleteCar = (id, userData, access_token) => axios.delete(`${API_BASE_URL}/cars/${id}`,
    {
        headers: {
            'userId': userData,
            Authorization: `Bearer ${access_token}`,

        }
    });
