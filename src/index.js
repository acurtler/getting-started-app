const express = require('express');
const path = require('path');
const cors = require('cors');


const { 
    createPool
} = require('mysql2');


// Function to create a database connection pool with retry logic
function createDatabasePoolWithRetry(options, maxRetries, retryDelay) {
    let retries = 0;

    // Function to create the database pool with retry
    function createPoolWithRetry() {
        const pool = createPool(options);

        // Handle connection errors
        pool.on('error', (err) => {
            console.error('Database connection error:', err);
            if (retries < maxRetries) {
                retries++;
                console.log(`Retrying database connection (attempt ${retries}/${maxRetries})...`);
                setTimeout(createPoolWithRetry, retryDelay);
            } else {
                console.error('Max retry attempts reached. Unable to establish database connection.');
            }
        });
        // Return the database pool
        return pool;
    }
    // Start the initial connection attempt
    return createPoolWithRetry();
}

const dbOptions = {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    //port: process.env.DB_PORT // If applicable
};

// Create a database connection pool with retry logic
const maxRetries = 3; // Maximum number of retry attempts
const retryDelay = 5000; // Retry delay in milliseconds (e.g., 5 seconds)
const pool = createDatabasePoolWithRetry(dbOptions, maxRetries, retryDelay);

/*const pool = createPool({
    database:"h762lahe056bge13",
    user: 'izgrmlgwk70csp9l',
    password: 'qpmikh9t3n3a2ekg',
    host: 'nnsgluut5mye50or.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'
})
*/

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/clasticGrains', (req, res) => {
    pool.query('SELECT * FROM ClasticGrains', (err, result, fields) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' }); // Send error response
        }
        console.log(result);
        res.json(result); // Send data back to the client as JSON
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*pool.query('select * from ClasticGrains', (err, result, fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})

module.exports = pool;
*/


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


