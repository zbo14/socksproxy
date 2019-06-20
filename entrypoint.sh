#!/bin/sh

ssh \
  -4Nv \
  -D 0.0.0.0:$LOCAL_PORT \
  -o IdentitiesOnly=yes \
  -o StrictHostKeyChecking=yes \
  -p $REMOTE_PORT \
  socksproxy@$HOST
