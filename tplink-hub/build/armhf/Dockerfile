FROM scratch
ADD rootfs.tar.gz /
RUN apk update && apk upgrade && apk add curl nodejs \
    && mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
HEALTHCHECK CMD curl --fail http://localhost:3000/health || exit 1
CMD [ "npm", "start" ]
