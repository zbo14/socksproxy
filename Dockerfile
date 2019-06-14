FROM node:10.16.0-alpine

COPY . /

RUN apk add --no-cache --update --upgrade openssh && \
    adduser -D socksproxy

USER socksproxy

ENTRYPOINT sh entrypoint.sh $HOST $PORT $SOCKS_PORT $HTTP_PORT
