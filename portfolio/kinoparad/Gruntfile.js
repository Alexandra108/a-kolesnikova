'use strict';
module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less:{
			style: {
				files: {
					"build/css/styles.css":["source/less/styles.less"]
				}
			}
		},
		cmq:{
			style: {
				files: {
					"build/css/styles.css":["build/css/styles.css"]
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: [
					'Android >= <%= pkg.browsers.android %>',
					'Chrome >= <%= pkg.browsers.chrome %>',
					'Firefox >= <%= pkg.browsers.firefox %>',
					'Explorer >= <%= pkg.browsers.ie %>',
					'iOS >= <%= pkg.browsers.ios %>',
					'Opera >= <%= pkg.browsers.opera %>',
					'Safari >= <%= pkg.browsers.safari %>'
				]
			},
			dist: {
				src: ['build/css/styles.css']
			}
		},
		cssmin:{
			style: {
				options: {
					keepSpecialComments: 0,
					report: "gzip"
				},
				files: {
					"build/css/styles.min.css":['build/css/styles.css','build/css/font-awesome.min.css','build/css/jquery.jscrollpane.css']
				}
			}
		},
		csscomb: {
			style: {
				expand : true,
				src: ["build/less/**/*.less"]
			}
		},
		concat: {
			dist: {
				src: [
					'source/js/jquery-1.9.1.min.js',
					'source/js/classie.js',
					'source/js/jquery.jscrollpane.min.js',
					'source/js/main.js'
				],
				dest: 'build/js/common.js',
			}
		},
		uglify: {
			build: {
				src: 'build/js/common.js',
				dest: 'build/js/common.min.js'
			}
		},
		imagemin: {
			images: {
				options: {  
					optimizationLevel: 3
				},
				files: [{
					expand : true,
					src: ["build/images/**/*.{png,jpg,gif}"]
				}]
			}
		},
		clean:{
			build:["build"]
		},
		copy: {
			build:{
				files: [{
					expand : true,
					cwd: "source",
					src: [
						"images/**",
						"fonts/**",
						"css/**",
						"index.html"
					],
					dest: "build"
				}]
			}
		}
	});
	
	grunt.registerTask('default', ['clean','copy','less','cmq','autoprefixer','cssmin','csscomb','concat','uglify', 'imagemin']);
};