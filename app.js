const express = require('express');
const path = require('path');
const db = require('./config/db'); // Import the database configuration
const hydroRoutes = require('./routes/hydroRoutes'); // Your routes file

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Set views folder

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes from the hydroRoutes file
app.use('/', hydroRoutes);

// Route to render the index.ejs template
app.get('/', (req, res) => {
  res.render('index'); // Render 'index.ejs' in the "views" directory
});

// API endpoint to fetch all temperature readings
app.get('/temperature', (req, res) => {
  const sqlQuery = 'SELECT * FROM temperature_readings ORDER BY reading_time DESC';
  
  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error retrieving data from database: ', error);
      res.status(500).send('Error retrieving data from database.');
      return;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No data found.');
    }
  });
});

// API endpoint to fetch all pH readings
app.get('/ph_readings', (req, res) => {
  const sqlQuery = 'SELECT * FROM ph_readings ORDER BY timestamp DESC';
  
  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error retrieving data from database: ', error);
      res.status(500).send('Error retrieving data from database.');
      return;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No data found.');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
