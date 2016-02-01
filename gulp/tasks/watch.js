// Watch task
// ----------
// Watch files for changes and run their tasks on change.

var gulp  = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch', 'webServer'], function() {
	gulp.watch(config.scss.src, ['scss']);
	gulp.watch(config.html.src, ['html']);
	gulp.watch(config.scripts.src, ['scripts']);
	gulp.watch(config.xslt.src, ['xslt']);
	gulp.watch(config.xml.src, ['xml']);
	gulp.watch(config.images.src, ['images']);
});