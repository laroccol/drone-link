FROM node:latest


WORKDIR /app/api
EXPOSE 3000

COPY /src ./src
COPY /static /app/static
COPY /dist-api .
COPY /package.json .
COPY /package-lock.json .
COPY /.babelrc .

RUN npm i --no-progress --ignore-optional

CMD npm run dev:watch
