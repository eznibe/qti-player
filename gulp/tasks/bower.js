// Bower task
// ----------
// Copy files from bower_components to the build folder.
// Trigger live reload.

var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config').bower;

gulp.task('bower', function () {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest))
		.pipe(connect.reload());
});