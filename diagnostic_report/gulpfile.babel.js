import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import gulpLoadPlugins from 'gulp-load-plugins';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

const $ = gulpLoadPlugins();

gulp.task('es6', () => gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')));

gulp.task('views', () => gulp.src('src/views/**/*.*')
  .pipe(gulp.dest('dist/views')));

gulp.task('default', () => {
  gulp.watch('src/**/*.js', ['es6']);
});

gulp.task('start', () => {
  return nodemon({
    script: 'dist/app.js',
    ext: 'js',
    env: { NODE_ENV: 'development' },
  });
});

gulp.task('clean' , function(){
  return gulp.src([
     'dist', //删除dist整个文件夹
    ] ).pipe($.clean());
});

gulp.task('watch', ['es6', 'views'], () => {
  return nodemon({
    script: 'bin/www',
    watch: 'src',
    tasks: ['es6'],
  });
});

gulp.task('build', ['es6', 'styles']);