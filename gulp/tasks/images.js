// Image task
// ----------
// Copy images from the src folder to the build folder.
// Optimise images.
// Trigger live reload.

var changed = require('gulp-changed');
var gulp = require('gulp');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var config = require('../config').images;

gulp.task('images', function() {
 	return gulp.src(config.src)
		.pipe(changed(config.dest)) 	// Ignore unchanged files
		// .pipe(imagemin()) 			// Optimize images
		.pipe(gulp.dest(config.dest))
		.pipe(connect.reload());
});