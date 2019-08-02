<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/pmihaly/fizioterapia">
    <img src="https://user-images.githubusercontent.com/47941079/62365908-a5b48780-b525-11e9-989b-5268fc02131d.png" alt="Fizioterápia logó">
  </a>

  <h3 align="center">Fizioterápia API szerver és tornászoldal</h3>
</p>

<!-- Tartalomjegyzék -->

## Tartalomjegyzék

- [Projektről](#projektről)
  - [Ezzel készült](#ezzel-készült)
- [Fejlesztési környezet létrehozása](#fejlesztési-környezet-létrehozása)
  - [Kellékek](#kellékek)
  - [Telepítés](#telepítés)
- [Végleges build](#végleges-build)
- [Tervek](#tervek)
- [Licensz](#licensz)
- [Elérhetőségek](#elérhetőségek)

<!-- Projektről -->

## Projektről

Fizioterápia alkalmazás API szerver- és tornász oldala

### Ezzel készült

- [Material Dashboard React](https://www.creative-tim.com/product/material-dashboard-react)
- [Generator express](https://github.com/petecoop/generator-express)

  <!-- Fejlesztési környezet létrehozása -->

## Fejlesztési környezet létrehozása

Így futtatsd a letöltött forráskódot.

_A fejlesztői verzió nem számít production buildnek. A kész kiszolgáló futtatásához lásd lejjebb._

### Kellékek

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Telepítés

1. Klónold a repot

```sh
git clone https://github.com/pmihaly/fizioterapia.git
```

2. NPM csomagok telepítése

```sh
npm install
```

A repo gyökérmappájában található package.json fájl a `preinstall` script miatt létezik.
Ezt a scriptet elvileg nem kell manuálisan futtatnod; egy `npm install` parancs elött indul el.

3. Tetszőleges biztonsági kulcsok megadása a `server/.env` fájlban

```
MASTER_KEY=NagYoN_BiztonSÁgosKulC5
JWT_SECRET=UwUROwORMwM
```

3. Indítás

```sh
npm run dev
```

<!-- Végleges build -->

## Végleges build

A production buildhez [Docker](https://www.docker.com)t használunk, hogy ne kelljen sokat macerálni a telepítéssel.

### Kellékek

- Docker

### Telepítés

1. Környezeti változók megadása a `docker-compose.yml` fájlban:

```yaml
[...]
    environment:
    [...]
    MASTER_KEY: NagYoN_BiztonSÁgosKulC5
    JWT_SECRET: UwUROwORMwM
    [...]
```

1. Docker konténer létrehozása és futtatása:

```sh
docker-compose up
```

### Telepítés után

1. Tűzfal telepítése
1. `80`-s port továbbítása, tűzfal kivételhez adása
1. Automatikus klónozás beállítása git hookokkal

<!-- Tervek -->

## Tervek

Lásd: [MeisterTask tábla](https://www.meistertask.com/app/project/gupWLqbM/fizioterapia-app)

<!-- Licensz -->

## Licensz

Apache licensz alatt forgalmazva, lásd: LICENSE

<!-- Elérhetőségek -->

## Elérhetőségek

Papp Mihály - papp.misi@protonmail.com, https://github.com/pmihaly

Project Link: https://github.com/pmihaly/fizioterapia
