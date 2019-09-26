#!/bin/bash -e

autossh \
  -4Nv \
  -D 127.0.0.1:$LOCAL_PORT \
  -i /root/.ssh/socksproxy \
  -o IdentitiesOnly=yes \
  -o ServerAliveCountMax=3 \
  -o ServerAliveInterval=30 \
  -o StrictHostKeyChecking=no \
  -p $REMOTE_PORT \
  socksproxy@$HOST
