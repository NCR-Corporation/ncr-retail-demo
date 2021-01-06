FROM node:12

COPY . /app

RUN chown -R node:node /app

WORKDIR /app

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build

# # Running the app
EXPOSE 8080
CMD npm run start

