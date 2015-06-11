Fleck-API
=================
Interface for the Fleck API.

How To Install:
=============
The generated code relies on node package manager (npm) being available to resolve dependencies.
Once published you can install the library by issuing the following command.

    npm install fleck-api


How To Use:
===========
The following example shows how to use the API:

    // import the module
    var fleck = require('fleck-api');

    // set the client API token
    fleck.apiToken = 'DF2BohjGgXJSU9A_hQrZmQPpQlLOiiTi';

    // customize the request. For more info check out the options table
    // in the reference section
    var options = {
        size: fleck.Size.s1242,
        language: fleck.Language.ru,
        secure: fleck.Secure.yes
    };

    // make the request
    fleck.getRelease(options,function(error, response){
        // handle error
        if (error) {
            console.log('error:',error);
            return;
        }

        // do something with the info
        var release = response.release;
        var posts = response.posts;

        options.before = release.timestamp;

        fleck.getRelease(options,function(error, response){
            // handle error
            if (error) {
                console.log('error:',error);
                return;
            }

            // do something with the info
            var release = response.release;
            var posts = response.posts;

            console.log("Release:", release);
            console.log("Posts:", posts);
        });
    });



Reference:
===========

Table of options and its valid values. In the models folder there are enums for the options to ensure valid values.

|Param | Description | Valid values | Default   |
|------|-------------|--------------|-----------|
|before    | It will return the release with a date strictly less than the number.  | Integers greater than 1419084000, which is the timestamp of the first release (20th december 2015). Any previous timestamp will return a 204 HTTP Response.  | current timestamp |
|version   | The version of the API.         | 1.0 | 1.0  |
|language  | The topic name and location name are localized      | [en,es,ru,pt_PT,pt_BR,de,fr]  | en  |
|size      | Size of the image              | [212,250,414,640,750,1242]    | 640 |
|secure    | If true, all links use https   | [yes,no]                      | No  |


####Response:

The response is parsed by the library. The following is a JSON response example:

    // curl "https://api.getfleck.com/release?token=validtoken&v=1.0"
    {
      "posts" :
      [
            // omited other 19 elements
            {
              "created": 1433895797,
              "creator": {
                  "avatar_url": "http://media.getfleck.com/avatars/I5dNCBwABkeK3PQX.jpg",
                  "name": "Tiffany Sherwood"
              },
              "img_url": "http://media.getfleck.com/640x640/JEAuPFQABvYWNP9H.jpg",
              "location": {
                  "lat": 40.7127837,
                  "lon": -74.0059413,
                  "name": "New York, United States"
              },
              "order": 1433955580,
              "position": 20,
              "release": {
                  "number": 173,
                  "timestamp": 1433955600
              },
              "topic": {
                  "name": "Street Art"
              },
              "web_url": "http://getfleck.com/s/JEAuPFQABvYWNP9H"
          }
      ],
      "release": {
          "number": 173,
          "timestamp": 1433955600
      }
    }



**Post object**

| Variable | Type | Description |
|----------|------|-------------|
| created   | Float     | Timestamp of submission with seconds precision. |
| creator   | Creator   | User info |
| img_url   | String    | Url of the post image with the size requested |
| location  | Location  | Location of the post. |
| order     | Integer   | Position of the post related to all post of Fleck. Useful to compare post from different releases to determine the absolute order |
| position  | Integer   | Position of the post inside the release. It starts at 1. |
| release   | Release   | Release that the post belongs to. |
| topic     | Topic     | Topic that the post belongs to. |
| web_url   | String    | URL of the web version of the post. |

**Release object**

| Variable | Type | Description |
|----------|------|-------------|
| number   | Integer |  Unique release number. Starts at 1. |
| timestamp | Float | Timestamp with seconds precision at the time the release was published. |

**Topic object**

| Variable | Type | Description |
|----------|------|-------------|
| name   | String | Localized name of the topic |

**Location object**

As of Fleck 2.1 users can optionally attach a location to a post. Locations are
selected from a set of thousands of cities around the world. If the post doesn't have
a location, the response will be a location object with every property set to null.

| Variable | Type | Description |
|----------|------|-------------|
| name    | String  | Localized name of the place |
| lat     | Float   | Latitude of the place |
| lon     | Float   | Longitude of the place |

**Creator object**

| Variable | Type | Description |
|-------------|------|-------------|
| avatar_url  | String  | URL of the avatar with a size 200x200 px  |
| name        | String  | User's name |
