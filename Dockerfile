FROM node:12

COPY . /app

RUN chown -R node:node /app

WORKDIR /app

USER node

RUN npm install --production

COPY --chown=node:node . .

RUN npm run build

# # Running the app
CMD npm run start

