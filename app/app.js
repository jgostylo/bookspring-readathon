'use strict';

require('./app.css');
require('./app-cache');
require('./vendor');

module.exports = require('angular').module('bookspring-readathon', [
    'ui.bootstrap',
    'firebase',
    require('./nav').name,
    require('./reading-badges').name,
    require('./reading-entry').name,
    require('./reading-map').name,
    require('./translations').name,
]).controller('appController', require('./app-controller'));

