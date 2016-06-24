const express = require('express'),
    app = express(),
    path = require('path');

module.exports = app;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));