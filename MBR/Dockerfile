FROM node:latest
RUN npm install -g sails
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app
EXPOSE 1501
CMD ["sails", "lift"]