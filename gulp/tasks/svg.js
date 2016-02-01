// SVG task
// ----------
// Copy SVG files from the src folder to the build folder.
// Trigger live reload.

var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config').svg;

gulp.task('svg', function() {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest))
		.pipe(connect.reload());
});