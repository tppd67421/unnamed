var gulp                = require('gulp');
var browserSync         = require('browser-sync');
var sass                = require('gulp-sass');
var autoprefixer        = require('gulp-autoprefixer');
var concatCSS           = require('gulp-concat-css');
var plumber             = require('gulp-plumber');
var wait                = require('gulp-wait');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        // proxy: "gifro.dev"
         server: "src/"
    });
    //Следим за изменениями файлов
    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch('src/js/*.js', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/*.php").on('change', browserSync.reload);
    gulp.watch("src/css/*.css").on('change', browserSync.reload);
});

//Компилируем Sass в CSS и обновляем страницу
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(wait(300))
        .pipe(plumber({
            errorHandler: function (error) {
            console.log('Error: ' + error.message);
            this.emit('end');
            }}))
        .pipe(sass())
        .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
        .pipe(concatCSS("style.css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
})


gulp.task('default', ['serve']);



