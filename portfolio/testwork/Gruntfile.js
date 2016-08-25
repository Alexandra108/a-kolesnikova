'use strict';
module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
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
		cssmin:{
			style: {
				options: {
					keepSpecialComments: 0,
					report: "gzip"
				},
				files: {
					"build/css/styles.min.css":["build/css/styles.css"]
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
		},
		replace: {
			build:{
				options:{
					patterns:[
					{
						match: /[\"\']images\//g,
						replacement:'"/static/images/'
					},{
						match: /[\"\']css\//g,
						replacement:'"/static/css/'
					},{
						match: /[\"\']js\//g,
						replacement:'"/static/js/'
					}]
				  },
				files: [{
					expand : true,
					src: [
						"build/css/style*.css",
						"build/index.html"
					]
				}]
			}
		}
	});
	
	grunt.registerTask('default', ['clean','copy','less','cmq','cssmin','csscomb','concat','uglify', 'imagemin']);
};