let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-Sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

// Подключени из scss в css
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
          // минифицирует файл
          .pipe(sass({outputStyle: 'expanded'}))
          // добавления .min
          .pipe(rename({suffix: ".min",}))
          .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
          }))
          .pipe(gulp.dest('app/css'))
          .pipe(browserSync.reload({stream: true}));
});
// таск для css объединить и сжать
//
//    
gulp.task('style', function(){
  return gulp.src([
    'node_modules/magnific-popup/dist/magnific-popup.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/normalize.css/normalize.css'
  ])
  .pipe(concat('libs.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('app/css'))
});

// таск для js объединить и сжать
gulp.task('script', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}));
});
gulp.task('js', function(){
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}));
});

// browser-sync
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});
// Смотреть за изменениями
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))
})

// запуск  таски которые нужны
gulp.task('default', gulp.parallel('style','script','sass','watch','browser-sync'))