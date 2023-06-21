const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, 
    writeToFile, 
    readAndAppend 
} = require('../helpers/fsUtils');
const { json } = require('express');

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
            id: uuidv4(),
        }
        console.log(newNote)
        readAndAppend(newNote, './db/db.json');
    } else {
        res.error('There was an unexpected problem..')
    }

});

notes.get('/:id', (req, res) => {

    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((resp) => {

            const filteredRes = resp.filter((note) => note.id === id)
            console.log(filteredRes)

            console.log(filteredRes)
            return filteredRes.lenght > 0
                ? res.json('Nothing was found...')
                : res.json(filteredRes)
        });
});

notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((resp) => {
            const filteredRes = resp.filter((note) => note.id !== id)
            writeToFile('./db/db.json', filteredRes)
            console.log(filteredRes)
            return filteredRes.lenght > 0
                ? res.json('There was an error.')
                : res.json(filteredRes)
        });
});

module.exports = notes;