FROM node:9.11.2 as builder

MAINTAINER Karski Daniel

COPY . /var/ts-luck-ui

WORKDIR /var/ts-luck-ui

RUN npm install
RUN npm run build-prod

FROM nginx:latest

ENV PORT=80

COPY --from=builder /var/ts-luck-ui/dist/* /usr/share/nginx/html

EXPOSE $PORT
