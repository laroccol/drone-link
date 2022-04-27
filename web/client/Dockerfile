FROM node:latest

EXPOSE 8080
WORKDIR /app/client

COPY /src ./src
COPY /static /app/static
COPY /config config/
COPY /.babelrc .
COPY /package.json .
COPY /package-lock.json .

RUN npm i --no-progress --ignore-optional

CMD npm start