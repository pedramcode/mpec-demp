FROM node:22.17-alpine AS build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
RUN npm run build



FROM node:22.17-alpine AS prod

WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
CMD ["node", "dist/main.js"]