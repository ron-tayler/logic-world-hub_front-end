FROM endeveit/docker-jq AS front_dependencies

COPY ./package.json /tmp/package.json

RUN jq '{ dependencies, devDependencies }' < /tmp/package.json > /tmp/dependencies.json


FROM node as front_builder

WORKDIR /activate_front

COPY --from=front_dependencies /tmp/dependencies.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

ENV NODE_ENV=production
COPY . .
RUN npm run vite:build

FROM nginx:1.23-alpine

WORKDIR /front/common/public

COPY --from=front_builder /activate_front/dist ./
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf