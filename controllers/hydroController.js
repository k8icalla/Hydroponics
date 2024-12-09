const db = require('../config/db'); // Import the database connection

// Method for the /history route
exports.getHistory = (req, res) => {
    // Query to fetch temperature readings from the database
    const temperatureQuery = 'SELECT * FROM temperature_readings ORDER BY reading_time DESC';
    // Query to fetch pH readings from the database
    const phQuery = 'SELECT * FROM ph_readings ORDER BY timestamp DESC';
    // Query to fetch TDS readings from the database
    const tdsQuery = 'SELECT * FROM tds_readings ORDER BY id DESC';

    // Execute all queries sequentially
    db.query(temperatureQuery, (err, temperatureResults) => {
        if (err) {
            console.error('Error fetching temperature readings:', err);
            return res.status(500).send('Error fetching temperature readings.');
        }

        db.query(phQuery, (err, phResults) => {
            if (err) {
                console.error('Error fetching pH readings:', err);
                return res.status(500).send('Error fetching pH readings.');
            }

            db.query(tdsQuery, (err, tdsResults) => {
                if (err) {
                    console.error('Error fetching TDS readings:', err);
                    return res.status(500).send('Error fetching TDS readings.');
                }

                // Once all data is fetched, render the 'history' view and pass the data for each table
                return res.render('history', {
                    temperatureData: temperatureResults,
                    phData: phResults,
                    tdsData: tdsResults
                });
            });
        });
    });
};


// Optional: Other methods for handling different routes can go here

// Example: Method to render the controller page
exports.getController = (req, res) => {
    res.render('controller');
};

// Example: Method to render the index page
exports.getIndex = (req, res) => {
    res.render('index');
};

// Example: Method to render the login page
exports.getLogin = (req, res) => {
    res.render('login');
};

// Example: Method to render the signup page
exports.getSignup = (req, res) => {
    res.render('signup');
};
