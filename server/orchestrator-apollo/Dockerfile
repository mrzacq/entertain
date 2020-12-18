FROM node:12.0-alpine

WORKDIR /var/www/entertain-me

ENV PORT = 3000

COPY package.json package-lock.json* ./

RUN npm install -g nodemon

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm run dev"]