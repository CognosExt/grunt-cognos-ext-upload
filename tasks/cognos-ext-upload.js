'use strict';
var request = require('request');
var fs = require('fs');

/**
 * Grunt Cognos Extension Upload
 *
 * In your project's Gruntfile, add a section named `cognos_ext_upload` to the
 * data object passed into `grunt.initConfig()`.
 *
 * @param {Object} options
 * @param {string} options.name Name of the extension as found in the specs.json (TODO: read the name from the specs.json)
 * @param {string} options.user Cognos Username with enough priviliges to upload (new) extensions
 * @param {string} options.password Password of the user
 * @param {string} options.namespace Defaults to the default namespace, use this to set or override. This is the id,
 *                                   not the name of the namespace
 * @param {string} options.url URL of the homepage of your Cognos 11 installation (eg. https://localhost/ibmcognos )
 * @param {string} options.type type of upload. Default is 'extensions', for themes use 'themes'.
 * @param {string} options.zipfile name of the zipfile to upload. Defaults to dist/extension.zip
 * @param {string} options.debug Creates more output
 * @example
 * grunt.initConfig({
 *   documentation: {
 *       default: {
 *           options: {
 *               name: 'My_Extension',
 *               user: "admin",
 *               password: "secret",
 *               namespace: "MyNamespace",
 *               url: "https://localhost/ibmcognos",
 *               type: "extensions",
 *               debug: false
 *           }
 *       },
 *   }
 * });
 */
function gruntUpload(grunt) {
  grunt.registerMultiTask(
    'cognos_ext_upload',
    'Use Grunt to upload a cognos extensions zip file.',
    function() {
      var options = this.options({
        name: '',
        user: '',
        password: '',
        namespace: '',
        url: '',
        type: 'extensions',
        zipfile: 'dist/extension.zip',
        debug: false
      });

      grunt.log.write('Going to upload ' + options.name);
      var done = this.async();

      var token = '';
      var namespace = options.namespace;

      var initialLoginOptions = {
        type: 'GET',
        url: options.url + '/bi/v1/login',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        skipErrorHandling: true
      };

      request.debug = options.debug;
      request.defaults({
        jar: true
      });
      var j = request.jar();
      request.get(
        {
          url: options.url + '/bi/v1/login',
          jar: j
        },
        function(error, response, body) {
          // Find the XSRF Token in the cookie
          var cookies = j.getCookies(options.url + '/bi');
          cookies.forEach(function(cook) {
            if ((cook.key = 'XSRFToken')) {
              token = cook.value;
              grunt.log.debug('token = ' + token);
            }
          });

          // Find the namespace in the body
          grunt.log.writeln(JSON.stringify(body));
          if (!namespace) {
            JSON.parse(body).promptInfo.displayObjects.forEach(function(item) {
              if (item.name == 'CAMNamespace') {
                namespace = item.value;
              }
            });
          }
          grunt.log.writeln('Namespace: ' + namespace);

          // Set the parameters of the login POST request
          var params = {
            parameters: [
              {
                name: 'CAMNamespace',
                value: namespace
              },
              {
                name: 'h_CAM_action',
                value: 'LogonAs'
              },
              {
                name: 'CAMUsername',
                value: options.user
              },
              {
                name: 'CAMPassword',
                value: options.password
              }
            ]
          };
          var paramsJSON = JSON.stringify(params);
          request.cookie('XSRF-TOKEN=' + token);
          var k = request.jar();

          // Post the request
          request.post(
            {
              url: options.url + '/bi/v1/login',
              body: paramsJSON,
              headers: {
                'X-XSRF-TOKEN': token,
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
                Cookie: 'XSRF-TOKEN=' + token // this last one is the trick, it is not a cookie!
              },
              jar: k
            },
            function(error, response, body) {
              if (response.statusCode == 200) {
                // We are logged in, let's upload
                grunt.log.writeln('Uploading');
                fs.createReadStream(options.zipfile).pipe(
                  request.put(
                    {
                      url:
                        options.url +
                        '/bi/v1/plugins/' +
                        options.type +
                        '/' +
                        options.name,
                      headers: {
                        'X-XSRF-TOKEN': token,
                        'X-Requested-With': 'XMLHttpRequest',
                        Cookie: 'XSRF-TOKEN=' + token
                      },
                      jar: k
                    },
                    function(error, response, body) {
                      if (response.statusCode == 200) {
                        grunt.log.writeln(options.name + ' Uploaded');
                      } else {
                        grunt.log.writeln('error: ' + error);
                        grunt.log.writeln(JSON.stringify(response));
                      }
                    }
                  )
                );
              } else {
                grunt.log.writeln('error while uploading: ' + error);
              }
            }
          );
        }
      );
    }
  );
}

module.exports = gruntUpload;
