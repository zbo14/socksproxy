FROM alpine:latest

COPY . /

RUN apk add --no-cache --update --upgrade openssh && \
    adduser -D socksproxy

USER socksproxy

ENTRYPOINT \
  HOST=$HOST \
  LOCAL_PORT=$LOCAL_PORT \
  REMOTE_PORT=$REMOTE_PORT \
  sh entrypoint.sh
