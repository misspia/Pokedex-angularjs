var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

imagemin = require('gulp-imagemin');
require('events').EventEmitter.prototype._maxListeners = 100;

var runSequence = require('run-sequence');

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('**/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    }
  })
})

gulp.task('sass', function(){
  return gulp.src('app/scss/main.scss')
    .pipe(sass()) 
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('vendor-prefix', function () {
    var processors = [
	  autoprefixer,
	  cssnext,
	  precss
	];
    return gulp.src('app/scss/main.css')
        .pipe(postcss(processors))
        .pipe(cssnano())
        .pipe(gulp.dest('app/scss'));
});

gulp.task('minify-images', function() {
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'))
})


gulp.task('autoprefix', function(){
	return gulp.src('app/css/main.css')
	.pipe(autoprefixer({
		browsers: [''],
		cascade: false
	}))
	.pipe(gulp.dest('app/css'))
})

gulp.task('useref', function(){
  return gulp.src('**/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', function(callback) {
  runSequence('sass' ,'vendor-prefix', ['useref', 'images', 'json'], callback);
});

