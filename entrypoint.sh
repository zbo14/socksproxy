#!/bin/sh

ssh -4fNv -D 0.0.0.0:$3 -p $2 socksproxy@$1

SOCKS_PORT=$3 HTTP_PORT=$4 node index.js
