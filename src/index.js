const express = require('express');
const path = require('path');
const pool = require('./database');

const app = express();

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

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
