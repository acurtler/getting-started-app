
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
