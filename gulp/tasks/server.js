// Server task
// ----------
// Run tasks which set up the dev server and watch for file changes.

var gulp = require('gulp');

gulp.task('server', ['webServer', 'watch']);