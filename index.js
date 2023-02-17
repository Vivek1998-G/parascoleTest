import express from 'express';
import mongoose from 'mongoose';
const { Schema } = mongoose;
import { userSchema } from './dbModel.js'
const app = express();

app.use(express.json());

const User = mongoose.model('User', userSchema);

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://Vaccination:Vivek1234@cluster0.pwozf2l.mongodb.net/?retryWrites=true&w=majority"
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => console.log(`DB connection Err`, err));


// API for Adding new User

app.post('/addUser', async (req, res) => {
    const data = req.body
    console.log(data)
    User.insertMany([data], function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("User added");
            res.send("user added successfully")
        }
    });
})

//API for getting all near users
app.get("/getByLocation/:long/:lat", async (req, res) => {
    const lat = req.params.lat
    const long = req.params.long
    console.log(lat, long)
    const distance = 1;
    const unitValue = 1000;
    const users = await User.find({
        location: {
            $near: {
                $maxDistance: distance * unitValue, // distance in meters
                $geometry: {
                    type: 'Point',
                    coordinates: [long, lat]
                }
            }
        }
    })
        .select('name')
    return res.json(users)
})

//API for getting all users
app.get('/user', (req, res) => {
    User.find((err, data) => {
        if (err) {
            res.send(500).res.send(err)
        }
        res.send(data)
    })
})


// Get User API based on nearby geolocation coordinates
app.get('/getOne/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update User API

app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete User API
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


