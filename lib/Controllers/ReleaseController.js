/**
 * fleck-api
 *
 */

var request = require('request'),
    configuration = require('../configuration'),
    APIHelper = require('../APIHelper');

var ReleaseController = {

    /**
     * Currently there is 1 release per day at 5PM UTC. Each release consists of approximately 20 photos. The release cycle and quantity of photos varies occasionally. A webhook to be notified of the release will be available soon.
     * @param {VersionEnum} xFleckVersion    Required parameter: The version of the API.
     * @param {double} before    Required parameter: Returns the latest release that occurred strictly less than this timestamp.
     * @param {SizeEnum} size    Required parameter: Size of the main image pointed to by 'img_url'.The 'avatar_url' is currently always 200px.
     * @param {SecureEnum} secure    Required parameter: Set to '1' if you want https urls in the response.
     * @param {LanguageEnum|null} acceptLanguage    Optional parameter: Some fields, such as 'location' and 'topic' are localized. Default is 'en'. 'pt' locales default to 'pt-BR' unless 'pt-PT' is specified.
     * @param {function} callback    Required parameter: Callback function in the form of function(error, response)
     *
     * @return {ReleaseResponse}
     */
    getRelease : function(xFleckVersion, before, size, secure, acceptLanguage, callback){


        //prepare query string for API call;
        var baseUri = configuration.BASEURI;

        var queryBuilder = baseUri + "/release";

        //Process query parameters
        queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
            "before" : (before != null)?before:null,
            "size" : (size != null)?size:null,
            "secure" : (secure != null)?secure:null
        });

        //validate and preprocess url
        var queryUrl = APIHelper.cleanUrl(queryBuilder);

        //prepare headers
        var headers = {
            "accept" : "application/json",
            "X-Fleck-Version" : xFleckVersion,
            "Accept-Language" : acceptLanguage,
            "X-Fleck-Token" : configuration.xFleckToken
        };

        //Construct the request
        var options = {
            url: queryUrl,
            method: "GET",
            headers: headers,
        };

        //Build the response processing.
        function cb(error, response, body) {
            if (!error && response.statusCode >= 200 && response.statusCode <= 206) {
                callback(null, JSON.parse(body));
            }else{
                //Error handling using HTTP status codes
                if (response.statusCode == 500) {
                    callback({ErrorMessage: "Standard HTTP error response with code >= 400.", ErrorCode: 500});
                }else {
                    callback({ErrorMessage: response.body, ErrorCode: response.statusCode});
                }
            }
        }
        request(options, cb);

    }

};

module.exports = ReleaseController;
