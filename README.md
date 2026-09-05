# WeCars

Sito vetrina statico, compatibile con GitHub Pages e con l'estensione Live Server di VS Code.

## Anteprima

Apri `index.html` con **Open with Live Server**. Non servono installazioni, compilazione o Node.js. Le pagine legali usano lo stesso foglio di stile e sono raggiungibili dal footer.

## Struttura

- `index.html`: contenuti, schede lavori e vetture, contatti.
- `style.css`: colori, tipografia e layout responsive, raggruppati per sezione.
- `script.js`: menu mobile, filtri, espansione delle schede e galleria fotografica/video.
- `images/`: fotografie e video originali.
- `fonts/`: caratteri locali; il nuovo sito carica Goldman solo per il marchio e usa i caratteri di sistema per il testo.
- `privacy-policy.html`, `cookie-policy.html`, `termini-e-condizioni.html`: documenti esistenti con presentazione aggiornata.
- `CNAME`, `sitemap.xml`: dominio e indirizzi pubblici esistenti.

## Aggiornare i contenuti

Per una vettura duplica un elemento `article.car-card`, aggiorna modello, foto, anno e chilometraggio, quindi modifica anche il messaggio e l'etichetta del collegamento WhatsApp. Non indicare una disponibilità senza averla verificata.

Per una lavorazione duplica un elemento `article.project-card`: `data-category` può essere `industriali` o `rimorchi`. Un collegamento con `data-media` apre la foto o il video nella galleria; `data-title` ne descrive il contenuto. I collegamenti nello stesso elemento `data-gallery` formano una sequenza, utile per confrontare il prima e il dopo. I conteggi dei pulsanti si aggiornano automaticamente.

I contenuti sono presenti nell'HTML: senza JavaScript tutte le schede restano leggibili e i link aprono direttamente i media. I video non vengono richiesti finché non si apre la relativa galleria e non partono automaticamente. Le immagini fuori dall'apertura usano il caricamento differito.

## Scelta tecnica

Questo rifacimento usa HTML, CSS e JavaScript nativi per mantenere l'anteprima diretta con Live Server. Non è una migrazione ad Astro: Astro richiederebbe una fase di compilazione e Live Server potrebbe mostrare solo l'output generato. Il sito attuale non ha dipendenze da installare o backend.

## Pubblicazione

La struttura resta adatta alla pubblicazione GitHub Pages dalla radice del repository. Mantieni il dominio personalizzato già configurato e il file `CNAME`. I percorsi locali sono relativi, così funzionano anche nell'anteprima e in una sottocartella. Gli URL canonical e la sitemap puntano al dominio pubblico `https://www.wecars.it`.

Nessun caricamento automatico di risorse da servizi terzi: social, WhatsApp e indicazioni stradali sono collegamenti. I testi delle informative sono stati conservati; questa modifica non costituisce una loro revisione legale.
