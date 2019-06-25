#!/bin/sh

ssh \
  -4N \
  -D 0.0.0.0:$LOCAL_PORT \
  -i /home/socksproxy/.ssh/id_ed25519 \
  -o IdentitiesOnly=yes \
  -o StrictHostKeyChecking=yes \
  -p $REMOTE_PORT \
  socksproxy@$HOST
