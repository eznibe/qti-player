// XML task
// ----------
// Copy XML files from the src folder to the build folder.
// Trigger live reload.

var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config').xml;

gulp.task('xml', function() {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest))
		.pipe(connect.reload());
});