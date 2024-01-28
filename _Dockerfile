# Etapa de desarrollo
FROM node:20.10.0-alpine3.19 as dev
WORKDIR /app
COPY package.json ./
RUN npm install
COPY .env .
COPY . .
CMD ["npm", "run", "start"]

# Etapa de producción
# FROM node:20.11.0-alpine3.19 as prod
# WORKDIR /app
# COPY package.json ./
# RUN npm install --only=production
# COPY .env .
# COPY ./dist ./
# CMD ["npm", "run", "start:prod"]
