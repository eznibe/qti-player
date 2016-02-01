// Clean task
// ----------
// Use vinyl-paths to easily get the file path of files in the stream.
// Then pass it to the del method to remove the build folder.

var gulp = require('gulp');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('clean', function () {
	return gulp.src('build')
		.pipe(vinylPaths(del));
});