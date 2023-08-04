FROM node:19.3-alpine3.16

ENV TZ=Europe/Bucharest

RUN mkdir -p /application
WORKDIR /application

RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn

RUN yarn install --pure-lockfile
# RUN yarn global add nodemon --prefix /usr/local

EXPOSE 3000

CMD ["npm", "run", "dev", "--host"]