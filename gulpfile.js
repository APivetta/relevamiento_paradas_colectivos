var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');

var paths = {
  js: ['./www/*.js', './www/modules/**/*.js','!./www/modules/core/templates.js'],
  sass: ['./www/*.scss', './www/modules/**/*.scss'],
  templates: ['./www/*.html', './www/modules/**/*.html']
};

var jshint = require('gulp-jshint');
 
gulp.task('lint', function () {
    return gulp.src(paths.js)
            .pipe(jshint('.jshintrc.json'))
            .pipe(jshint.reporter( 'jshint-stylish' ));
});

gulp.task('default', ['sass', 'template-cache', 'watch']);

gulp.task('template-cache', function() {
  return gulp.src(paths.templates)
    .pipe(templateCache({ standalone: true }))
    .pipe(gulp.dest('./www/modules/core'));
});

gulp.task('sass', function(done) {
  gulp.src('./www/styles.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.templates, ['template-cache']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
