
'use strict';

var gulp      = require('gulp'),
    less      = require('gulp-less'),

    babel     = require('gulp-babel'),

    dirs      = require('../config/dirs.json'),
    targets   = require('../config/targets.json'),
    less_cfg  = require('../config/less.json'),
    babel_cfg = require('../config/babel.json'),

    makeTask  = require('./util.js').makeTask;





makeTask('fe-less',  less(less_cfg),   targets.fe.less,  dirs.fe.publish_css);
makeTask('be-less',  less(less_cfg),   targets.be.less,  dirs.be.publish_css);
makeTask('sh-less',  less(less_cfg),   targets.sh.less,  dirs.sh.publish_css);

makeTask('fe-babel', babel(babel_cfg), targets.fe.babel, dirs.fe.built_js);
makeTask('be-babel', babel(babel_cfg), targets.be.babel, dirs.be.built_js);
makeTask('sh-babel', babel(babel_cfg), targets.sh.babel, dirs.sh.built_js);





gulp.task('fe-html', ['make-dirs'], function() {

  return gulp.src(targets.fe.html)
    .pipe(gulp.dest(dirs.fe.publish));

});





gulp.task('fe-pre-br', ['make-dirs', 'fe-babel', 'fe-less', 'fe-html']);
gulp.task('frontend',  ['fe-browserify-copy']);  // see gulps/browserify.js

gulp.task('backend',   ['make-dirs', 'be-babel', 'be-less']);
gulp.task('shared',    ['make-dirs', 'sh-babel', 'sh-less']);

gulp.task('build',     ['frontend', 'backend', 'shared']);
