// HTML task
// ----------
// Copy HTML files from the src folder to the build folder.
// Trigger live reload.

var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config').html;

gulp.task('html', function() {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest))
		.pipe(connect.reload());
});