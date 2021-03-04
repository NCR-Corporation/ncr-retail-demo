FROM node:12

COPY . /app
ENV NEXT_PUBLIC_APP_CONFIGURED='true'

RUN chown -R node:node /app

WORKDIR /app

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build

# # Running the app
EXPOSE 3000
CMD npm run start

