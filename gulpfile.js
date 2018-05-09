var gulp = require('gulp');
var sass = require('gulp-sass');
var refresh = require('gulp-refresh');
var webserver = require('gulp-webserver');
var browserSync = require('browser-sync').create();


gulp.task('styles', function() {
    // Stuff here
    gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css/'))
    .pipe(refresh());
  });

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', './css/*.css'])
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(refresh());
});

gulp.task('scripts', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest('./app/js/'));
});

// Compile all sass files into CSS
gulp.task('watch', function(){
    refresh.listen();
    gulp.watch('./app/scss/**/*.scss', ['styles']);
});

// Run project and load in browser by default
gulp.task('run', function(){
    gulp.src('./app/')
    .pipe(webserver({
        livereload: true,
        directoryListing: {
            enable: true,
            path: 'http://localhost/'
        },
        open: true
    }));
});