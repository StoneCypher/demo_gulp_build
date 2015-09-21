
'use strict';

var gulp       = require('gulp'),
    source     = require('vinyl-source-stream'),

    util       = require('./util.js'),

    dirs       = require('../config/dirs.json'),
    targets    = require('../config/targets.json'),

    browserify = require('browserify');





gulp.task('fe-browserify', ['fe-pre-br'], function() {

  var browserifyConfig = {
    "entries"    : [dirs.fe.built_js + "/environment.js"],
    "extensions" : [".jsx"]
  };

  return browserify(browserifyConfig, { "debug" : false /* todo whargarbl !production */ })

    .add(dirs.fe.built_js     + "/fe.js",    { "expose" : "fe" })

    .require(dirs.fe.built_js + "/index.js", { "expose" : "index" })

    .bundle()
    .on("error", util.errorHandler)
    .pipe(source("index.js"))
    .pipe(gulp.dest(dirs.fe.bundle));

});





gulp.task('fe-browserify-copy', ['fe-browserify'], function() {

  return gulp.src(targets.fe.bundle)
    .pipe(gulp.dest(dirs.fe.publish));

});
