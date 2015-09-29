var gulp       = require('gulp'),
    size       = require('gulp-size'),
    less       = require('gulp-less'),
    prefix     = require('gulp-autoprefixer'),
    rename     = require('gulp-rename'),
    uncss      = require('gulp-uncss'),
    minifyCSS  = require('gulp-minify-css'),
    mozjpeg    = require('imagemin-mozjpeg'),
    livereload = require('gulp-livereload'),
    notify     = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    newer      = require('gulp-newer');

gulp.task('minify-images', function () {
    gulp.src('images/**')
    .pipe(newer('images'))
    .pipe(size({gzip: true, title: 'src'}))
    .pipe(mozjpeg({ quality: 60 })())
    .pipe(size({gzip: true, title: 'minified'}))
    .pipe(gulp.dest('assets/images'))
    .pipe(livereload())
    .pipe(notify({ title: 'Image has changed', message: '<%= file.relative %> reloaded.'}));
});

gulp.task('compile-style', function() {
    gulp.src('styles/main.less')
    .pipe(less())
    .pipe(prefix('last 2 version', 'ie >= 7'))
    .pipe(uncss({ html: ['index.html'] }))
    .pipe(minifyCSS())
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload())
    .pipe(notify({ title: 'Style has changed', message: '<%= file.relative %> reloaded.'}));
});

gulp.task('compile-script', function() {
    gulp.src('scripts/main.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('maps', {includeContent: false, sourceRoot: '../../scripts'}))
    .pipe(gulp.dest('assets/scripts'))
    .pipe(livereload())
    .pipe(notify({ title: 'Script has changed', message: '<%= file.relative %> reloaded.'}));
});

gulp.task('reload-html', function () {
    gulp.src('*html')
    .pipe(livereload())
    .pipe(notify({ title: 'HTML has changed', message: '<%= file.relative %> reloaded.'}));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('styles/*.less', ['compile-style']);
    gulp.watch('scripts/*.js', ['compile-script']);
    gulp.watch('images/**', ['minify-images']);
    gulp.watch('*.html', ['reload-html']);
});

gulp.task('build', ['compile-script', 'compile-style', 'minify-images']);
