module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
      },
      compass: {
        // Using compass to render styles.
        // Watch for the *.scss file sonly
        files: ['_sass/*.scss'],
        tasks: 'compassCopy'
      },
      jekyllSources: {
        files: [
          // capture all except css
          '*.html', '*.yml', 'js/**.js','*.md','*.markdown',
          '_posts/**', '_includes/**', '_layouts/**', 'projects/**',
          'resume/**', 'profile/**', 'demos/**', 'contact/**', 'blog/**',
          'images/**'
          ],
        tasks: 'shell:jekyll',
      }
    },

    copy: {
      css : {
        files: {
          // Copy the compass-generated style file to
          // the _site/ folder
          '_site/css/style.css': 'css/style.css'
        }
      }
    },

    shell: {
        jekyll: {
            command: 'rm -rf _site/*; jekyll build',
            stdout: true
        },
        rake: {
            command: 'rake deploy'
        }
    },

    compass: {
      dist: {
        options: {
          sassDir: '_sass',
          cssDir: 'css'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          base: '_site/'
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    uglify: {
      build: {
        src: 'js/scripts.js',
        dest: 'js/scripts.min.js'
      }
    },

    concat: {
      dist: {
        src: [
          'js/plugins/*.js',
          'js/application.js'
        ],
        dest: 'js/scripts.js'
      }
    },

  });

  require('load-grunt-tasks')(grunt);

  // compass watch
  grunt.registerTask('compassCopy', ['compass', 'copy:css']);
  // Default task.
  grunt.registerTask('build', ['concat', 'uglify', 'compassCopy', 'imagemin', 'shell:jekyll']);
  // Development Task
  grunt.registerTask('default', ['connect', 'watch']);
  // Deploy Task
  grunt.registerTask('deploy', ['shell:rake']);

};
