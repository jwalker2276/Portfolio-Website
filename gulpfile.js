var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('autoprefixer', function () {
    var processors = [
        autoprefixer({browsers:['last 2 version']})
    ];

    return gulp.src('./src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
