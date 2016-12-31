#!/bin/bash

curl https://fr.alpinelinux.org/alpine/v3.5/releases/armhf/alpine-minirootfs-3.5.0-armhf.tar.gz -o rootfs.tar.gz

docker build -f ./build/x86_64/Dockerfile -t arhea/tplink-hs100-hub:latest .
docker build -f ./build/armhf/Dockerfile -t arhea/tplink-hs100-hub:armhf .

docker push arhea/tplink-hs100-hub:latest
docker push arhea/tplink-hs100-hub:armhf

rm -f rootfs.tar.gz

