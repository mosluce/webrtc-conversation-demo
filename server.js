// @flow

const app = require('./app'),
    http = require('http').createServer(app),
    io = require('socket.io').listen(http, {});

io.on('connection', require('./io'));

http.listen(process.env.PORT || 3000, () => {
    console.log('http server running');
});

if (app.get('env') === 'development') {
    const fs = require('fs'),
        path = require('path'),
        https = require('https').createServer({
            key: fs.readFileSync(path.join(__dirname, 'server.key')),
            cert: fs.readFileSync(path.join(__dirname, 'server.crt'))
        }, app),
        ios = require('socket.io').listen(https, {});

    ios.on('connection', require('./io'));

    https.listen(8443, () => {
        console.log('https server running');
    });
}