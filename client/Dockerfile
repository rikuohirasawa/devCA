FROM --platform=linux/amd64 node:19.6.0
WORKDIR /app
COPY ./package*.json .
COPY yarn*.lock .
RUN yarn install
RUN yarn run build
COPY . ./
CMD [ "yarn start" ]

