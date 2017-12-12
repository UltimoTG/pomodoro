var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concatCss = require('gulp-concat-css'),
    run = require('gulp-run');

var src = './src',
    app = './app';

gulp.task('js', function() {
  return gulp.src( src + '/js/timer.js' )
    .pipe(browserify({
      transform: 'reactify',
      extensions: 'browserify-css',
      debug: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(app + '/js'));
});

gulp.task('css', function() {
  gulp.src( src + '/css/*.css')
  .pipe(concatCss('app.css'))
  .pipe(gulp.dest(app + '/css'));
});

gulp.task('watch', ['serve'], function() {
  gulp.watch( src + '/js/**/*', ['js']);
  gulp.watch( src + '/css/**/*.css', ['css']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

gulp.task('serve', ['js', 'css'], function() {
  run('electron app/main.js').exec();
});

gulp.task('default', ['watch', 'serve']);
