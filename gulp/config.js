var dest = 'build';
var src = 'src';
var content = 'content';
var templates = 'templates';

module.exports = {
	bower: {
		src: 'bower_components/**/*.{css,js,html,swf}',
		dest: dest + '/bower_components/'
	},
	scss: {
		src: src + '/**/*.scss',
		dest: dest + '/app/'
	},
	html: {
		src: src + '/**/*.html',
		dest: dest + '/app/'
	},
	scripts: {
		src: src + '/**/*.js',
		dest: dest + '/app/'
	},
	xslt: {
		src: src + '/*.xslt',
		dest: dest + '/app/'
	},
	xml: {
		src: templates + '/**/*.xml',
		dest: dest + '/templates/'
	},
	images: {
		src: src + '/images/**',
		dest: dest + '/images/'
	},
	svg: {
		src: src + '/svg/*.svg',
		dest: dest + '/svg/'
	},
	content: {
		src: content + '/media/**',
		dest: dest + '/content/media/'
	},
	credits: {
		humans: 'humans.txt',
		src: src + '/**/*.{js,scss}',
		dest: dest + '/app/'
	},
	webServer: {
		port: 4321,
		host: 'localhost',
		root: dest,
		livereload: true
	}
};