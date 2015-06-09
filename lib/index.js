/**
  * @module fleck-api
  *
  * Get inspired with the Fleck API
  */

var configuration = require('./configuration'),
    ReleaseController = require('./Controllers/ReleaseController');


function initializer(){}

//Main functional components of fleck-api
initializer.configuration = configuration;
initializer.ReleaseController = ReleaseController;

//Main Models of fleck-node

module.exports = initializer;
