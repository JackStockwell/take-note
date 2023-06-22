// Module imports
const express = require('express');
const notesRouter = require('./notes');

const app = express();

// Routes
app.use('/notes', notesRouter);

// Export Module
module.exports = app;