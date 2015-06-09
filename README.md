Fleck-API
=================
Interface for the Fleck API

How To Install:
=============
The generated code relies on node package manager (npm) being available to resolve dependencies.
Once published you can install the library by issuing the following command.

    npm install fleck-api --save


How To Use:
===========
The following shows how import the controllers and use:

    // import module
    var http = require('http');
    var fleck = require('fleck-api');

    // set your client token
    fleck.apiToken = 'VALID_TOKEN';

    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});

        // set options like image size or language 
        var options = {};
        fleck.getRelease(options,function(error, response){
        
            // do something with the response
            console.log('error:',error);
            console.log('response:',response);
        });

        res.end('Hello World\n');

    }).listen(1337, '127.0.0.1');

