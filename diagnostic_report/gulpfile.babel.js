import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

gulp.task('es6', () => gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')));

gulp.task('styles', () => gulp.src('public/*')
    .pipe(gulp.dest('dist/public')));

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

gulp.task('watch', ['es6', 'styles'], () => {
  return nodemon({
    script: 'bin/www',
    watch: 'src',
    tasks: ['es6'],
  });
});

gulp.task('build', ['es6', 'styles']);