var gulp = require('gulp');
var sass = require('gulp-sass');
var util = require('gulp-util');
var rename = require('gulp-rename');

function handleError(error) {
	util.log(error);
	process.exit(1);
}

gulp.task('sass', function () {
    	var files = [
        "charts/**/*.scss"
	];
	return gulp.src(files)
		.pipe(sass({
			errLogToConsole: true,
			includePaths: []
		}))
		.on('error', handleError)
		.pipe(rename(function (path) {
			path.basename = "sturdy-charts";
			path.dirname = "";
			path.extname = ".css";
		}))
		.pipe(gulp.dest('output'));
});
