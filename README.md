# Nunzia Rubino — pagina vetrina

Landing page personale pensata per essere aperta dal QR code sul badge in fiera.
Statica (HTML + CSS + JS puri), nessuna build: basta servire la cartella.

## Struttura

```
index.html                 contenuti della pagina
assets/css/style.css       stile (tema chiaro/scuro automatico)
assets/js/main.js          animazioni, elica DNA nella hero, copia/condividi
assets/nunzia-rubino.vcf   vCard scaricata dal pulsante "Salva contatto"
assets/img/                favicon e (in futuro) foto / immagine OG
```

## Anteprima locale

```sh
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Pubblicazione

Funziona così com'è su GitHub Pages (Settings → Pages → branch, cartella `/`),
Netlify, Vercel o qualsiasi hosting statico. Il QR del badge va generato
sull'URL pubblico finale.

## Da completare

Cerca `TODO` in `index.html`: foto, tagline, testo del profilo, dettagli
Erasmus, anni e tesi della magistrale, tecniche di laboratorio, telefono/CV,
immagine Open Graph. I blocchi in corsivo tratteggiato (`.placeholder`) sono
segnaposto da sostituire.
