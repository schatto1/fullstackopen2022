FROM node:16
  
WORKDIR /usr/src/example-app


COPY --chown=node:node . .
RUN npm install

ENV DEBUG=example-app:*

CMD ["npm", "run", "dev"]