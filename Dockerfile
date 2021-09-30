FROM node:14 as nodejs_dev

WORKDIR /src

#CMD [ -d "node_modules" ] && node client.js || npm install && node client.js
#CMD node client.js