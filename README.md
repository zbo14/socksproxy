# socksproxy

A Dockerized SOCKS proxy that connects to [socksd](https://github.com/zbo14/socksd) over SSH and tunnels your traffic.

## Install

Make sure you have [Docker](https://docs.docker.com/install/) installed.

Then `git clone` the repo and `sh /path/to/socksproxy/install.sh`.

## Usage

### Build

`$ socksproxy build`

Build the Docker image for the SOCKS proxy.

### Initialize

`$ socksproxy init`

Create the `socksproxy` Docker network and a directory with the SSH keys and `known_hosts` file.

The directory will be mounted as a volume inside the container once it starts.

This command only needs to run once.

### Add a host

`$ HOST= PORT= PUBKEY= socksproxy add-host`

Add a host, port, and its public key to the aforementioned `known_hosts` file.

### Get hosts

`$ socksproxy get-hosts`

Print the contents of the `known_hosts` file.

### Remove a host

`$ HOST= PORT= socksproxy rm-host`

Remove the entry for host and port in the `known_hosts` file.

### Start

`$ HOST= LOCAL_PORT= REMOTE_PORT= socksproxy start`

Start a Docker container that connects to a host on the remote port.

For this to succeed....
1. The host and port must be in the `known_hosts` file, and
2. The SOCKS proxy's public key must be in the `authorized_keys` file for user `socksproxy` on the host

The SOCKS proxy will run in the container, mapped to the local port, and tunnel traffic over the SSH connection.

### Stop

`$ socksproxy stop`

Remove the Docker container and the volume.

## Contributing

Please do!

If you find a bug, think of an enhancement, or just have a question, feel free to [open an issue](https://github.com/zbo14/socksproxy/issues/new). You're also welcome to [create a pull request](https://github.com/zbo14/socksproxy/compare/develop...) addressing an issue. You should push your changes to a feature branch and request merge to `develop`.
