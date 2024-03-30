FROM node:alpine

WORKDIR /app

COPY mock-data.json .
COPY mock-server.js .

EXPOSE 8000

CMD ["node", "mock-server.js"]
