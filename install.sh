#!/bin/bash -e

cd "$(dirname $0)"

chmod u+x socksproxy

ln -s $PWD/socksproxy /usr/local/bin
