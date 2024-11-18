// // const supabase = require('../supabaseClient');
// // const multer = require('multer');

const supabase = require('../supabaseClient');
const multer = require('multer');


// Create a new car
exports.createCar = async (req, res) => {
    const { title, carType, description, tags } = req.body;
    const user = req.body.user;
    //const images = req.files.map((file) => file.path); // Save image file paths
    console.log("Create reached");
    const { data, error } = await supabase
        .from('cars')
        .insert({
            title,
            car_type: carType,
            description,
            tags,
            //images,
            user_id: user.id, // User ID from the authenticated user
        });

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Car created successfully', car: data });
};


// Get all cars for the logged-in user
exports.getCars = async (req, res) => {
    console.log("Get cars reached");
    const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', req.user);

    //console.log("Data :", data)
    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ data });
    //console.log(res.data);

};

// Get details of a specific car
exports.getCar = async (req, res) => {
    const carId = req.params.id;
    console.log("Get Car Reached");

    const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .eq('user_id', req.user)
        .single();

    if (error || !data) return res.status(404).json({ error: 'Car not found' });
    res.status(200).json({ data });
};

// Update a car
exports.updateCar = async (req, res) => {
    const carId = req.params.id;
    const { title, car_type, description, tags } = req.body;
    // const last_update = Date.parse();
    console.log("Update reached");
    const { error } = await supabase
        .from('cars')
        .update({ title, car_type, description, tags, })
        .eq('id', req.body.id)
    //.eq('user_id', req.user.id);

    if (error) return res.status(400).json({ error: error.message });
    else res.json({ message: 'Car updated successfully' });
};

// Delete a car
exports.deleteCar = async (req, res) => {
    const carId = req.params.id;
    console.log("Params: ", carId);

    const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId)
        .eq('user_id', req.user);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Car deleted successfully' });
};
