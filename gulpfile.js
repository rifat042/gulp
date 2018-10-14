const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Running SASS
gulp.task('sass', function () {
    gulp.src(['src/sass/*.scss', 'node_modules/bootstrap/scss/bootstrap.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});


// COPYING JS FILES
gulp.task('js', function () {
    gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});


// COPYING HTML FILES
gulp.task('html', function () {
    gulp.src(['./src/*.html'])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// serving browser sync
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: './dist'
    });

    gulp.watch(['src/sass/*.scss', 'node_modules/bootstrap/scss/bootstrap.scss'], ['sass']);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve', 'html']);