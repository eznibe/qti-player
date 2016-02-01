// SCSS task
// ----------
// Compile all SCSS files as CSS in their directories.
// Link source maps in the CSS file back to their SCSS files.
// Handle compile errors.
// Autoprefix vendor prefixes.
// Trigger live reload.

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../config').scss;

gulp.task('scss', ['images'], function () {
	return gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(sass(config.settings))
		.on('error', handleErrors)
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({ browsers: ['last 2 version'] }))
		.pipe(gulp.dest(config.dest))
		.pipe(connect.reload());
});