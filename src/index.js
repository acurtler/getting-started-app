const express = require('express');
const path = require('path');
const cors = require('cors');

const http = require('http');
const url = require('url');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);

    // Check if the request is for the '/api/clasticGrains' endpoint
    if (parsedUrl.pathname === '/api/clasticGrains') {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
        res.setHeader('Access-Control-Allow-Methods', 'GET'); // Allow only GET requests
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        // Send the response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'This is the response from /api/clasticGrains' }));
    } else {
        // Handle other requests
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const { 
    createPool
} = require('mysql2');

// Create a pool using environment variables
const pool = createPool({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT // If applicable
});

/*const pool = createPool({
    database:"h762lahe056bge13",
    user: 'izgrmlgwk70csp9l',
    password: 'qpmikh9t3n3a2ekg',
    host: 'nnsgluut5mye50or.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'
})
*/
pool.query('select * from ClasticGrains', (err, result, fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})

module.exports = pool;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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
