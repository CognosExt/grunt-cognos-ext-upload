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
 * @param {boolean} options.checkssl Check if ssl certificates are valid. Default is true.
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
 *               checkssl: false,
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
        checkssl: true,
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
      const checkssl = options.checkssl;

      const jcognos = require('jcognos');
      var getCognos = jcognos.getCognos;

      var result = getCognos(url, debug)
        .then(function(lcognos) {
          lcognos.login(user, password, namespace).then(function() {
            grunt.log.writeln('going to upload ' + zipfile);
            if (options.debug) {
              grunt.log.writeln('going to upload ' + name);
              grunt.log.writeln('going to type ' + exttype);
            }
            lcognos
              .uploadExtension(zipfile, name, exttype, { checkssl: checkssl })
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
          grunt.log.writeln(JSON.stringify(error.response));
        });
    }
  );
}

module.exports = gruntUpload;
