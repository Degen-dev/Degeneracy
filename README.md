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
    <a href="https://discord.gg/discord.gg/unblock">
        <img src="https://img.shields.io/discord/419123358698045453?style=for-the-badge&logo=discord"
            alt="chat on Discord"></a>
</p>
<p align="center">
Degeneracy is a functional and easy to use proxy site made to combat web filters such as iboss, Securly, Goguardian, and more!

## Notice
This is a Public Demo for Degeneracy. This means that only Corrosion works for it. If you would like to implement Womginx, setup Womginx and point it to a `w` subdomain. Setup for it can be found here: <a href="https://github.com/binary-person/womginx">Womginx</a>

<a href="https://heroku.com/deploy?template=https://github.com/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/heroku2.svg"><img></a>
<a href="https://repl.it/github/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/replit2.svg"><img></a>
<a href="https://glitch.com/edit/#!/import/github/Degenerate0001/Degeneracy"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/glitch2.svg"><img></a>

# Table Of Contents
- [Degeneracy](#Degeneracy)
  - [Installation and Setup](#Installation-and-Setup)
  - [Configuration](#Configuration)
    - [Default Config](#Default-Config-Example)
  - [Persistance](#Persistance-With-PM2)
  - [Nginx Config](#Nginx)
    - [Letsencrypt](#Letsencrypt)
      - [Cron](#Cron)
  - [Support](#Support)
  - [License](#License)

# Installation and Setup

```sh
$ git clone https://github.com/Degenerate0001/Degeneracy
$ cd Degeneracy
$ npm install
$ npm start
```

# Configuration

Configure Degeneracy in `config.json`.

## Default Config Example:

```json
{
    "port": 8443,
    "ssl": false,
    "title": "Degeneracy",
    "prefix": "/go/",
    "codec": "xor",
    "blacklist": ["accounts.google.com"],
} 
```
* Port: The port you want Degeneracy to listen on.
* SSl: Set to true if you would like to use HTTPS (recommended for VPS)
* Title: the title you want your tabs to be for Corrosion. (Does not affect icon)
* Prefix: The prefix you want for Corrosion. (recomended that you keep it the same)
* Codec: Basic encryption method for filter evasion in Corrosion. (Options include `xor`, `base64`, or `plain`. xor or base64 are recommended)
* Blacklist: Sites that you want to block with Corrosion.

**Note: For a VPS, it is highly recommended that you remove `forceHttps: true` from `start.js` if you are hosting on a VPS. It is only useful for Heroku and just breaks things without Heroku.**

# Persistance With PM2

I have listed PM2 as a method for persistance as it is easy to work with, and it offers server monitoring.

To get started, run the following commands:

```sh
$ npm i pm2 -g
$ pm2 start start.js
$ pm2 startup
$ pm2 save
```
Run the first command outside of the `Degeneracy` directory if you want to use PM2 for anything else.

# Nginx

Set up Nginx to Serve Degeneracy and Obtain Letsencrypt Certificates using Certbot.

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
    server_name your.domain.com;
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
    
    #location / { #uncomment if you would like to block Googlebot.
    #   if ($http_user_agent ~ (Googlebot) ) {
    #       #return 403;
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

# Support

For any questions, comments, or concerns, please open an issue or contact me on Discord: `@Degenerate#0001`

# License

This project is licensed under the GNU General Public License v3.

# Donations

If you would like to contribute to the project via donation, send in some crypto! Your donation will be very appreciated :D

Bitcoin

bc1quudcnamt6fe0y3ll9qtqpuckf985utgpl0x8gu

Ethereum

0xeBC65F88Ced95247738C1e3F2114387D8B878348

Monero

47LetcrPmiuR1V9FvehmEXhAc2YG2kk1PaB89nKcsNyWbgkUwJC2py7QzD1SoNqwX19uGbQ67MfQNga1op29AwHn9wRhv8L

Tron

TVqUhp1JARTLwpAzGN1aNhA2BAgcgbpTqx

Litecoin

LQ1d7trtg8eY94jMZKn1FuDLB7pfa6QKeC

Bitcoin Cash

qqqv4lpv3tsedstmu5nlwnve43mgdgvjwqgjtnwff9
