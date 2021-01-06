FROM node:12

ENV PORT 3000

RUN mkdir /app && \
    chmod 777 /run
    
WORKDIR /app

COPY package*.json ./

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

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
