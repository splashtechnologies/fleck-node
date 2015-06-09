/**
  * @module fleck-api
  *
  * Get inspired with the Fleck API
  */

var configuration = require('./configuration'),
    ReleaseController = require('./Controllers/ReleaseController'),
    SizeEnum = require('./Models/SizeEnum'),
    SecureEnum = require('./Models/SecureEnum'),
    VersionEnum = require('./Models/VersionEnum'),
    LanguageEnum = require('./Models/LanguageEnum');


function initializer(){}

//Main functional components of fleck-api
initializer.configuration = configuration;
initializer.ReleaseController = ReleaseController;

//Main Models of fleck-node
initializer.Size = SizeEnum;
initializer.Secure = SecureEnum;
initializer.Version = VersionEnum;
initializer.Language = LanguageEnum;

// convenience
initializer.getRelease = ReleaseController.getRelease;

Object.defineProperty(initializer, 'apiToken', {
    get: function() {
        return initializer.configuration.apiToken;
    },
    set: function(token) {
      initializer.configuration.apiToken = token;
    }
});


module.exports = initializer;
