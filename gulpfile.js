
var gulp = require('gulp');





require('./gulps/webserver.js');
require('./gulps/build_tasks.js');
require('./gulps/browserify.js');
require('./gulps/filesystem.js');
require('./gulps/synonyms.js');





gulp.task('default', ['build']);
