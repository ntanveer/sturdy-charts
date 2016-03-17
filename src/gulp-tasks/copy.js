var gulp = require('gulp');

gulp.task('copy', function () {
	gulp.src('libs/materialize-src/font/**/*.{ttf,woff,woff2,eot,svg}')
		.pipe(gulp.dest('output/font'));

    gulp.src('libs/bootstrap-src/assets/fonts/**/*.{ttf,woff,woff2,eot,svg}')
		.pipe(gulp.dest('output/fonts'));
});
