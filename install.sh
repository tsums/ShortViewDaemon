#!/bin/bash

# Install ShortView Daemon on Ubuntu Server
apt-get install curl nodejs-legacy npm git stress mongodb -y
git clone https://github.com/ShortView/ShortViewDaemon /opt/shortview
cd /opt/shortview
npm install
cp shortview.service /etc/systemd/system/
systemctl enable shortview.service
systemctl start shortview.service
echo "--------------------------------------"
echo "ShortView Dameon installed and running"
ip=$(curl -s http://api.ipify.org/)
echo "Connect at: $ip:9235"
