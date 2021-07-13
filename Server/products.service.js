var server = require('./server.js');
var routes = ['products'];
var serviceName = "products";
server.start(serviceName, routes);