var gulp      = require('gulp'),
    size      = require('gulp-size'),
    less      = require('gulp-less'),
    prefix    = require('gulp-autoprefixer'),
    rename    = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    mozjpeg   = require('imagemin-mozjpeg');


gulp.task('minify-images', function () {
    gulp.src('src/images/*')
    .pipe(size({gzip: true, title: 'src'}))
    .pipe(mozjpeg({ quality: '65-80' })())
    .pipe(size({gzip: true, title: 'minified'}))
    .pipe(gulp.dest('images'));
});

gulp.task('compile-style', function() {
    gulp.src('src/styles/main.less')
    .pipe(less())
    .pipe(prefix('last 2 version', 'ie >= 7'))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('css'));
});

gulp.task('minify-css', function() {
    gulp.src('css/main.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('css'));
});
