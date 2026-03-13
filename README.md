# Bergson Machines

Nowoczesna strona www / landing page dla marki Bergson Machines, zbudowana w oparciu o React + Vite. Projekt zawiera stronę główną, podstrony modeli, strony prawne, obsługę wielu języków oraz formularz kontaktowy z walidacją i reCAPTCHA.

## O projekcie

Projekt został przygotowany jako szybka, lekka i łatwa do wdrożenia aplikacja frontendowa pod stronę produktową marki sprzedającej minikoparki i osprzęt.

Najważniejsze funkcje:

- strona główna typu landing page
- podstrony modeli maszyn
- sekcje ofertowe, FAQ, serwis, galeria, osprzęt, kontakt
- wielojęzyczność oparta o `react-i18next`
- routing oparty o `react-router-dom`
- formularz kontaktowy z walidacją
- integracja z reCAPTCHA
- CTA do kontaktu i WhatsApp
- strony prawne / informacyjne
- build statyczny gotowy do wrzucenia na hosting

## Stack technologiczny

- React
- Vite
- React Router
- react-i18next / i18next
- CSS Modules
- własne hooki i helpery
- statyczne assety w `public/`

## Struktura projektu

Poniżej uproszczona struktura repozytorium (bez `node_modules` i `dist`):

```text
bergson/
├── .github/
│   └── workflows/
├── lib/
│   └── userform/
├── public/
│   ├── fonts/
│   └── images/
│       └── accessories/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── i18n/
│   │   └── locales/
│   │       ├── en/
│   │       ├── pl/
│   │       └── ua/
│   └── pages/
├── index.html
├── package.json
├── vite.config.js
└── README.md
````

## Opis katalogów

### `.github/workflows`

Miejsce na workflowy CI/CD, np. automatyczny build lub deploy.

### `lib/userform`

Własne helpery formularza kontaktowego, m.in.:

* walidacja pól
* formatowanie numeru telefonu
* integracja z reCAPTCHA

### `public/`

Statyczne pliki serwowane bezpośrednio przez Vite i później przez hosting:

* obrazy
* fonty
* favicon
* logo
* zdjęcia modeli i osprzętu

### `src/components/`

Komponenty UI całej strony, np.:

* `Nav`
* `Hero`
* `Models`
* `ModelCard`
* `Accessories`
* `Gallery`
* `WhyUs`
* `Service`
* `FAQ`
* `Contact`
* `Footer`
* `StickyCTA`

### `src/hooks/`

Własne hooki wspierające logikę aplikacji, np.:

* animacje reveal on scroll
* generowanie ścieżek zależnych od języka
* logika pomocnicza dla routingu i sekcji

### `src/i18n/`

Konfiguracja tłumaczeń i pliki językowe.

Przykładowy układ:

```text
src/i18n/
└── locales/
    ├── pl/
    │   ├── common.json
    │   └── data.json
    ├── en/
    │   ├── common.json
    │   └── data.json
    └── ua/
        ├── common.json
        └── data.json
```

### `src/pages/`

Widoki routowane, np.:

* strona główna
* karta modelu
* strony prawne / placeholdery

## Routing

Projekt korzysta z `react-router-dom`.

Przykładowe typy tras:

* `/pl`
* `/en`
* `/ua`
* `/pl/modele/:id`
* `/en/model/:id`
* `/ua/modeli/:id`
* strony prawne w zależności od języka

Jeżeli aplikacja jest wdrażana jako SPA na zwykły hosting statyczny, serwer musi przekierowywać wszystkie nieznane ścieżki do `index.html`.

## Wielojęzyczność

Projekt korzysta z `react-i18next`.

Założenia:

* teksty sekcji trafiają do `common.json`
* dane opisowe, listy, FAQ, modele, osprzęt mogą trafiać do `data.json`
* przełącznik języka zmienia:

  * aktywny język i18n
  * adres URL
  * docelowe linki w nawigacji i CTA

## Formularz kontaktowy

Formularz kontaktowy obsługuje:

* imię i nazwisko
* telefon
* e-mail
* wybór modelu
* wiadomość
* zgodę na przetwarzanie danych
* reCAPTCHA

Logika formularza jest wsparta przez helpery z `lib/userform`.

Do poprawnego działania należy skonfigurować:

* endpoint API do wysyłki formularza
* klucz site key dla reCAPTCHA
* backend przyjmujący payload JSON

## Uruchomienie lokalne

### 1. Instalacja zależności

```bash
npm install
```

### 2. Start środowiska developerskiego

```bash
npm run dev
```

Domyślnie aplikacja uruchomi się lokalnie w trybie developerskim przez Vite.

### 3. Build produkcyjny

```bash
npm run build
```

Po buildzie gotowe pliki trafią do katalogu `dist/`.

### 4. Podgląd buildu lokalnie

```bash
npm run preview
```

## Wdrożenie

Projekt można wdrożyć jako stronę statyczną, np. przez:

* FTP / FileZilla
* hosting statyczny
* GitHub Actions + serwer
* Vercel / Netlify / podobne usługi

### Ważne przy wdrożeniu SPA

Jeżeli używasz `BrowserRouter`, serwer powinien obsługiwać fallback do `index.html`, inaczej bezpośrednie wejście na podstrony może zwracać 404.

Jeżeli hosting tego nie wspiera, alternatywą jest:

* konfiguracja rewrite rules po stronie hostingu
* albo przejście na `HashRouter`

## Assety i obrazy

W projekcie obrazy są trzymane głównie w `public/images/`.

Przykłady:

* zdjęcia maszyn
* zdjęcia osprzętu
* hero image
* logo
* favicon

Odwołania do nich można robić bezpośrednio po ścieżce, np.:

```jsx
<img src="/images/hero.png" alt="..." />
```

## Stylowanie

Projekt korzysta z CSS Modules.

Założenia stylowania:

* modularne pliki `.module.css`
* spójna paleta kolorów oparta o zmienne CSS
* sekcje budowane w oparciu o wspólny `page-shell`
* osobne style dla mobile / tablet / desktop
* nacisk na czytelne CTA i kontrast

## Dalszy rozwój

Potencjalne kolejne kroki:

* pełne dokończenie tłumaczeń wszystkich komponentów
* przeniesienie wszystkich danych do plików locale
* spięcie formularza z produkcyjnym backendem
* dodanie analityki i event tracking
* dopracowanie SEO i meta tagów
* lazy loading większych assetów
* dalsza optymalizacja pod Core Web Vitals

## Uwagi developerskie

Przy rozbudowie projektu warto trzymać się kilku zasad:

1. Każdy nowy tekst użytkownika wrzucać do i18n zamiast wpisywać na sztywno.
2. Dane sekcyjne i listy tłumaczalne przenosić do `data.json`.
3. Linki wewnętrzne budować z uwzględnieniem aktywnego języka.
4. Wszystkie nowe sekcje pisać jako osobne komponenty z własnym `.module.css`.
5. Unikać hardcodowania kolorów, jeśli istnieją już globalne zmienne CSS.

## Autor / utrzymanie

Projekt przygotowany dla marki Bergson Machines jako frontend sprzedażowo-ofertowy oparty o React + Vite.