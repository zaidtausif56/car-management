const express = require('express');
const multer = require('multer');
const {
    createCar,
    getCars,
    getCar,
    updateCar,
    deleteCar,
} = require('../controllers/carController');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

router.use(authenticateUser); // Apply the middleware to all routes

router.get('/', getCars); // List all cars for the logged-in user
router.get('/:id', getCar); // Get details of a specific car
router.post('/', createCar); //upload.array('images', 10), // Add a new car with up to 10 images
router.put('/:id', updateCar); // Update a specific car
router.delete('/:id', deleteCar); // Delete a specific car

module.exports = router;
