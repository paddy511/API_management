module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        client: 'client',
        server: 'server',
        app: 'client/app',
        src: 'client/app/src',
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
        bower: {
            install: {
                "directory": "client/app/bower_components"
            }
        },
        ngtemplates: {
            cacheHtml: {
                options: {
                    module: "views.html",
                    bootstrap: function (module, script) {
                        var s = "'use strict';";
                        var js = script.slice(script.indexOf(s) + s.length);

                        return "define(['angular'], function(angular){ \n" +
                            " 'use strict'; \n" +
                            "  return angular.module('" +
                            module +
                            "',[])\n" +
                            ".run(['$templateCache',function($templateCache){\n" +
                            js +
                            "\n\n }]);\n" +
                            "});";
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                cwd: '<%= app %>',
                src: ['src/**/*.html'],
                dest: '<%= app %>/concat/viewHtml.js'
            }
        },
        less: {
            options: {
                compress: true,
                stdout: true,
                stderr: true
            },
            //compile: {
            //    files: [
            //        {
            //            expand: true,
            //            cwd: '<%= src %>',
            //            src: ['**/*.less'],
            //            dest: '<%= app %>/css',
            //            rename: function (dest, src) {
            //                return dest + '/' + src.replace(/\.less/, '.css');
            //            }
            //        }
            //    ]
            //},
            compile: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= app %>/concat',
                        src: ['emigration.less'],
                        dest: '<%= app %>/concat',
                        rename: function (dest, src) {
                            return dest + '/' + src.replace(/\.less/, '.css');
                        }
                    }
                ]
            }
        },
        concat: {
            //css: {
            //    src: ['<%= app %>/css/**/*.css'],
            //    dest: '<%= app %>/concat/emigration.css'
            //},
            less: {
                src: ['<%= app %>/src/**/*.less'],
                dest: '<%= app %>/concat/emigration.less'
            }
        },
        clean: {
            //css: ['<%= app %>/css'],
            less: ['<%= app %>/concat/emigration.less'],
            dist: ['<%= dist %>'],
            build: ['<%= build %>'],
            bower_components: [ "client/app/bower_components"],
            lib: ["lib"],
            img_bower_ra_basic_tools_trash: [ "client/app/img/ra_basic_tools/**/*", "!client/app/img/ra_basic_tools/img", "!client/app/img/ra_basic_tools/img/**/*", "client/app/img/ra_basic_tools/.bower.json"],
            img_bower_ra_session_management_trash: [ "client/app/img/ra_session_management/**/*", "!client/app/img/ra_session_management/img", "!client/app/img/ra_session_management/img/**/*", "client/app/img/ra_session_management/.bower.json", "client/app/img/ra_session_management/.bowerrc"]
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: './',
                        dest: '<%= dist %>',
                        src: [
                            'server/**/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: './',
                        dest: '<%= dist %>/build/',
                        src: [
                            'client/**/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: './',
                        dest: '<%= dist %>/',
                        src: [
                            'package.json',
                            'emigration_start.sh',
                            'emigration_stop.sh'
                        ]
                    }
                ]
            },
            bower_img: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'client/app/bower_components/ra_basic_tools/img',
                        dest: 'client/app/img',
                        src: [
                            '**/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'client/app/bower_components/ra_session_management/img',
                        dest: 'client/app/img',
                        src: [
                            '**/*'
                        ]
                    }
                ]
            }
        },
        watch: {
            options: {
                spawn: true
            },
            views: {
                files: ['<%= src %>/**/*.html'],
                tasks: ['ngtemplates:cacheHtml']
            },
            less: {
                files: ['<%= src %>/**/*.less'],
                tasks: ['compile_css']
            },
            jsHint: {
                files: ['<%= src %>/**/*.js'],
                tasks: ['jshint:src']
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
        },
        requirejs: {
            compile: {
                options: {
                    appDir: "dist/build/client/app",
                    baseUrl: "./",
                    dir: "dist/client/app",
                    mainConfigFile: "dist/build/client/app/main.js",
                    modules: [
                        {
                            name: "main",
                            include: ['emigrationModule']
                        }
                    ],
                    keepBuildDir: false,
                    allowSourceOverwrites: true,
                    optimize: "uglify",
                    uglify: {
                        toplevel: true,
                        ascii_only: true,
                        beautify: false,
                        max_line_length: 1000,
                        no_mangle: true
                    },
                    //stubModules: ['angular'],
                    skipDirOptimize: true,
                    generateSourceMaps: false,
                    optimizeCss: null,
                    cssImportIgnore: null,
                    useStrict: false,
                    skipModuleInsertion: false,
                    findNestedDependencies: true,
                    removeCombined: false,
                    fileExclusionRegExp: /^\./,
                    preserveLicenseComments: true,
                    logLevel: 0,
                    throwWhen: {
                        optimize: true
                    }
                }
            }
        }
    });

    //grunt.registerTask('lessx', ['less:app', 'less:admin']);
    grunt.registerTask('default', []);

    grunt.registerTask('compile_css', ["concat:less", "less:compile", "clean:less"]);
    grunt.registerTask('bower_install', ['clean:bower_components', 'bower:install', 'clean:lib', 'copy_bower_img']);
    //将公共代码中img考入对应img目录中
    grunt.registerTask('copy_bower_img', ['copy:bower_img']);
    grunt.registerTask('build', ["bower_install", "compile_css", "ngtemplates:cacheHtml", "clean:dist", "copy:dist", "requirejs:compile", "clean:build"]);

};
