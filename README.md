<p align="center">
    <img src="https://raw.githubusercontent.com/degen-dev/degeneracy/master/public/images/degen.png"
        height="300">
</p>
<p align="center">
    <a href="https://github.com/Degen-dev/Degeneracy/issues" alt="Contributors">
        <img src="https://img.shields.io/github/issues/Degen-dev/Degeneracy?style=for-the-badge" /></a>
    <a href="https://github.com/Degen-dev/Degeneracy/network/members" alt="Forks">
        <img src="https://img.shields.io/github/forks/Degen-dev/Degeneracy?style=for-the-badge" /></a> 
    <a href="https://github.com/Degen-dev/Degeneracy/stargazers" alt="Stars">
        <img src="https://img.shields.io/github/stars/Degen-dev/Degeneracy?style=for-the-badge" /></a>
    <a href="https://github.com/Degen-dev/Degeneracy/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/Degen-dev/Degeneracy?style=for-the-badge" /></a>
    <a href="https://discord.gg/unblock">
        <img src="https://img.shields.io/discord/419123358698045453?style=for-the-badge&logo=discord"
            alt="chat on Discord"></a>
</p>
<p align="center">
Degeneracy is a functional, free, and easy to use web proxy site made to bypass web filters.

## Notice
This is a Public Demo for Degeneracy. This means that only Corrosion works for it. If you would like to implement Womginx, setup Womginx and point it to a `w` subdomain. Setup for it can be found here: <a href="https://github.com/binary-person/womginx">Womginx</a>

<a href="https://heroku.com/deploy?template=https://github.com/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/heroku2.svg"><img></a>
<a href="https://repl.it/github/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/replit2.svg"><img></a>
<a href="https://glitch.com/edit/#!/import/github/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/glitch2.svg"><img></a>

# Table Of Contents
- [Installation and Setup](#Installation-and-Setup)
- [Configuration](#Configuration)
  - [Default Config](#Default-Config-Example)
  - [Persistance](#Persistance-With-PM2)
- [Nginx Config](#Nginx)
  - [Letsencrypt](#Letsencrypt)
   - [Cron](#Cron)
- [FAQ](#Frequently-Asked-Questions)
- [Support](#Support)
- [Proxy Sources](#Proxy-Sources)
- [License](#License)
- [Donations](#Donations)

# Installation and Setup

```sh
$ git clone https://github.com/Degenerate0001/Degeneracy
$ cd Degeneracy
$ npm install
$ chmod u+x main.sh
$ ./main.sh
```

# Configuration

Configure Degeneracy in `config.json`.

## Default Config Example:

```js
self.__uv$config = {
    prefix: '/service/',
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};
```
* Prefix: The prefix you want for Corrosion. (recomended that you keep it the same)
* Codec: Basic encryption method for filter evasion in Corrosion. (Options include `xor`, `base64`, or `plain`. xor or base64 are recommended)

# Persistance With PM2

I have listed PM2 as a method for persistance as it is easy to work with, and it offers server monitoring.

To get started, run the following commands:

```sh
$ npm i pm2 -g
$ pm2 start start.js
$ pm2 startup
$ pm2 save
```
Run the first command outside of the `Degeneracy` directory.

# Nginx
Set up Nginx to serve Degeneracy and obtain Letsencrypt certificates using Certbot.

Run the following commands to install Nginx and Certbot (skip this step if you already have both installed):

```
$ apt install -y nginx python3 python3-venv libaugeas0
$ python3 -m venv /opt/certbot/
$ /opt/certbot/bin/pip install --upgrade pip
$ /opt/certbot/bin/pip install certbot certbot-nginx
$ ln -s /opt/certbot/bin/certbot /usr/bin/certbot
```

Note: each line above is a separate command.

Next, create the following file in `/etc/nginx/sites-enabled/degeneracy`.

```nginx
server {
    server_name your.domain.com; # Replace with your actual domain
    location / {
        proxy_set_header Accept-Encoding "";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Host $host:$server_port;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";   
        proxy_pass https://127.0.0.1:8443;  # change to http if ssl is set to false
        proxy_http_version 1.1; 
        proxy_set_header Host $host;
    }
    # Uncomment the block below this to block GoogleBot
    #location / { 
    #   if ($http_user_agent ~ (Googlebot) ) {
    #       return 403;
    #}
    
    listen 80;
}
```

## Letsencrypt

Run these commands to get certificates for your site. Certbot will make this easy!

```
$ certbot --nginx -d <insert your domain here>
$ systemctl restart nginx
```

### Cron

If you would like, you can setup a cron job to automatically renew your certificates once they expire. To do this, run the following command.

```
$ crontab -e
```

Here you may be prompted to choose a text editor. The default will be just fine for our purposes. After you are brought into the file, add the following line to it.

```
0 12 * * * /usr/bin/certbot renew --quiet
```

This will check every day at noon if your certs are about to expire. If they are, they will be silently renewed. By doing this, you'll never really have to worry about certs again after your initial install and setup.

# Frequently Asked Questions

A compilation of some frequently asked questions, and short answers for them.
    
| Question | Answer |
| -------- | ------ |
| Why do I keep getting 404 errors? | The most likely reason is that you are entering a path that doesn't exist. Ex: pleasedontbock.me/foo. If you know this isn't the case and it is something else, please open an issue. |
| Why is a site marked as deceptive? | Google will sometimes mistake a proxy site for a scam/phishing site. The best thing you can do in this situation is to report it as a mistake [here](https://safebrowsing.google.com/safebrowsing/report_error/?hl=en). |
| Where can I get more links? | You can get more links by clicking the "Community" button on the homepage, or by going to [discord.gg/unblock](https://discord.gg/unblock). There I will have more links posted, and you can check out other cool proxy sites! |
| Why is it when I click on a button, nothing happens? | Sometimes caching leads to a button not working. Try pressing `crtl + shift + r` to fix this. If the issue persists, open an issue. |
| What if my issue isn't listed on here? | No worries! You can contact me on Matrx (degenerate0001:matrix.org), Discord (Degenerate#0001), or by opening an issue. |

# Support

For any questions, comments, or concerns, please open an issue, contact me on Discord: `@Degenerate#0001`, or contact me on Matrix: `degenerate0001:matrix.org`.

# Proxy Sources
    
[Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet)
    
[Corrosion](https://github.com/titaniumnetwork-dev/Corrosion) (Mostly deprecated thanks to Ultraviolet)
    
[Womginx](https://github.com/binary-person/Womginx)
    
[Rammerhead](https://rammerhead.org) (Not open-source so I linked to the official site)
    
# License
```
Copyright (C) 2021-present, Degen-dev

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
```
# Donations

If you would like to contribute to the project via donation, send in some crypto or subscribe to the [Patreon](https://patreon.com/degeneracy)! Your donation/contribution is very much appreciated :D

| Crypto Type | Wallet Address |
| ----------- | -------------- |
| Bitcoin | bc1quudcnamt6fe0y3ll9qtqpuckf985utgpl0x8gu |
| Ethereum | 0xeBC65F88Ced95247738C1e3F2114387D8B878348 |
| Monero | 47LetcrPmiuR1V9FvehmEXhAc2YG2kk1PaB89nKcsNyWbgkUwJC2py7QzD1SoNqwX19uGbQ67MfQNga1op29AwHn9wRhv8L |
| Tron | TVqUhp1JARTLwpAzGN1aNhA2BAgcgbpTqx |
| Litecoin | LQ1d7trtg8eY94jMZKn1FuDLB7pfa6QKeC |
| Bitcoin Cash | qqqv4lpv3tsedstmu5nlwnve43mgdgvjwqgjtnwff9
