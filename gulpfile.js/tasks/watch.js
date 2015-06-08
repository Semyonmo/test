var gulp = require('gulp');
var config = require('../config');
var watch = require('gulp-watch');
var _ = require('lodash');

gulp.task('watch', ['setWatch', 'browserSync'], function () {
    var watched = [
        {
            PATH: config.view.files,
            task: "view"
        },
        {
            PATH: config.style.watch,
            task: "style"
        },
        {
            PATH: config.images.src,
            task: "images"
        },
        {
            PATH: config.assets.src,
            task: "assets"
        },
        {
            PATH: config.sprites.src,
            task: "sprites"
        }
    ];

    _.forEach(watched, function (watched) {
        watch(watched.PATH , function () {
            gulp.start(watched.task);
        });
    });
});