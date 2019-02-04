const gulp = require('gulp');
const sass = require ('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');


function compilaSass() {
    return gulp
    .src('src/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()); // atualiza os arquivos, sem que seja necessário um reload do browser
}

// Função para iniciar o browser
function browser(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

function watch() {
    gulp.watch('src/scss/*.scss', compilaSass);
    gulp.watch('./src/js/*.js', gulpJS);
    gulp.watch(['*.html']).on('change', browserSync.reload);
}

function gulpJS(){
    return gulp
    .src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

gulp.task('sass', compilaSass);
gulp.task('browser-sync', browser);
gulp.task('watch', watch);
gulp.task('mainjs', gulpJS);

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));