var gulp = require('gulp');

var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
	// Grabs the app.js file
    return browserify('./app/js/app.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('app.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
})

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist/js'));
});


gulp.task('webserver', function() {
  //var stream = gulp.src('app').pipe(webserver());
  //stream.emit('kill');
  gulp.src('public')
    .pipe(webserver({
      //path: './app/index.html',
      //fallback: 'app/index.html',
      livereload: true,
      directoryListing: false,
      open: true
    }));
    //stream.emit('kill');
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/js/*.js', ['lint', 'browserify', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'browserify', 'scripts', 'webserver','watch']);