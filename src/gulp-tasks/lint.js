var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
	return gulp.src(['charts/**/*.js', 'core/*.js', 'init/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});
