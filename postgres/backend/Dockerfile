# simple node backend image
FROM node:18-alpine

WORKDIR /usr/src/app

# install dependencies (including dev for nodemon)
COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
