var gulp = require('gulp');

require('./gulp-tasks/lint');
require('./gulp-tasks/sass');
require('./gulp-tasks/scripts');

gulp.task('default', ['sass', 'scripts']);
