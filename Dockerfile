# Build-essential miatt használunk debian rendszert (bcrypt.js-t helyben fordítjuk le)
FROM node:10.16.0-stretch-slim

# API-szerver ne fejlesztői módban induljon el
ENV NODE_ENV production

# Ide telepítsük a szervert
WORKDIR /usr/src/app

# package.json fájlok (telepítendő függőségek listája) megfelelő helyre másolása
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY "trainer-site/package.json" "trainer-site/package.json"
COPY "server/package.json" "server/package.json"

# Bcrypt.js fordításához szükséges programok telepítése
RUN apt-get update
RUN apt-get install -y build-essential make automake gcc g++ cpp libkrb5-dev libc6-dev man-db autoconf pkg-config 

# Szerver és tornász oldal függőségeinek telepítése
RUN npm run preinstall

# Forráskód másolása
COPY . .

# API-szerver portját a tornász oldalnak is ismernie kell
RUN sed -i "s/localhost:9000/localhost:8080/" trainer-site/package.json

# Az API-szerver portját használjuk a gazda gépen is
EXPOSE 8080

# Futtassuk a szervert
CMD npm start