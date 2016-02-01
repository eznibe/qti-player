// Build task
// ----------
// Populate the build folder.

var gulp = require('gulp');

gulp.task('build', ['scss', 'html', 'scripts', 'xslt', 'xml', 'images', 'svg', 'bower', 'content']);