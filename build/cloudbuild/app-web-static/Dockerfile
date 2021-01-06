FROM node:12

ENV PORT 3000

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN echo $(ls -1 /home/node)

WORKDIR /home/node/app

RUN echo $(ls -la)

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "start"


# COPY wwwroot/ /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY docker-startup.sh /app

# RUN chown -R nginx:nginx /usr/share/nginx/html


# USER nginx:nginx
# ENV HOME /app

# EXPOSE 8080/tcp
# ENTRYPOINT /app/docker-startup.sh
