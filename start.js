const
    corrosion = require('./corrosion'),
    path = require('path'),
    config = require('./config.json'),
    fs = require('fs'),
    https = require('https'),
    http = require('http'),
    btoa = e => new Buffer.from(e).toString("base64"),
    ssl = {
        key: fs.readFileSync(path.join(__dirname, '/ssl/default.key')),
        cert: fs.readFileSync(path.join(__dirname, '/ssl/default.crt')),
    },
    error = fs.readFileSync(path.normalize(__dirname + '/public/error.html'), 'utf-8'),
    proxy = new corrosion({
        prefix: config.prefix,
        title: config.title,
        codec: config.codec,
        forceHttps: true,
        standardMiddleware: true,
        requestMiddleware: [
            corrosion.middleware.blacklist((config.blacklist || []), 'This page has been blocked!'),
        ],
    })
    app = require('express')().use(require('express').static(path.normalize(__dirname + '/public/'), {extensions: ['html']})).use((req, res) => {
    if (req.url.startsWith(proxy.prefix)) return proxy.request(req, res);
    res.status(404, res.send(error))
    });

    proxy.bundleScripts();

(config.ssl ? https : http).createServer(ssl, app).on('upgrade', (clientRequest, clientSocket, clientHead) => proxy.upgrade(clientRequest, clientSocket, clientHead)).listen(process.env.PORT || config.port);
console.log('Degeneracy is available at '+(config.ssl ? 'https://' : 'http://')+'localhost:'+ (process.env.PORT || config.port))
