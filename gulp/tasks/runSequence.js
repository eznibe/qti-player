// Run Sequence task
// ----------
// Run a sequence of gulp tasks in the specified order.

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('runSequence', function () {
	runSequence('clean', ['build'], 'server');
});