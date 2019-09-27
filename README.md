# socksproxy

A SOCKS proxy that connects to [socksd](https://github.com/zbo14/socksd) over SSH and tunnels your traffic.

## Install

Clone the repo and `sudo sh install.sh`.

## Usage

`socksproxy` runs as a systemd service so you can use `systemctl` commands.

### Start

`sudo systemctl start socksproxy`

### Stop

`sudo systemctl stop socksproxy`

### View logs

`sudo journalctl -u socksproxy`

### Config

The config file `/etc/socksproxy/socksproxy.conf` contains the following:

```sh
## The address of the socksd instance
HOST=127.0.0.1

## The port socksproxy listens on
LOCAL_PORT=17897

## The port socksd is listening on
REMOTE_PORT=17896
```

## Contributing

Please do!

If you find a bug, think of an enhancement, or just have a question, feel free to [open an issue](https://github.com/zbo14/socksproxy/issues/new). You're also welcome to [create a pull request](https://github.com/zbo14/socksproxy/compare/develop...) addressing an issue. You should push your changes to a feature branch and request merge to `develop`.
