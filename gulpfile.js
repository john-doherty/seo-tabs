'use strict';

var gulp = require('gulp');
var minifyJs = require('gulp-minify');
var gulpRemoveLogging = require('gulp-remove-logging');
var del = require('del');
var runSequence = require('run-sequence');
var replace = require('gulp-string-replace');
var sizereport = require('gulp-sizereport');
var pjson = require('./package.json');

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('build-js', function () {
    return gulp.src('./src/*.js')
        .pipe(replace(/0.0.0/g, pjson.version))
        .pipe(gulpRemoveLogging())
        .pipe(minifyJs({
            noSource: true,
            ext: {
                min: '.min.js'
            },
            preserveComments: 'some',
            exclude: ['tasks']
        }))
        .pipe(replace(new RegExp('@version@', 'g'), pjson.version))
        .pipe(gulp.dest('dist'));
});

gulp.task('sizereport', function () {
    return gulp.src('./dist/*')
        .pipe(sizereport({
            gzip: true
        }));
});

gulp.task('build', function (callback) {
    runSequence(
        'clean',
        'build-js',
        'sizereport',
        callback
    );
});
