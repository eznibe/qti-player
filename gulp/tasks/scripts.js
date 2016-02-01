// Scripts task
// ----------
// Copy javascript files to their directories.
// Trigger live reload.

var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config').scripts;

gulp.task('scripts', function() {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest))
		.pipe(connect.reload());
});