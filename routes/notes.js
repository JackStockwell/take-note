const notes = require('express').Router();
const uuid = require('../helpers/uuid')
const { readFromFile, 
    writeToFile, 
    readAndAppend 
} = require('../helpers/fsUtils')

// GET Route to retrieve data.

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => error ? console.warn(error) : console.log('Connecting to ../api/notes'))
    console.log('GET for /api/notes')
});

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid,
        }
        console.log(newNote)
        readAndAppend(newNote, './db/db.json');
    } else {
        res.error('There was an unexpected problem..')
    }

});

notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    readAndAppend('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((resp) => {
            console.log(resp)
        });
});

console.log(uuid)

module.exports = notes;