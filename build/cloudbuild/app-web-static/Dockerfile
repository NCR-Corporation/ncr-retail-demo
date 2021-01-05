ARG NGINX_VERSION
ARG NGINX_VARIANT

FROM nginx:${NGINX_VERSION}-${NGINX_VARIANT}

FROM node:12

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "start"

# RUN mkdir /app && \
#     chmod 777 /run

# COPY wwwroot/ /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY docker-startup.sh /app

# RUN chown -R nginx:nginx /usr/share/nginx/html

# WORKDIR /app
# USER nginx:nginx
# ENV HOME /app

# EXPOSE 8080/tcp
# ENTRYPOINT /app/docker-startup.sh
