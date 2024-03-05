const { 
    createPool
} = require('mysql');

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