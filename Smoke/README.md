# Smoke
An official proxy of Fog Network and Ludicrous, smoke is a gateway for uncensored internet

<a href="https://heroku.com/deploy?template=https://github.com/FogNetwork/Smoke"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/heroku2.svg"><img></a>
<a href="https://repl.it/github/FogNetwork/Smoke"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/replit2.svg"><img></a>
<a href="https://glitch.com/edit/#!/import/github/FogNetwork/Smoke"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/glitch2.svg"><img></a>

### Setup Locally

```
cd smoke
```

```
npm install
```

```
npm start
```

### Config

```
{
    "port": "10000",
    "prefix": "/go/",
    "title": "Service",
    "blockedHosts": [],
    "blockedIp": []
}
```

`"port": "8080"` Changes the port 

`"prefix": "/go/"` Changes the prefix for the proxy

`"title": "Service"` Changes the title of websites

`"blockedHosts": [{"url": "https://example.com", "reason": "No Access"}, {"url": "https://example.org"}]` Websites blocked by proxy

`"blockedIp": []` Websites blocked by Ip

Make my EnderKingJ and Nebelung
