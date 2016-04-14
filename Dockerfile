FROM node:4.4

RUN npm install -g npm

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# you can change this with docker run for development
ENV NODE_ENV=production

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build

CMD ["npm", "start"]
