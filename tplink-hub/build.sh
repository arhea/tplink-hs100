#!/bin/bash -ex

curl http://dl-cdn.alpinelinux.org/alpine/v3.10/releases/armhf/alpine-minirootfs-3.10.3-armhf.tar.gz -o rootfs.tar.gz

docker build -f ./build/x86_64/Dockerfile -t arhea/tplink-hs100-hub:amd64 .
docker build -f ./build/armhf/Dockerfile -t arhea/tplink-hs100-hub:armhf .

docker image push arhea/tplink-hs100-hub:amd64
docker image push arhea/tplink-hs100-hub:armhf

docker manifest create --amend arhea/tplink-hs100-hub:latest arhea/tplink-hs100-hub:amd64 arhea/tplink-hs100-hub:armhf
docker manifest push arhea/tplink-hs100-hub:latest

rm -f rootfs.tar.gz

