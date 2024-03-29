FROM node:19
  
WORKDIR /usr/src/app/backend

COPY --chown=node:node ./backend .
RUN npm install

ENV DEBUG=blogs-backend:*

CMD ["npm", "run", "dev"]