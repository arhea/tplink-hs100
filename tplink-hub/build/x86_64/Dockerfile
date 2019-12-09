FROM node:10-alpine
ADD rootfs.tar.gz /
RUN apk --update --no-cache add curl \
    && mkdir -p /usr/src/app \
    && npm install -g npm
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
HEALTHCHECK CMD curl --fail http://localhost:3000/health || exit 1
CMD [ "npm", "start" ]
