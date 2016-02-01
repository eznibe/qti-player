// Web server task
// ----------
// Set up local web server.

var gulp    = require('gulp');
var connect = require('gulp-connect');
var config  = require('../config').webServer;

gulp.task('webServer', function () {
	connect.server(config);
});