'use strict';

module.exports = function( grunt ) {

  // tasks
  grunt.initConfig({

    // watches files for changes and automatically reloads them

    // minify JS
    uglify: {
      scripts: {
        files: {
          'js/common.min.js': 'js/common.js'
        }
      }
    },

    // compile LESS
    less: {
      styles: {
        options: {
          plugins: [
            require('less-plugin-glob')
          ]
        },
        files: {
          // 'css/framework.css': 'less/framework.less',
          // 'css/bootstrap-grid-custom.css': 'less/bootstrap-grid-custom.less',
          // 'css/main.css': 'less/main.less',
          'css/main.css': ['less/bootstrap-grid-custom.less', 'less/framework.less', 'less/main.less'],
          // 'css/main.css': ['less/framework.less', 'less/main.less'],
          // 'css/main.css': 'less/main.less',
          'css/header.css': 'less/header.less'
        }
      }
    },

    // autoprefix CSS
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'Android 2', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 7', 'ie 8', 'ie 9']
      },
      no_dest: {
        src: ['css/main.css', 'css/media.css', 'css/header.css', 'css/framework.css']
      }
    },

    // beautify CSS
    csscomb: {
      styles: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          // 'css/framework.css': 'css/framework.css',
          'css/main.css': 'css/main.css',
          'css/media.css': 'css/media.css',
          'css/header.css': 'css/header.css'
        }
      }
    },

    // concat and minify CSS
    cssmin: {
      styles: {
        files: {
          // 'css/main.min.css': ['css/framework.css', 'css/bootstrap-grid-custom.css', 'css/main.css', 'css/media.css'],
          'css/main.min.css': 'css/main.css',
          // 'css/bootstrap-grid-custom.min.css': 'css/bootstrap-grid-custom.css',
          // 'css/framework.min.css': 'css/framework.css',
          'css/media.min.css': 'css/media.css',
          'css/header.min.css': 'css/header.css'
        }
      }
    },

    // watch
    watch: {
      uglify: {
        files: ['js/common.js'],
        tasks: [ 'uglify' ]
      },
      less: {
        files: ['less/*.less'],
        tasks: [ 'less' ]
      },
      css: {
        files: ['css/framework.css', 'css/bootstrap-grid-custom.css', 'css/main.css', 'css/media.css', 'css/header.css'],
        tasks: [ 'autoprefixer', 'csscomb', 'cssmin' ]
      }
    },

    // server
    connect: {
      server: {
        options: {
          port: 8877
        }
      }
    }

  });

  // Загрузка плагинов, установленных с помощью npm install
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-less' );
  grunt.loadNpmTasks( 'grunt-csscomb' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-autoprefixer' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );

  // some default tasks

  grunt.registerTask('default', ['uglify', 'less', 'autoprefixer', 'csscomb', 'cssmin']);
  grunt.registerTask('serv', [ 'connect', 'watch']);

};
