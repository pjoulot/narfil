var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');
const merge = require('merge-stream');

gulp.task('buildCss', function () {
    return gulp.src(['scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']})]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css/'))
});

gulp.task('watch', function () {
    gulp.watch(['scss/*.scss'], gulp.series('buildCss'));
});

gulp.task('copy', function () {
  var fortawesome_css = gulp.src('node_modules/@fortawesome/fontawesome-free/css/**/*')
    .pipe(gulp.dest('libraries/fontawesome-free/css'));

  var fortawesome_webfonts = gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
    .pipe(gulp.dest('libraries/fontawesome-free/webfonts'));

  var hamburger = gulp.src('node_modules/hamburgers/dist/hamburgers.css')
    .pipe(gulp.dest('libraries/hamburger/css'));

  var lity = gulp.src('node_modules/lity/dist/lity.css')
    .pipe(gulp.dest('libraries/lity/css'));

  return merge(fortawesome_css, fortawesome_webfonts, hamburger, lity);
});

gulp.task('default', gulp.series('buildCss', 'copy', 'watch'));
