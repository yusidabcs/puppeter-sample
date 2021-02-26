FROM node:12
RUN mkdir -p /usr/src/app
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 5000

CMD [ "node","--inspect=0.0.0.0", "index.js" ]