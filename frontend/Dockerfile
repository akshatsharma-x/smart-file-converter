FROM node:iron-bullseye

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
