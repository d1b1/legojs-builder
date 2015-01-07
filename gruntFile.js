'use strict';
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: [ 'dist' ],

    cssmin: {
      combine: {
        files: {
          'dist/release/index.css': [
            'css/bootstrap.css',
            'css/backgrid.css',
            'css/extensions/paginator/backgrid-paginator.css',
            'css/extensions/text-cell/backgrid-text-cell.css'
          ]
        }
      }
    },

    jst: {
      'dist/debug/templates.js': [
        'templates/**/*.html'
      ]
    },

    // TODO: Move the file setup from S3 to this copy so we have a better
    // place to test before pushing.

    copy: {
      dist: {
        files: [
          { dest: 'dist/release/', src: 'assets/css/custom/images/**' },
          { dest: 'dist/release/', src: 'assets/img/**' },
          { dest: 'dist/release/', src: 'assets/css/fonts/**/*' }
        ]
      }
    },

    jade: {
      index: {
        options: {
          pretty: true,
          data: {
            api_url: 'http://builder.legojs.io',
            app_version: '<%= pkg.version %>'
          }
        },
        files: {
          'dist/index.html': [ 'index.jade' ]
        }
      }
    },

    concat: {
      'dist/debug/require.js': [
        'assets/js/libs/almond.js',
        'dist/debug/templates.js',
        'dist/debug/require.js'
      ]
    },

    uglify: {
      release: {
        files: {
          'dist/release/require.js': [
            'dist/debug/require.js'
          ]
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          name: 'config',
          baseUrl: '',
          mainConfigFile: 'config.js',
          out: 'dist/debug/require.js',
        }
      }
    }

  });

  // Composite Tasks

  // The 'default' tasks is called when the `grunt` CLI command is
  // executed. This will only do the basic cleanup, template and require
  // work. 

  grunt.registerTask('default', [ 'clean', 'jst', 'requirejs', 'concat' ]);

  // The 'release' task takes the code and prepares it for production
  // deployment, basically making it smaller and the source code harder
  // to view. 
  
  grunt.registerTask('release', [ 'default', 'uglify', 'cssmin', 'copy', 'jade:index' ]);

  // Load the Grunt Packages.
  grunt.registerTask('automate:import', ['exec:import']);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');

};
