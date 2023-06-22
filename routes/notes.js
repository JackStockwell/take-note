// Module Imports.
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, 
    writeToFile, 
    readAndAppend 
} = require('../helpers/fsUtils');


// GET Method Route to retrieve data.

notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => error ? console.warn(error) : console.log('Connecting to ../api/notes'))
});

// POST Method Route request. Saves to /db/db.json

notes.post('/', (req, res) => {
    // Deconstruct the req.body for use.
    const { title, text } = req.body;
    // IF statement to check if a body was sent. 
    if (req.body) {
        // New note to be added to db.
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        // Read's the .json file, addes the note.
        readAndAppend(newNote, './db/db.json');
        res.json('Note added!')
    } else {
        // Error message
        res.error('There was an unexpected problem, no request body sent.')
    }
});

// GET Method Route request for a specific ID, retries json from /db/sb.json
// Returns raw json.

notes.get('/:id', (req, res) => {

    // Retrieves the id paramater from the route request.
    const id = req.params.id;
    // Retrieves db data, parses it.
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))

        // Function to return the specified note requsted by id.

        .then((resp) => {
            // Filters the response by note.id, uses a callback function.
            const filteredRes = resp.filter((note) => note.id === id)
            // Truth statement, returns the result if the length of the result,
            // is above 0, meaning something was found. Returns nothing if nothing was found.
            return filteredRes.lenght > 0
                ? res.json('Nothing was found...')
                : res.json(filteredRes)
        });
});

// DELETE Method Route request, deletes the parsed id from the database.

notes.delete('/:id', (req, res) => {
    // Takes the param id from the route.
    const id = req.params.id;
    // Read's the db. Filters the results and returns based upon response.
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((resp) => {
            // Filters the result by checking against the notes that DOESN'T equal the parsed
            // note id. Only returns notes that don't equal the id.
            const filteredRes = resp.filter((note) => note.id !== id)
            
            // Writes the filtered result to the db
            writeToFile('./db/db.json', filteredRes)
            // Truth statement to ensure something is returned.
            return filteredRes.lenght > 0
                ? res.json('Database is empty.')
                : res.json(filteredRes)
        });
});

// Module Export

module.exports = notes;