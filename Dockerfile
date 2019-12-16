FROM node:12

ENV LISTEN_PORT=8080
ENV LISTEN_IP=0.0.0.0
ENV API_KEY=UNKNOWN

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

EXPOSE 8080

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

ENV NODE_ENV=production

COPY ./app.js ./
COPY ./index.js ./

USER node

CMD ["node", "./app.js"]
