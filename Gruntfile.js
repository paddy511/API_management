module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
      client: 'client',
      server: 'server',
      app: 'client',
      src: 'client/src',
      dist: 'dist',
      build: 'dist/build',
      host: '192.168.0.4',
      pkg: grunt.file.readJSON('package.json'),
      buildtag: '-dev-' + grunt.template.today('yyyy-mm-dd'),
      meta: {
        banner: '/**\n' +
        ' * <%= pkg.description %>\n' +
        ' * @version v<%= pkg.version %><%= buildtag %>\n' +
        ' */'
      },
      concat: {
          less: {
              src: ['<%= app %>/src/**/*.less'],
              dest: '<%= app %>/concat/api_management.less'
          }
      },
      less: {
          options: {
              compress: true,
              stdout: true,
              stderr: true
          },
          compile: {
              files: [
                  {
                      expand: true,
                      cwd: '<%= app %>/concat',
                      src: ['api_management.less'],
                      dest: '<%= app %>/concat',
                      rename: function (dest, src) {
                          return dest + '/' + src.replace(/\.less/, '.css');
                      }
                  }
              ]
          }
      },
      clean: {
          less: ['<%= app %>/concat/api_management.less'],
      },
      jshint: {
        options: {
          curly: true,    //必须大括号包裹
          eqeqeq: true,   //对于简单类型，使用===和!==，而不是==和!=
          newcap: true,   //对于首字母大写的函数（声明的类），强制使用new
          noarg: true,    // 禁用arguments.caller和arguments.callee
          sub: false,      //对于属性使用aaa.bbb而不是aaa['bbb']
          undef: false,   //查找所有未定义变量
          boss: true,    //查找类似与if(a = 0)这样的代码
          node: true     //
        },
        src: ['<%= src %>/**/*.js']
      },
      browserify: {
        options:      {
          transform:  [ require('grunt-react').browserify ]
        },
        js: {
          files: {
            '<%= app %>/concat/api_management.js': ['client/src/main.js']
          }
        }
      },
      watch: {
        options: {
          spawn: true
        },
        jsHint: {
          files: ['<%= src %>/**/*.js'],
          tasks: ['jshint:src']
        },
        mergeJs: {
          files: ['<%= src %>/**/*.js'],
          tasks: ['browserify:js']
        },
        less: {
          files: ['<%= src %>/**/*.less'],
          tasks: ['compile_css']
        }
      },
      sshexec: {
        startNode: {
          command: 'node /home/ra/apps/emigration/server/bin/startup.js',
          options: {
            host: '<%= host %>',
            username: 'ra',
            password: '1234'
          }
        }
      }
    });

    //grunt.registerTask('lessx', ['less:app', 'less:admin']);
    grunt.registerTask('default', []);
    grunt.registerTask('compile_css', ["concat:less", "less:compile", "clean:less"]);
};
