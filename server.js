// Module Imports

const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for API
app.use('/api', api);

// GET Route for notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for all other requests re-directed.
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/404.html'))
);

app.listen(PORT, () => {
    console.log(`App starting, local http://localhost:${PORT}`)
});

