const notes = require('express').Router();
const fs = require('fs');

// GET Route to retrieve data.

notes.get('/', (req, res) => {
    const {} = req.body;

    if (req.body) {
        const newNote = {
            note,
            title
        }
    }
})

module.exports = notes;