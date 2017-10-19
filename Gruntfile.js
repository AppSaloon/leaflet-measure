var path = require('path')

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    now: new Date(),
    jshint: {
      src: ['src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jscs: {
      src: ['src/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },
    clean: {
      dist: {
        src: ['dist/*.*']
      }
    },
    browserify: {
      build: {
        files: {
          'dist/leaflet-measure.js': ['src/leaflet-measure.js']
        },
        options: {
          transform: [
            'brfs',
            'browserify-shim'
          ]
        }
      },
      dev: {
        files: {
          'dist/leaflet-measure.js': ['src/leaflet-measure.js']
        },
        options: {
          transform: [
            'brfs',
            'browserify-shim'
          ],
          browserifyOptions: {
            debug: true
          }
        }
      }
    },
    uglify: {
      build: {
        src: 'dist/leaflet-measure.js',
        dest: 'dist/leaflet-measure.min.js'
      }
    },
    sass: {
      build: {
        options: {
          sourcemap: 'none',
          style: 'compressed',
          compass: true
        },
        files: {
          'dist/leaflet-measure.css': 'scss/leaflet-measure.scss'
        }
      },
      dev: {
        options: {
          sourcemap: 'auto',
          style: 'expanded',
          compass: true
        },
        files: {
          'dist/leaflet-measure.css': 'scss/leaflet-measure.scss'
        }
      }
    },
    svg2png: {
      images: {
        files: [{
          src: 'src/images/*.svg',
          dest: 'dist/images/'
        }]
      }
    },
    release: {
      options: {
        npm: true,
        tagName: '<%= version %>',
        commitMessage: 'release <%= version %>',
        tagMessage: 'tag <%= version %>' //default: 'Version <%= version %>'
      }
  },
  svg2png: {
        all: {
            // specify files in array format with multiple src-dest mapping
            files: [
                // rasterize all SVG files in "img" and its subdirectories to "img/png"
                { cwd: 'src/images/', src: ['*.svg'], dest: 'dist/images/' }
            ]
        }
    },
    watch: {
        css: {
            files: 'scss/*.scss',
            tasks: ['sass']
        },
        js: {
            files: 'src/*.js',
            tasks: ['builddev']
        }
    },
    browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'dist/*.css',
                        'dist/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-svg2png');


  grunt.registerTask('test', ['jshint', 'jscs']);
  grunt.registerTask('builddev', ['clean:dist', 'browserify:dev', 'sass:dev']);
  grunt.registerTask('build', ['test', 'clean:dist', 'browserify:build', 'uglify:build', 'sass:build', 'svg2png']);
  grunt.registerTask('dev', ['browserSync', 'watch', 'svg2png']);
  grunt.registerTask('default', ['browserSync', 'watch']);
};
