const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the user
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML and CSS
app.use(express.static('public'));

/// Handle POST request for registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user
    const newUser = new User({
      username,
      email,
      password
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
