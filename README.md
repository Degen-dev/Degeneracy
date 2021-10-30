# Degeneracy
Degeneracy is a very lightweight and easy to use proxy site made to combat web filters such as iboss, Securly, Goguardian, and more!

<a href="https://heroku.com/deploy?template=https://github.com/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/heroku2.svg"><img></a>
<a href="https://repl.it/github/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/replit2.svg"><img></a>
<a href="https://glitch.com/edit/#!/import/github/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/glitch2.svg"><img></a>

# Setup

```sh
git clone https://github.com/Degenerate0001/Degeneracy
cd Degeneracy
npm install
npm start
```

# Configuration

Configure Degeneracy in `config.json`.

Default Config Example:

```json
{
    "port": 8443,
    "ssl": false,
    "title": "Degeneracy",
    "prefix": "/go/",
    "codec": "xor",
    "blacklist": ["accounts.google.com"],
    "smokeprefix": "/web/"
} 
```
* Port: The port you want Degeneracy to listen on.
* SSl: Set to true if you would like to use HTTPS (recommended for VPS)
* Title: the title you want your tabs to be for Corrosion. (Does not affect icon)
* Prefix: The prefix you want for Corrosion. (recomended that you keep it the same)
* Codec: Basic encryption method for filter evasion in Corrosion. (Options include `xor`, `base64`, or `classic`. xor or base64 are recommended)
* Blacklist: Sites that you want to block with Corrosion.
* Smokeprefix: Prefix for smoke. (recommended that you keep it the same)

# Persistance With PM2

I have listed PM2 as a method for persistance as it is easy to work with, and it offers server monitoring.

To get started, run the following commands:

```sh
npm i pm2 -g
pm2 start start.js
pm2 startup
pm2 save
```
Run the first command outside of the `Degeneracy` directory if you want to use PM2 for anything else.

# To Do

* Fix Tab Cloaking
