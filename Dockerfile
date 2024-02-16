# https://www.howtogeek.com/devops/how-to-dockerise-a-react-app/
# FROM node:latest AS build

# WORKDIR /build

# COPY package.json package.json

# COPY package-lock.json package-lock.json

# RUN npm ci

# COPY public/ public

# COPY src/ src

# RUN npm run build

# FROM httpd:alpine

# WORKDIR /var/www/html

# COPY --from=build /build/build/ .

FROM ubuntu:latest
RUN apt-get -y update