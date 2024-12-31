# README

## Beskrivelse av oppgaven

Dette er en frontend-oppgave der formålet er å hente inn data fra et gitt API/datasett, og presentere informasjonen på en måte som kan fungere i en nyhetsartikkel.

## Prosess og tilnærming

1. **Hente data**  
   Jeg startet med å hente data fra API-et ved hjelp av `fetch`. Siden datasettet ligger på et annet domene og kan være underlagt CORS-begrensninger,(AKA: det er alltid CORS problemer :P) benyttet jeg meg av en proxy-løsning (allorigins.win).

2. **Struktur og layout**  
   For å presentere dataene på en ryddig og enkel måte, valgte jeg et rutenett (bento grid) som gir et oversiktlig oppsett. Her plasserte jeg tekstbokser og grafer side om side. Dette gjør at informasjonen både er lettlest og visuelt tiltalende.

3. **Visualisering**  
   Jeg brukte [Chart.js](https://www.chartjs.org/) for å vise grafer. Ved å bruke stolpediagram fikk jeg en rask visuell sammenligning av gjennomsnittspris, kvadratmeterpris og prosentvis endring over forskjellige tidsperioder.

4. **Interaktivitet**

   - **Region-velger**: Brukeren kan velge en region fra en nedtrekksmeny for å vise data som er spesifikke for den regionen.
   - **Tema-knapp**: Gir brukeren mulighet til å bytte mellom lyst og mørkt tema. Dette gjør at brukergrensesnittet føles mer moderne og tilpasset brukerens preferanser.

5. **Responsivitet**  
   Ved hjelp av enkle mediespørringer i CSS (`@media (max-width: ...)`) skalerer innholdet for både nettbrett og mobil, slik at brukeren får en god opplevelse uavhengig av skjermstørrelse.

6. **Designvalg**
   - Valgte nøytrale og behagelige farger, slik at teksten er godt lesbar i begge temaer.
   - Bento-grid gir en fleksibel måte å presentere ulike informasjonsbokser på, samtidig som layouten er enkel å forstå for sluttbrukeren.

## Filstruktur

```plaintext
.
├── index.html       // HTML-filen med oppsett, bento-grid og referanser
├── styles.css       // CSS for styling, tema og layout
└── script.js        // JavaScript for henting og håndtering av data og interaktivitet

HTML5 for struktur og oppsett.
CSS3 for layout, styling og responsivitet.
Vanilla JavaScript for datahenting, logikk og interaktivitet.
Chart.js (via CDN) for å visualisere data i form av stolpediagram.
```

Takk for at du tok deg tid til å se gjennom løsningen min!
God jul og godt nyttår
