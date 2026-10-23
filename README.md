# Nunzia Rubino — pagina vetrina

Landing page personale pensata per essere aperta dal QR code sul badge in fiera.
Statica (HTML + CSS + JS puri), nessuna build: basta servire la cartella.

## Struttura

```
index.html                 pagina in italiano
en/index.html              pagina in inglese (stessa struttura)
assets/css/style.css       stile (tema chiaro/scuro automatico)
assets/js/main.js          animazioni, elica DNA nella hero, copia/condividi
assets/nunzia-rubino.vcf   vCard scaricata dal pulsante "Salva contatto"
assets/img/                favicon e (in futuro) foto / immagine OG
```

## Lingue

La pagina italiana è alla radice, quella inglese in `en/`: ogni modifica ai
contenuti va fatta in entrambi i file. Chi apre il sito con il browser in una
lingua diversa dall'italiano viene portato in automatico su `en/`; la scelta
fatta con il selettore IT/EN viene ricordata e ha la precedenza.

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

- Foto (sostituisce il monogramma "NR" nella hero): vedi `TODO` in `index.html`.
- Immagine Open Graph per l'anteprima quando il link viene condiviso.

I contenuti vengono dal CV. Restano fuori di proposito i dati personali
(data e luogo di nascita, indirizzo di casa), le esperienze non attinenti
e la sezione conferenze e seminari.
