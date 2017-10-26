# grunt-documentation

[![Circle CI](https://circleci.com/gh/documentationjs/grunt-documentation/tree/master.svg?style=shield)](https://circleci.com/gh/documentationjs/grunt-documentation/tree/master) [![Greenkeeper badge](https://badges.greenkeeper.io/documentationjs/grunt-documentation.svg)](https://greenkeeper.io/)

Use [Grunt](http://gruntjs.com/) with [documentation](https://github.com/documentationjs/documentation) to generate great documentation for your JavaScript projects.

## Getting Started

This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-documentation --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-documentation');
```

# Usage

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## gruntUpload

Grunt Cognos Extension Upload

In your project's Gruntfile, add a section named `cognos_ext_upload` to the
data object passed into `grunt.initConfig()`.

**Parameters**

-   `grunt`  
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the extension as found in the specs.json (TODO: read the name from the specs.json)
    -   `options.user` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Cognos Username with enough priviliges to upload (new) extentions
    -   `options.password` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Password of the user
    -   `options.url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL of the homepage of your Cognos 11 installation (eg. <https://localhost/ibmcognos> )
    -   `options.zipfile` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the zipfile to upload. Defaults to dist/extension.zip
    -   `options.debug` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Creates more output

**Examples**

```javascript
grunt.initConfig({
  documentation: {
      default: {
          options: {
              name: 'My_Extension',
              user: "admin",
              password: "secret",
              url: "https://localhost/ibmcognos",
              debug: false
          }
      },
  }
});
```