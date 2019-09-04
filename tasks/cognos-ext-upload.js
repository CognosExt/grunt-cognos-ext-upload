'use strict';

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
 * @param {string} options.namespace The Cognos namespace id, if not the default
 * @param {string} options.url URL of the homepage of your Cognos 11 installation (eg. https://localhost/ibmcognos )
 * @param {string} options.type type of upload. Default is 'extensions', for themes use 'themes'.
 * @param {string} options.zipfile name of the zipfile to upload. Defaults to dist/extension.zip
 * @param {number} options.timeout Timeout of connection in milliseconds, defaults to 60000
 * @param {boolean} options.ignoreInvalidCertificates Ignore invalid ssl certificates. Default is false.
 * @param {string} options.debug Creates more output
 * @example
 * grunt.initConfig({
 *   documentation: {
 *       default: {
 *           options: {
 *               name: 'My_Theme',
 *               user: "admin",
 *               password: "secret",
 *               namespace: "MyNameSpace",
 *               url: "https://localhost/ibmcognos",
 *               type: "themes",
 *               zipfile: "dist/mytheme.zip",
 *               timeout: 30000,
 *               ignoreInvalidCertificates: true,
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
        timeout: 60000,
        ignoreInvalidCertificates: false,
        debug: false
      });

      grunt.log.writeln('Going to upload ' + options.name);
      var done = this.async();

      const name = options.name;
      const zipfile = options.zipfile;
      const url = options.url;
      const debug = options.debug;
      const user = options.user;
      const password = options.password;
      const namespace = options.namespace;
      const exttype = options.type;
      const timeout = options.timeout;
      const ignoreInvalidCertificates = options.ignoreInvalidCertificates;

      const jcognos = require('jcognos');
      var getCognos = jcognos.getCognos;

      var result = getCognos(url, debug, timeout, ignoreInvalidCertificates)
        .then(function(lcognos) {
          lcognos.login(user, password, namespace).then(function() {
            grunt.log.writeln('going to upload ' + zipfile);
            if (options.debug) {
              grunt.log.writeln('going to upload ' + name);
              grunt.log.writeln('going to type ' + exttype);
            }
            lcognos
              .uploadExtension(zipfile, name, exttype)
              .then(function() {
                console.log('Uploaded Extension');
                done();
              })
              .catch(function(err) {
                console.log('Error uploading', err);
              });
          });
        })
        .catch(function(error) {
          console.log(error);
          grunt.log.writeln('error: ' + error);
          var util = require('util');
          done(util.isError(err) ? err : new Error(err));
        });
    }
  );
}

module.exports = gruntUpload;
