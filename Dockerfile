FROM node:10.15.3 as builder

WORKDIR /usr/src/luck-ui

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run-script build-prod

FROM nginx:latest

ENV PORT=80

COPY --from=builder /usr/src/luck-ui/dist/* /usr/share/nginx/html

EXPOSE $PORT
