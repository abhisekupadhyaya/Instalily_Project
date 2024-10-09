FROM node:18-alpine as builder 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

COPY env.file /usr/src/app/.env

EXPOSE 8000

CMD [ "node", "dist/main" ]