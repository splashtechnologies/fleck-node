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

    // import the module
    var http = require('http');
    var fleck = require('fleck-api');

    // set token
    fleck.apiToken = 'VALID_TOKEN';

    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});

        var html = "<html><body>";

        // customize the request
        var options = {
            size: fleck.Size.s250,
            language: fleck.Language.fr
        };

        // get the release
        fleck.getRelease(options,function(error, response){
            if (error) {
                console.log('error:',error);
                res.end("An error has occurred");
                return;
            }

            var release = response.release;
            var posts = response.posts;

            html += "<h4>Release:" + release.number + "</h4>";
            html += "<ul>";

            for(var i=0; i < posts.length; i++) {
                var post = posts[i];

                html += "<li><img src=\""+post.img_url+"\"/>";
                html += "<b>"+ post.creator.name +"</b> posted on <i>"+post.topic.name+"</i>";
                html += "</li>";
            }
            html += "</ul>";

            res.end(html);
        });


    }).listen(1337, '127.0.0.1');

    console.log('Server running at http://127.0.0.1:1337/');



Parameters:
===========

Table of options and its valid values.

|Param | Description | Valid values | Default   |
|---------------------------------------------- |
|Version   | The version of the API         | 1.0 | 1.0  |
|Language  | Some fields are localized      | [en,es,ru,pt_PT,pt_BR,de,fr]  | en  |
|Size      | Size of the image              | [212,250,414,640,750,1242]    | 640 |
|Secure    | If true, all links use https   | [yes,no]                      | No  |
