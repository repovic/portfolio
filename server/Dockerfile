FROM node:16-alpine
ENV PORT 5555

WORKDIR /app

RUN npm cache clean -f
RUN rm -rf node_modules

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm", "start"]