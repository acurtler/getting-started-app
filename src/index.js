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

document.addEventListener('DOMContentLoaded', () => {
    const getBtn = document.getElementById('get');
    const dataTable = document.getElementById('dataTable'); // Reference to the table

    const baseUrl = window.location.origin + '/api/clasticGrains'; // Corrected endpoint URL

    getBtn.addEventListener('click', getInfo);

    async function getInfo(e) {
        e.preventDefault();
        try {
            const res = await fetch(baseUrl, { method: 'GET' });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json(); // Parse the response as JSON
            console.log(data); // Log the data to verify it's correctly received
            populateTable(data); // Call function to populate the table
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // Function to populate the table with data
    function populateTable(data) {
        const output = document.getElementById('output');
        output.innerHTML = ''; // Clear previous content

        // Loop through the data and create table rows
        data.forEach(rowData => {
            const row = document.createElement('tr');
            // Add cells for each column in the row
            for (const key in rowData) {
                const cell = document.createElement('td');
                cell.textContent = rowData[key];
                row.appendChild(cell);
            }
            output.appendChild(row);
        });

        // Show the table after populating data
        dataTable.style.display = 'table';
    }
});



