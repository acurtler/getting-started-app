const express = require('express');
const path = require('path');
/*const pool = require('../database');*/

const { 
    createPool
} = require('mysql2');

const pool = createPool({
    database:"h762lahe056bge13",
    user: 'izgrmlgwk70csp9l',
    password: 'qpmikh9t3n3a2ekg',
    host: 'nnsgluut5mye50or.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'
})

pool.query('select * from ClasticGrains', (err, result, fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})

module.exports = pool;

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

/*
app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);
*/
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

/*
const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
*/