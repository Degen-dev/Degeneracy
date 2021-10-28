var https = require("https"),
    bodyParser = require("body-parser"),
    mime = require("mime"),
    fs = require("fs"),
    btoa = e => new Buffer.from(e).toString("base64"),
    atob = e => new Buffer.from(e, "base64").toString("utf-8"),
    getMimeType = e => (-1 !== e.indexOf("?") && (e = e.split("?")[0]), mime.getType(e) || "text/html"),
    config = require("./config.json"),
    prefix = config.prefix.includes("/", 2) ? config.prefix : () => {
        prefix.replace("/", "")
    },
    {
        port: port,
        blockedHosts: blockedHosts,
        title: title,
        blockedIp: blockedIp
    } = require("./config.json"),
    proxy = new(require("./lib/smoke"))(prefix, {
        hostBlock: blockedHosts,
        docTitle: title
    }),
    app = require("express")().use(bodyParser.urlencoded({
        extended: false
    })).use(bodyParser.json()).get("*", (e, r) => {
      e.headers.useragent === 'googlebot' && r.writeHead(403).end();
        if (e.url.startsWith(prefix + "gateway")) {
          if (!e.query.url.startsWith('http')) {
            e.query.url = 'https://google.com/search?q='+e.query.url
          }
          new URL(e.query.url) ? r.redirect(prefix + btoa(e.query.url)) : (atob(e.query.url) ? r.redirect(prefix + btoa(e.query.url)) : r.end("URL Parse Error"))}
        else {
            if (e.url.startsWith(prefix)) return proxy.request(e, r);
            if ("/" === e.url) r.writeHead(200, {
                "content-type": "text/html"
            }).end(fs.readFileSync("./public/index.html"));
            else {
                var t = "./public" + e.url;
                if (!fs.existsSync(t)) return void r.end(fs.readFileSync("./lib/err.html", "utf-8").replace("err_reason", 'File Not Found, "' + t.replace(/^\.\/public\//gm, "") + '"'));
                r.sendFile(e.url, {
                    root: "./public"
                })
            }
        }
    }).post('*', (req, res) => {
      req.headers.useragent === 'googlebot' && res.writeHead(403).end();
        if (req.url.startsWith(prefix)) return proxy.post(req, res)
    }),
    expressWs = require('express-ws')(app);
app.ws('*', (ws, req) => {}).listen(process.env.PORT || port, () => {
    console.log('https://localhost:' + port)
})
