'use strict';

require('./app.css');
require('./app-cache');
require('./vendor');

module.exports = require('angular').module('bookspring-readathon', [
    'ui.bootstrap',
    require('./nav').name,
    require('./login').name,
    require('./reading-badges').name,
    require('./reading-entry').name,
    require('./reading-map').name,
    require('./translations').name,
]);

