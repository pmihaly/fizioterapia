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

Így futtatsd a szervert fejlesztési célból.

_A fejlesztői verzió nem számít production buildnek. A kész kiszolgáló futtatásához lásd: [Végleges build](#végleges-build)._

### Kellékek

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Telepítés

1. Klónozd le a repot

```sh
git clone https://github.com/pmihaly/fizioterapia.git
```

2. Telepítsd az NPM csomagokat

```sh
npm install
```

A repo gyökérmappájában található package.json fájl a `preinstall` script miatt létezik.
Ezt a scriptet elvileg nem kell manuálisan futtatnod; egy `npm install` parancs elött indul el.

3. Adj meg tetsztőleges biztonsági kulcsokat a `server/.env` fájlban

```
MASTER_KEY=NagYoN_BiztonSÁgosKulC5
JWT_SECRET=UwUROwORMwM
```

[Mik ezek a kulcsok?](#környezeti-változók)

3. Indítsd el a szervert

```sh
npm run dev
```

<!-- Végleges build -->

## Végleges build

A production buildhez [Docker](https://www.docker.com)t használunk, hogy ne kelljen sokat macerálni a telepítésekkel.

### Kellékek

- Docker
- `docker-compose`

### Telepítés

1. Add meg a biztonsági kulcsokat környezeti változóként a `docker-compose.yml` fájlban:

```yaml
[...]
    environment:
    [...]
    MASTER_KEY: NagYoN_BiztonSÁgosKulC5
    JWT_SECRET: UwUROwORMwM
    [...]
```

#### Környezeti változók

| Környezeti változó neve | Mire használjuk?                                              |
| ----------------------- | ------------------------------------------------------------- |
| `MASTER_KEY`            | Ez az admin kulcs, ezzel tudunk a tornászok fölött adminkodni |
| `JWT_SECRET`            | Ezzel titkosítjuk a regisztrált felhasználók jelszavát        |

2. Futtatsd a docker konténert:

```sh
docker-compose up
```

Akkor látogatható a tornász oldal, ha a kimenet utolsó sora így néz ki:

```
fizioterapia_1  | [1] npm run build-trainer exited with code 0
```

### Telepítés után

1. Telepíts egy tűzfalat
1. **Továbbítsd a 80-s portot** és add hozzá a tűzfal-kivételekhez
1. Állítsd be automatikus git pull-t

<!-- Tervek -->

## Tervek

Lásd: [MeisterTask tábla](https://www.meistertask.com/app/project/gupWLqbM/fizioterapia-app)

<!-- Licensz -->

## Licensz

CC BY-NC-ND 4.0 alatt licenszelve, továbbiakért lásd: [https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode)

<!-- Elérhetőségek -->

## Elérhetőségek

Papp Mihály - papp.misi@protonmail.com, https://github.com/pmihaly

Projekt link: https://github.com/pmihaly/fizioterapia
