/**
  * @module FleckAPILib
  *  
  * Get inspired with the Fleck API
  */

var configuration = require('./configuration'),
    ReleaseController = require('./Controllers/ReleaseController');


function initializer(){}

//Main functional components of FleckAPILib
initializer.configuration = configuration;
initializer.ReleaseController = ReleaseController;

//Main Models of FleckAPILib

module.exports = initializer;