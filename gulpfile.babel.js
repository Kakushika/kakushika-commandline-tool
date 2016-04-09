/* eslint strict: 0, arrow-body-style: 0 */
'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins();

gulp.task('lint', () => {
  return gulp.src('src/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('test', () => {
  // No specificate test
  return 0;
});

gulp.task('clean', () => del(['bin/*.js']));

gulp.task('build', () => {
  return gulp.src('src/*.js')
    .pipe($.babel())
    .pipe(gulp.dest('bin'));
});

gulp.task('default', (cb) => {
  runSequence(
    'clean',
    'build',
    cb
  );
});
