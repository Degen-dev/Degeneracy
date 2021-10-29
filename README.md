# Degeneracy
Degeneracy is a very lightweight and easy to use proxy site made to combat web filters such as iboss, Securly, Goguardian, and more!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Degenerate0001/Degeneracy)
&nbsp;

# Setup

```
git clone https://github.com/Degenerate0001/Degeneracy.git
cd Degeneracy
npm i
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
Port: The port you want Degeneracy to listen on.
SSl: Set to true if you would like to use HTTPS (recommended for VPS)
Title: the title you want your tabs to be for Corrosion. (Does not affect icon)
Prefix: The prefix you want for Corrosion. (reccomended that you keep it the same)
Codec: Basic encryption method for filter evasion in Corrosion. (Options include `xor`, `base64`, or `classic`. xor or base64 are recommended)
Blacklist: Sites that you want to block with Corrosion.
Smokeprefix: Prefix for smoke. (recommended that you keep it the same)

# Persistance With PM2

I have listed PM2 as a method for persistance as it is easy to work with, and it offers server monitoring.

To get started, run the following commands:

```
npm i pm2 -g
pm2 start start.js
pm2 startup
pm2 save
```
Run the first command outside of the `Degeneracy` directory if you want to use PM2 for anything else.

# ToDo

* Fix Tab Cloaking
