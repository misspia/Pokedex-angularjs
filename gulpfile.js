// https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

var jsonminify = require('gulp-jsonminify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

var runSequence = require('run-sequence');
var gnf = require('gulp-npm-files');

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
    return gulp.src('app/css/main.css')
        .pipe(postcss(processors))
        .pipe(cssnano())
        .pipe(gulp.dest('app/css'));
});

gulp.task('images', function(){
  return gulp.src('app/img/*.+(png|gif)')
  .pipe(gulp.dest('dist/app/img'))
});

gulp.task('json', function(){
  return gulp.src('app/json/**/*.json')
  .pipe(jsonminify())
  .pipe(gulp.dest('dist/app/json'))
});

gulp.task('copyDependencies', function() {
  gulp.src(gnf(), {base:'./'}).pipe(gulp.dest('./dist'));
});


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

