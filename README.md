# gomez
gomez is a torrent search engine written in NodeJS.

## screenshots
![Search Results](./screenshots/1.png)

![Homepage](./screenshots/2.png)

## disclaimer
use this for legal purposes only please. 

## features
- [open json api](./docs/api/README.md)
- clean and simple ui
- no logs

## Installation (Debian10)

apt update -y && apt upgrade -y
apt install nodejs npm git brotli -y 
cd ~
git clone https://github.com/normanlol/gomez
cd gomez
npm install -d

## One-time Use

node index.js

## Production

wget https://raw.githubusercontent.com/normanlol/gomez/main/gomez.service -O /etc/systemd/system/gomez.service

systemctl daemon-reload
systemctl enable --now gomez
systemctl status gomez 
