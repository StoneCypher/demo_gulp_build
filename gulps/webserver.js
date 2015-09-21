
'use strict';

var gulp    = require('gulp'),
    express = require('express');

var dirs    = require('../config/dirs.json'),
    servers = require('../config/servers.json');

var server,
    listener,
    fxserver,
    fx_instance;





function serverHeaders(server, headers) {

  server.use(function(req, res, next) {                   // Fixture server CORS
    for (var i in headers) {
      if (headers.hasOwnProperty(i)) {
        res.header(i, headers[i]);
      }
    }
    next();
  });

}





gulp.task('start-webserver', function(done_cb) {

  server = express();

  serverHeaders(server, servers.fe.headers);    // run the server's cors headers

  server.use(express.static(dirs.fe.publish));
  listener = server.listen(servers.fe.port);

  ['', '/', '/index', '/index.htm', '/index.html'].map(function(RootName) {
    server.all(RootName, function(req, res) {
      res.sendFile('index.html', {'root': dirs.fe.publish });
    });
  });

  return done_cb();

});





gulp.task('trigger-serve', ['start-webserver'], function() {
  // this needs to stay empty; it's the start point to an execution graph
  listener.close();
});





gulp.task('serve', ['build'], function() {

  gulp.watch(dirs.fe.publish);
//gulp.watch(targets.sass_watch, ['sass']);  // todo comeback whargarbl

  return gulp.run('start-webserver');

});





gulp.task('just-fixture-serve', function(done_cb) {         // does *not* run the default task

  fxserver = express();                                     // Set up an express server (but not starting it yet)

  serverHeaders(fxserver, servers.fixture.headers);         // run the server's cors headers

  fxserver.all('/*', function(req, res) {                   // it's a browser SPA, so just send it all to index
    var fixExpress = dirs.fe.fixtures.substring(2);         // express doesn't want './' at the beginning
    var reqTarget  = res.req.url;
    res.type('application/json');
    res.sendFile(reqTarget, {'root': fixExpress});
  });                                                       // the SPA will use pushstate mumbo jumbo to accomodate

  fxserver.use(express.static(dirs.fe.fixtures));           // Use our 'dist' folder as rootfolder
  fx_instance = fxserver.listen(servers.fixture.port);      // start the fixture webserver

  return done_cb();

});





gulp.task('fixture-serve', ['just-fixture-serve'], function() {
  return gulp.run('serve'); // chain back and start the dev webserver
});
