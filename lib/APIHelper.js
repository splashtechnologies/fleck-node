/**
  * fleck-api
  *
  */

var qs = require('querystring');
var APIHelper = {

    /**
     * Replaces template parameters in the given url
     * @param	{String} queryBuilder    The query string builder to replace the template parameters
     * @param	{Array} parameters    The parameters to replace in the queryBuilder
     */
    appendUrlWithTemplateParameters:function(queryBuilder, parameters) {

        //perform parameter validation
        if(queryBuilder == null) {
            console.log('queryBuilder is null');
            return;
        }

        if(parameters ==null) {
            return queryBuilder;
        }

        //iterate and replace parameters
        for(var key in parameters) {
            var replaceValue = "";

            //load parameter value
            var element =  parameters[key];

            if(element == null) {
                replaceValue = "";
            } else if (element instanceof Array) {
                replaceValue = element.join("/");
            } else {
                replaceValue = element.toString();
            }
            queryBuilder = queryBuilder.replace('{'+(key)+'}', replaceValue)
            }
        return queryBuilder;
    },

    /**
     * Appends the given set of parameters to the given query string
     * @param	{String} queryBuilder    The query url string to append the parameters
     * @param	{Array} parameters   The parameters to append
     */
    appendUrlWithQueryParameters:function(queryBuilder, parameters) {

        //perform parameter validation
        if(queryBuilder == null) {
            console.log('queryBuilder is null');
            return;
        }
        if(parameters == queryBuilder) {
            return queryBuilder;
        }

        var hasParams = queryBuilder.indexOf('?') >-1;
            //iterate and replace parameters

        var queryString = qs.encode(parameters);
        if(hasParams){
            return queryBuilder + queryString;
        }else{
            return queryBuilder + "?" + queryString;

        }
    },

    /**
     * Validates and processes the given Url
     * @param {String} url    The Url to process
     * @return {String}   Pocessed url
     */
    cleanUrl:function(url) {

        //ensure that the urls are absolute

        var re = /^https?:\/\/[^\/]+/;
        var str = url;

        var match = url.match(re);
        if(match==null) {
            console.log('Invalid Url format');
            return;

        }
        //remove redundant forward slashes
        var protocol = match[0];
        var queryUrl = url.substring(protocol.length);
        queryUrl = queryUrl.replace(/\/\/+/,"/");

        var result = protocol+queryUrl;
			    return result;
    },

	/**
     * JSON Serialization of a given object.
     * @param	{Object} data The object to serialize into JSON
     * @return	The	serialized Json string representation of the given object
     */
    jsonSerialize: function(data) {
        return JSON.stringify(data);
    },

	/**
     * Formats the template parameters in the string
     * @param	str     The string containing the template
     * @return	The string with template parameters filled in.
     */
    formatString: function(str){

		if (!str || arguments.length <=1 ) return str;
		var args = arguments;
		for (var i = 1; i < arguments.length; i++) {
		    var reg = new RegExp("\\{" + (i - 1) + "\\}", "gm");
		str = str.replace(reg, arguments[i]);
		}
		return str;
	}
}
module.exports = APIHelper;
