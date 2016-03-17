var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var util = require('gulp-util');

function handleError(error) {
	util.log(error);
	process.exit(1);
}

gulp.task('scripts', function () {
	var files = [
        "init/*.js",
        "core/*.js",
        "charts/**/*.js"
	];

	return gulp.src(files)
		.pipe(concat('sturdy-charts.js', { newLine: "\r\n" }))
		.pipe(gulp.dest('output'))
		.pipe(uglify())
		.on('error', handleError)
		.pipe(rename('sturdy-charts.min.js'))
		.pipe(gulp.dest('output'));
});
