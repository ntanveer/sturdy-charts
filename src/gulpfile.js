var gulp = require('gulp');

require('./gulp/lint');
require('./gulp/sass');
require('./gulp/scripts');
require('./gulp/copy');

gulp.task('default', ['sass', 'scripts', 'copy']);

// The following node modules are needed
// Remember to run 'npm install -i gulp' and then 'npm install' in the root folder.
// gulp, gulp-concat, gulp-jshint, gulp-rename, gulp-sass, gulp-uglify, gulp-util
