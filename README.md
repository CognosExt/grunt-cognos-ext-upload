# grunt-cognos-ext-upload

[![CircleCI](https://circleci.com/gh/CognosExt/grunt-cognos-ext-upload.svg?style=svg)](https://circleci.com/gh/CognosExt/grunt-cognos-ext-upload) [![Greenkeeper badge](https://badges.greenkeeper.io/CognosExt/grunt-cognos-ext-upload.svg)](https://greenkeeper.io/)

Use [Grunt](http://gruntjs.com/) to upload your [IBM Cognos Analytics](https://www.ibm.com/products/cognos-analytics) custom [extensions](https://www.ibm.com/support/knowledgecenter/SSEP7J_11.0.0/com.ibm.swg.ba.cognos.ag_manage.doc/c_ag_manage_extensions.html) directly from your local machine into your cognos installation without opening your browser.

## Getting Started

This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cognos-ext-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks("grunt-documentation");
```

# Usage

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [gruntUpload](#gruntupload)
    -   [Parameters](#parameters)
    -   [Examples](#examples)

## gruntUpload

Grunt Cognos Extension Upload

In your project's Gruntfile, add a section named `cognos_ext_upload` to the
data object passed into `grunt.initConfig()`.

### Parameters

-   `grunt`  
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the extension as found in the specs.json (TODO: read the name from the specs.json)
    -   `options.user` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Cognos Username with enough priviliges to upload (new) extensions
    -   `options.password` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Password of the user
    -   `options.namespace` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The Cognos namespace id, if not the default
    -   `options.url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** URL of the homepage of your Cognos 11 installation (eg. <https://localhost/ibmcognos> )
    -   `options.type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** type of upload. Default is 'extensions', for themes use 'themes'.
    -   `options.zipfile` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the zipfile to upload. Defaults to dist/extension.zip
    -   `options.checkssl` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Check if ssl certificates are valid. Default is true.
    -   `options.debug` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Creates more output

### Examples

```javascript
grunt.initConfig({
  documentation: {
      default: {
          options: {
              name: 'My_Theme',
              user: "admin",
              password: "secret",
              namespace: "MyNameSpace",
              url: "https://localhost/ibmcognos",
              type: "themes",
              zipfile: "dist/mytheme.zip",
              checkssl: false,
              debug: false
          }
      },
  }
});
```
