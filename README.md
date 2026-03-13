# Bergson Machines — React Landing Page

Strona sprzedażowa minikoparek Bergson Machines. Zbudowana w React + Vite,
podzielona na komponenty z CSS Modules.

---

## Szybki start

```bash
npm install
npm run dev        # dev server na http://localhost:5173
npm run build      # produkcyjny build do /dist
npm run preview    # podgląd builda
```

---

## Struktura projektu

```
bergson/
├── index.html                  # punkt wejścia HTML
├── vite.config.js
├── package.json
├── public/
│   └── images/                 # ← WKLEJ TU ZDJĘCIA MASZYN
│       ├── BM10.jpeg
│       ├── BM12.jpeg
│       └── BM12C.jpeg
└── src/
    ├── main.jsx                # montowanie React
    ├── App.jsx                 # składa wszystkie sekcje
    ├── index.css               # design tokens + style globalne
    ├── data.js                 # ★ CAŁOŚĆ TREŚCI — edytuj tu
    ├── hooks/
    │   └── useReveal.js        # hook scroll-reveal
    └── components/
        ├── Nav.jsx / .module.css
        ├── Hero.jsx / .module.css
        ├── TrustBar.jsx / .module.css
        ├── Models.jsx / .module.css
        ├── ModelCard.jsx / .module.css
        ├── Gallery.jsx / .module.css
        ├── Accessories.jsx / .module.css
        ├── WhyUs.jsx / .module.css
        ├── Objections.jsx / .module.css
        ├── Process.jsx / .module.css
        ├── Service.jsx / .module.css
        ├── FAQ.jsx / .module.css
        ├── Contact.jsx / .module.css
        ├── Footer.jsx / .module.css
        └── StickyCTA.jsx / .module.css
```

---

## Gdzie co edytować

### Treść i dane — `src/data.js`
Cały content strony (modele, ceny, FAQ, dane kontaktowe, akcesoria itp.)
jest w jednym pliku. **Nie musisz wchodzić w żaden komponent żeby zmienić tekst.**

```js
// Zmiana ceny modelu:
export const MODELS = [
  { id: 'bm10', name: 'BM10', priceNetto: 26900, ... },
  ...
]

// Zmiana danych kontaktowych:
export const CONTACT_INFO = {
  phone: '+48 XXX XXX XXX',
  email: 'kontakt@bergsonmachines.pl',
  ...
}
```

### Kolory i typografia — `src/index.css`
Wszystkie wartości designu jako CSS Custom Properties:

```css
:root {
  --orange:      #F26522;   /* kolor akcentu */
  --black:       #0a0a0a;   /* tło główne */
  --font-display: 'Barlow Condensed', sans-serif;
  ...
}
```

### Zdjęcia
Umieść pliki `BM10.jpeg`, `BM12.jpeg`, `BM12C.jpeg` w katalogu `public/images/`.
Ścieżki zdjęć są konfigurowane w `data.js` → pole `image`.

---

## Do zrobienia przez developera

- [ ] Podłączyć obsługę formularza (`Contact.jsx` → `handleSubmit`) — np. Formspree, EmailJS, własne API
- [ ] Dodać meta tagi SEO / Open Graph (w `index.html`)
- [ ] Wgrać prawdziwe zdjęcia i logo do `public/images/`
- [ ] Uzupełnić dane kontaktowe w `data.js`
- [ ] Ewentualnie dodać Google Analytics / Meta Pixel
- [ ] Opcjonalnie: wydzielić komponenty do osobnych bibliotek (React Router jeśli multi-page)

---

## Tech stack

| Narzędzie         | Wersja | Po co                              |
|-------------------|--------|------------------------------------|
| React             | 18     | UI framework                       |
| Vite              | 5      | Dev server + bundler               |
| CSS Modules       | —      | Izolowane style per komponent      |
| IntersectionObserver | —   | Scroll-reveal (hook useReveal.js)  |
| OpenStreetMap     | —      | Mapa w sekcji kontakt (bezpłatna)  |

Brak zewnętrznych zależności poza React — **zero bloat**.
