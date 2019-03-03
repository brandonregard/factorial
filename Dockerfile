# lets use a lightweight image and good 
FROM node:8-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install --production --quiet
COPY . .
RUN npm install pm2
CMD ["./node_modules/pm2/bin/pm2-runtime", "app.js"]