// Set watch task
// ----------
// Define whether gulp is watching for file changes.

var gulp = require('gulp');

gulp.task('setWatch', function() {
	global.isWatching = true;
});