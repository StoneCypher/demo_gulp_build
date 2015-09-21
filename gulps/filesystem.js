
'use strict';

var path = require('path'),
    fs   = require('fs'),
    del  = require('del'),
    gulp = require('gulp'),
    dirs = require('../config/dirs.json');





gulp.task('clean', function(cb) {
  return del([dirs.fe.build], cb);
});





gulp.task('make-dirs', ['clean'], function(done_cb) {

  var upath;

  var work = function(udirs) {

    for (var key in udirs) {

      if (typeof udirs[key] === 'object') {
        work(udirs[key]);
      } else {

        try {
          upath = '.' + path.sep + path.normalize(udirs[key]);
          fs.mkdirSync(upath);
        } catch(e) {
          if (e.code !== 'EEXIST') {
            console.log('caught ' + JSON.stringify(e) + ' while making dirs: ' + upath);
          }
        }

      }
    }

  };

  work(dirs);

  return done_cb();

});
