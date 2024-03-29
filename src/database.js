const express = require('express');
const path = require('path');
const cors = require('cors');
const { createPool } = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());
app.use(express.json());

// Create a database connection pool
const pool = createPool({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'static')));

// Route to fetch clasticGrains data from the database
app.get('/api/clasticGrains', (req, res) => {
    pool.query('SELECT * FROM ClasticGrains', (err, result, fields) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result);
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


/*const pool = createPool({
    database:"h762lahe056bge13",
    user: 'izgrmlgwk70csp9l',
    password: 'qpmikh9t3n3a2ekg',
    host: 'nnsgluut5mye50or.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'
})
*/
// index.js




