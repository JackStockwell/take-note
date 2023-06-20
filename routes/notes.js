const notes = require('express').Router();
const 
{ readFromFile, 
    writeToFile, 
    readAndAppend 
} = require('../helpers/fsUtils')

// GET Route to retrieve data.

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => error ? console.warn(error) : console.log('Connecting to ../api/notes'))
    console.log('GET for /api/notes')
})

module.exports = notes;