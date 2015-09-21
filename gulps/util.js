
'use strict';

var gulp = require('gulp'),
    util = require('./util.js');





function makeTask(uName, uJob, uTargets, uDest) {

  gulp.task(uName, ['make-dirs'], function() {

    return gulp.src(uTargets)
      .pipe(uJob)
      .pipe(gulp.dest(uDest));

  });

}





var errorHandler = function(err) {

  console.log(err.toString());
  this.emit("end");

};





module.exports = {

  errorHandler : errorHandler,
  makeTask     : makeTask

};
