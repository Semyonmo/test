var jade = require('gulp-jade');
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
var handleErrors = require('../util/handleErrors');
var configView = require('../config').view;


gulp.task('view', function () {
    return gulp.src(configView.src)
        .pipe(jade({
            pretty: true,
            locals: JSON.parse(fs.readFileSync(configView.data, 'utf8'))
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(configView.dest));
});



