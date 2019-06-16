# socksproxy

A Dockerized SOCKS proxy that connects to [socksd](https://github.com/zbo14/socksd) over SSH and tunnels your traffic.

`socksproxy` also exposes an HTTP proxy that routes traffic through the SOCKS proxy. This is intended for clients that only support web proxies.

## Install

Make sure you have [Docker](https://docs.docker.com/install/) installed.

Then `git clone` the repository and `sh /path/to/socksproxy/install.sh`.

## Usage

### Build

`$ socksproxy build`

Build the Docker image for the proxy.

### Initialize

`$ socksproxy init`

Create directories with the SSH keys, SSH config, and `known_hosts` file.

The SSH config is copied from the reference file `./ssh_config`. Once initialized, you can make config changes in `./etc/ssh/ssh_config` (e.g. change `DynamicForward`).

The directories will be mounted as volumes inside the container when the proxy starts.

This command only needs to run once.

### Add host and public key

`$ socksproxy add-host HOST PORT PUBKEY`

Add a host, port, and its public key to the aforementioned `known_hosts` file.

### Start

`$ socksproxy start HOST PORT`

Start a Docker container running the SOCKS/HTTP proxies.

The SOCKS proxy should connect to `HOST:PORT` if it's in `known_hosts` with the correct public key.

The SOCKS proxy should listen on the `DynamicForward` port specified in the config and the HTTP proxy on the next port.

### Stop

`$ socksproxy stop`

Remove the Docker container and the volume.

## Contributing

Please do!

If you find a bug or think of an enhancement, [open an issue](https://github.com/zbo14/socksproxy/issues/new). Then, if you feel so inclined, [create a pull request](https://github.com/zbo14/socksproxy/compare/develop...) addressing the issue. You should push your changes to a feature branch and request merge to `develop`.

You don't have to open an issue before a pull request, but it facilitates discussion and gives you a chance to receive feedback on approach/design before diving into implementation.
