module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			options: {
				sourceMap: false
			},
			dist: {
				files: {
					'styles/shared.css': 'styles/shared.scss',
					'styles/toolbar.css': 'styles/toolbar.scss',
					'styles/login.css': 'styles/login.scss',
					'styles/bienvenido.css': 'styles/bienvenido.scss',
					'styles/producto.css': 'styles/producto.scss',
					'styles/carrito.css': 'styles/carrito.scss',
					'styles/compra_completada.css': 'styles/compra_completada.scss'
				}
			}
		},
		shell: {
			serve: {
				command: 'serve'
			},
			serve_prod: {
				command: 'serve -p 80'
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'styles',
					src: ['*.css', '!*.min.css'],
					dest: 'styles',
					ext: '.min.css'
				}]
			}
		},
		watch: {
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass']
			},
			cssmin: {
				files: ['**/*.css'],
				tasks: ['cssmin']
			}
		},
		concurrent: {
			serve: ['shell:serve', 'watch:sass', 'watch:cssmin'],
			serve_prod: ['shell:serve_prod', 'watch:sass', 'watch:cssmin']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('serve', [
		'sass',
		'cssmin',
		'concurrent:serve'
	]);

	grunt.registerTask('serve_prod', [
		'sass',
		'cssmin',
		'concurrent:serve_prod'
	]);
};
