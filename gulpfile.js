var gulp       = require('gulp'),
    size       = require('gulp-size'),
    less       = require('gulp-less'),
    prefix     = require('gulp-autoprefixer'),
    rename     = require('gulp-rename'),
    uncss      = require('gulp-uncss'),
    minifyCSS  = require('gulp-minify-css'),
    mozjpeg    = require('imagemin-mozjpeg'),
    livereload = require('gulp-livereload');

gulp.task('minify-images', function () {
    gulp.src('src/images/*')
    .pipe(size({gzip: true, title: 'src'}))
    .pipe(mozjpeg({ quality: '65-80' })())
    .pipe(size({gzip: true, title: 'minified'}))
    .pipe(gulp.dest('images'))
    .pipe(livereload());
});

gulp.task('compile-style', function() {
    gulp.src('src/styles/main.less')
    .pipe(less())
    .pipe(prefix('last 2 version', 'ie >= 7'))
    .pipe(uncss({ html: ['index.html'] }))
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('compile-script', function() {
    gulp.src('src/scripts/main.js')
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(livereload());
});

gulp.task('reload-html', function () {
    gulp.src('*html')
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/styles/*.less', ['compile-style']);
    gulp.watch('src/scripts/*.js', ['compile-script']);
    gulp.watch('src/images/*', ['minify-images']);
    gulp.watch('*.html', ['reload-html']);
});
