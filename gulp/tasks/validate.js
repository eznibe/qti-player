var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var argv 	= require('yargs').argv;



gulp.task('validate', function () {
	if (argv.t) { process.env.template = argv.t; }

	return gulp.src('validate/templates.js', {read: false})
		.pipe(mocha({reporter: 'spec'}));
});