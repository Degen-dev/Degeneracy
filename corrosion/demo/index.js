  // https here is necesary for some features to work, even if this is going to be behind an SSL-providing reverse proxy.
const https = require('https');
const fs = require('fs');
const path = require('path');
const Corrosion = require('corrosion');
const config = require('./config.json')

// you are free to use self-signed certificates here, if you plan to route through an SSL-providing reverse proxy.
const ssl = {
    key: fs.readFileSync(path.join(__dirname, '/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, '/ssl.cert')),
};
//const server = https.createServer(ssl);
 server = config.ssl ? https.createServer({
        key: fs.readFileSync("./ssl/default.key"),
        cert: fs.readFileSync("./ssl/default.crt")
    }, app) : http.createServer(app);


const proxy = new Corrosion({
    codec: 'xor', // apply basic xor encryption to url parameters in an effort to evade filters. Optional.
    prefix: '/service/' // specify the endpoint (prefix). Optional.
});

proxy.bundleScripts();

server.on('request', (request, response) => {
    if (request.url.startsWith(proxy.prefix)) return proxy.request(request, response);
    response.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
}).on('upgrade', (clientRequest, clientSocket, clientHead) => proxy.upgrade(clientRequest, clientSocket, clientHead)).listen(8080); // port other than 443 if it is needed by other software.
