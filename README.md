# Ordnary Localization

This repository contains a standalone i18n helper and locale dictionary package for Ordnary.

## Contents

- `src/i18n.ts`: lightweight locale detection and dictionary loader
- `locales/en.json` / `locales/nl.json`: translation source files

## Usage

- Import `getLocaleFromHeaders` and `getDictionary` from `src/i18n.ts`
- Use the returned locale string to select the correct translation dictionary

## Locales

- `en`
- `nl`

## Build

```bash
npm install
npm run build
```

## Sync naar accountcenter

Deze repo kan automatisch `locales/` synchroniseren naar `ordnary-com/accountcenter` nadat een merge naar `main` is gedaan.

1. Voeg in de `localization-repo` een secret toe:
   - `PERSONAL_ACCESS_TOKEN`
   - met `repo`-rechten op `ordnary-com/accountcenter`
2. De workflow `.github/workflows/sync-locales.yml` kopieert alle bestanden uit `locales/` naar `accountcenter/locales/`.
3. Als er verschillen zijn, maakt de workflow een commit en pusht deze naar `main` van de app-repo.

> Zorg ervoor dat de app-repo ook een `locales/` map heeft om de gesyncte JSON-bestanden te ontvangen.
