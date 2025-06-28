FROM node:lts-alpine3.21 AS build

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package*.json ./


RUN npm ci

COPY . ./
RUN ng build --configuration=production


FROM nginx:latest AS nginx

COPY --from=build /usr/src/app/dist/runefx-website /usr/share/nginx/html

COPY nginx.conf  /etc/nginx/nginx.conf
EXPOSE 80