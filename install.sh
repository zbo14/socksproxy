#!/bin/bash -e

apt update
apt install -y autossh

chmod u+x socksproxy.sh
cp socksproxy.sh /usr/bin

cp socksproxy.service /etc/systemd/system/

mkdir -p /etc/socksproxy/
cp socksproxy.conf /etc/socksproxy/socksproxy.conf

mkdir -p /root/.ssh
ssh-keygen -t ed25519 -f /root/.ssh/socksproxy -N ''
