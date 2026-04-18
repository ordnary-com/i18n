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
