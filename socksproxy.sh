#!/bin/bash -e

autossh \
  -4Nv \
  -D 127.0.0.1:$LOCAL_PORT \
  -i /root/.ssh/socksproxy \
  -o IdentitiesOnly=yes \
  -o ServerAliveInterval=20 \
  -o StrictHostKeyChecking=no \
  -p $REMOTE_PORT \
  socksproxy@$HOST
