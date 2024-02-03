FROM node:20

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package.json yarn.* ./

COPY . /home/node/app/

RUN chown -R node:node /home/node/app

RUN yarn

USER node

EXPOSE 3333

ENTRYPOINT [ "node","ace","serve","--watch"]