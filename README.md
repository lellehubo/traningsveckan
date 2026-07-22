# Träningsveckan

Personligt träningsupplägg med loggning, progression och veckoplanerare.
Statiska filer, ingen server, ingen inloggning. All data ligger i
`localStorage` på den enhet du använder.

## Publicera på GitHub Pages

Filerna ligger i repots rot. Skapa ett nytt repo, förslagsvis
`traningsveckan`, och pusha:

```bash
git init
git add .
git commit -m "Träningsveckan"
git branch -M main
git remote add origin git@github.com:lellehubo/traningsveckan.git
git push -u origin main
```

Sedan i repot: **Settings → Pages → Source: Deploy from a branch**,
branch `main`, mapp `/ (root)`. Efter någon minut ligger appen på
`https://lellehubo.github.io/traningsveckan/`.

Två saker att veta:

- **Repot måste vara publikt** om du inte har GitHub Pro. Pages från
  privata repo kräver betalplan. Appen innehåller inga hemligheter och
  ingen data, så publikt är oproblematiskt här.
- `.nojekyll` finns med. Utan den kör Pages filerna genom Jekyll i onödan.

Alla sökvägar är relativa, så appen fungerar från underkatalogen
`/traningsveckan/` utan ändringar.

## Lägg till på hemskärmen

1. Öppna adressen i **Safari** på iPhone. Chrome på iOS kan inte
   installera PWA:er.
2. Dela-ikonen, sedan **Lägg till på hemskärmen**.
3. Starta från ikonen. Nu körs den utan adressfält.

Android: Chrome, menyn, **Installera app**.

## Uppdatera appen

Pusha nya filer till `main`. Service workern hämtar dem i bakgrunden och
appen visar en banner längst ner: *Ny version finns.* Den laddar aldrig om
av sig själv, så den kan inte avbryta ett pågående set.

GitHub Pages CDN cachar i cirka tio minuter, så en ny version kan dröja
någon minut extra.

## Säkerhetskopiering

Progress-fliken har Exportera och Importera JSON. Kör export med jämna
mellanrum och alltid före telefonbyte. Data följer inte med automatiskt.

## Filer

| Fil | Roll |
|---|---|
| `index.html` | Appskal och metataggar för hemskärm |
| `app.js` | Hela appen inklusive React, en fil |
| `manifest.webmanifest` | Namn, ikoner, standalone-läge |
| `sw.js` | Service worker, offline och uppdateringar |
| `.nojekyll` | Stänger av Jekyll på Pages |
