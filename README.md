Fleck-Node
=================
Interface for the Fleck API



How To Install:
=============
The generated code relies on node package manager (npm) being available to resolve dependencies.
Once published you can install the library by issuing the following command.

    npm install fleck-node --save

Note: For instructions on installing via a local package visit https://docs.npmjs.com/cli/install

How To Use:
===========
The following shows how import the controllers and use:

1) Import the module:

        var flecknode = require('fleck-node');

2) Configure any authentication parameters. For example:

        var config = flecknode.configuration;
        config.apikey = a_secret_key;

3) Access various controllers by:

        var controller = flecknode.XYZ;
        controller.getItems(id, callback);
