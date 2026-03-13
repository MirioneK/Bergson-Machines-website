// ─── MODELS ──────────────────────────────────────────────────────────────────
// Aby dodać/zmienić model – edytuj tylko ten plik, bez dotykania komponentów.
// Każdy model ma:
//   specs       – krótka tabela na karcie
//   detail      – rozbudowane dane do sekcji "Poznaj Model"

export const MODELS = [
  {
    id: 'bm10',
    name: 'BM10',
    subtitle: 'Minikoparka 1 tona · Idealna na ogród i wąskie wjazdy',
    image: '/images/BM10.jpeg',
    gallery: [
    '/images/BM10.jpeg',
    '/images/BM10.jpeg',
    ],
    techDrawing: '/images/bm12-technical.png',
    badge: null,
    priceNetto: 26900,

    // Skrócona tabela na karcie
    specs: [
      { label: 'Masa robocza',        value: '1 000 kg' },
      { label: 'Silnik',              value: 'Diesel 10 KM' },
      { label: 'Głębokość kopania',   value: '1 600 mm' },
      { label: 'Szerokość gąsienicy', value: '760 mm' },
      { label: 'Gwarancja',           value: '24 miesiące' },
      { label: 'Transport',           value: 'Gratis do 200 km' },
    ],

    // Szczegółowe dane – sekcja po kliknięciu "Poznaj Model"
    detail: {
      description: `BM10 to najmniejsza maszyna w ofercie Bergson Machines — ale w żadnym razie nie zabawka.
        Zaprojektowana z myślą o pracach na działkach prywatnych, w ogrodach, przy remoncie posesji
        oraz wszędzie tam, gdzie liczy się możliwość wjazdu przez standardową bramę lub furtkę.
        Szerokość gąsienic zaledwie 760 mm pozwala pracować w miejscach niedostępnych dla większych maszyn.
        Silnik diesel o mocy 10 KM gwarantuje niezawodną pracę przez cały sezon bez nadmiernego spalania paliwa.`,

      accordions: [
        {
          title: 'Specyfikacja',
          rows: [
            { label: 'Masa robocza',            value: '1 000 kg' },
            { label: 'Silnik',                  value: 'Diesel 10 KM / 3 600 obr/min' },
            { label: 'Pojemność łyżki',         value: '0,018 m³' },
            { label: 'Szerokość łyżki',         value: '300 mm' },
            { label: 'Pompa hydrauliczna',      value: 'Gear Pump' },
            { label: 'Ciśnienie hydrauliczne',  value: '14 MPa' },
            { label: 'Prędkość jazdy',          value: '1,5 km/h' },
            { label: 'Zbiornik paliwa',         value: '8 l' },
          ],
        },
        {
          title: 'Zakres pracy',
          rows: [
            { label: 'Max. głębokość kopania',  value: '1 600 mm' },
            { label: 'Max. wysokość kopania',   value: '2 400 mm' },
            { label: 'Max. wysokość zrzutu',    value: '1 650 mm' },
            { label: 'Max. promień kopania',    value: '2 600 mm' },
            { label: 'Obrót nadwozia',          value: '360°' },
          ],
        },
        {
          title: 'Wymiary i masa',
          rows: [
            { label: 'Długość (w transporcie)', value: '2 500 mm' },
            { label: 'Szerokość',               value: '760 mm' },
            { label: 'Wysokość',                value: '2 050 mm' },
            { label: 'Szerokość gąsienicy',     value: '760 mm' },
            { label: 'Rozstaw osi gąsienic',    value: '560 mm' },
            { label: 'Nacisk na podłoże',       value: '22 kPa' },
          ],
        },
      ],
    },
  },

  {
    id: 'bm12',
    name: 'BM12',
    subtitle: 'Minikoparka 1,2 tony · Najlepszy stosunek ceny do możliwości',
    image: '/images/BM12.jpeg',
    gallery: [
    '/images/BM12.jpeg',
    '/images/BM12.jpeg',
    ],
    techDrawing: '/images/bm12-technical.png',
    badge: 'Bestseller',
    priceNetto: 29900,

    specs: [
      { label: 'Masa robocza',        value: '1 200 kg' },
      { label: 'Silnik',              value: 'Diesel 13,5 KM' },
      { label: 'Głębokość kopania',   value: '1 850 mm' },
      { label: 'Szerokość gąsienicy', value: '980 mm' },
      { label: 'Gwarancja',           value: '24 miesiące' },
      { label: 'Transport',           value: 'Gratis do 200 km' },
    ],

    detail: {
      description: `BM12 to bestseller Bergson Machines — i nieprzypadkowo. Łączy w sobie wystarczającą masę
        roboczą do poważnych prac ziemnych z kompaktowymi wymiarami, które pozwalają wjechać na typową
        działkę budowlaną lub przez bramę osiedlową. Silnik diesel o mocy 13,5 KM współpracuje z solidnym
        układem hydraulicznym, zapewniając pewną, powtarzalną pracę przez wiele sezonów.
        To maszyna dla małych i średnich firm budowlano-instalacyjnych, którym zależy na jakości bez
        przepłacania za markę.`,

      accordions: [
        {
          title: 'Specyfikacja',
          rows: [
            { label: 'Masa robocza',            value: '1 200 kg' },
            { label: 'Silnik',                  value: 'Diesel 13,5 KM / 3 600 obr/min' },
            { label: 'Pojemność łyżki',         value: '0,025 m³' },
            { label: 'Szerokość łyżki',         value: '300 mm' },
            { label: 'Pompa hydrauliczna',      value: 'Gear Pump' },
            { label: 'Ciśnienie hydrauliczne',  value: '16 MPa' },
            { label: 'Prędkość jazdy',          value: '2,0 km/h' },
            { label: 'Zbiornik paliwa',         value: '10 l' },
          ],
        },
        {
          title: 'Zakres pracy',
          rows: [
            { label: 'Max. głębokość kopania',  value: '1 850 mm' },
            { label: 'Max. wysokość kopania',   value: '2 700 mm' },
            { label: 'Max. wysokość zrzutu',    value: '1 900 mm' },
            { label: 'Max. promień kopania',    value: '3 100 mm' },
            { label: 'Obrót nadwozia',          value: '360°' },
          ],
        },
        {
          title: 'Wymiary i masa',
          rows: [
            { label: 'Długość (w transporcie)', value: '2 850 mm' },
            { label: 'Szerokość',               value: '980 mm' },
            { label: 'Wysokość',                value: '2 200 mm' },
            { label: 'Szerokość gąsienicy',     value: '980 mm' },
            { label: 'Rozstaw osi gąsienic',    value: '740 mm' },
            { label: 'Nacisk na podłoże',       value: '26 kPa' },
          ],
        },
      ],
    },
  },

  {
    id: 'bm12c',
    name: 'BM12C',
    subtitle: 'Minikoparka 1,2 tony z kabiną · Komfort przez cały rok',
    image: '/images/BM12C.jpeg',
    gallery: [
    '/images/BM12C.jpeg',
    '/images/BM12C.jpeg',
    ],
    techDrawing: '/images/bm12-technical.png',
    badge: null,
    priceNetto: 33900,

    specs: [
      { label: 'Masa robocza',        value: '1 200 kg' },
      { label: 'Silnik',              value: 'Diesel 13,5 KM' },
      { label: 'Kabina',              value: 'Zamknięta, ogrzewana' },
      { label: 'Szerokość gąsienicy', value: '980 mm' },
      { label: 'Gwarancja',           value: '24 miesiące' },
      { label: 'Transport',           value: 'Gratis do 200 km' },
    ],

    detail: {
      description: `BM12C to wersja modelu BM12 wyposażona w zamkniętą, ogrzewaną kabinę operatora.
        Dla firm pracujących przez cały rok — również późną jesienią i zimą — to rozwiązanie, które
        bezpośrednio przekłada się na wydajność i komfort pracy. Kabina skutecznie chroni przed deszczem,
        wiatrem i niską temperaturą, jednocześnie nie zwiększając znacząco gabarytów maszyny.
        Parametry robocze identyczne jak BM12, różnica wyłącznie w wyposażeniu kabiny i masie własnej.`,

      accordions: [
        {
          title: 'Specyfikacja',
          rows: [
            { label: 'Masa robocza',            value: '1 200 kg' },
            { label: 'Silnik',                  value: 'Diesel 13,5 KM / 3 600 obr/min' },
            { label: 'Kabina',                  value: 'Zamknięta, ogrzewana' },
            { label: 'Pojemność łyżki',         value: '0,025 m³' },
            { label: 'Szerokość łyżki',         value: '300 mm' },
            { label: 'Ciśnienie hydrauliczne',  value: '16 MPa' },
            { label: 'Prędkość jazdy',          value: '2,0 km/h' },
            { label: 'Zbiornik paliwa',         value: '10 l' },
          ],
        },
        {
          title: 'Zakres pracy',
          rows: [
            { label: 'Max. głębokość kopania',  value: '1 850 mm' },
            { label: 'Max. wysokość kopania',   value: '2 700 mm' },
            { label: 'Max. wysokość zrzutu',    value: '1 900 mm' },
            { label: 'Max. promień kopania',    value: '3 100 mm' },
            { label: 'Obrót nadwozia',          value: '360°' },
          ],
        },
        {
          title: 'Wymiary i masa',
          rows: [
            { label: 'Długość (w transporcie)', value: '2 980 mm' },
            { label: 'Szerokość',               value: '980 mm' },
            { label: 'Wysokość (z kabiną)',     value: '2 400 mm' },
            { label: 'Szerokość gąsienicy',     value: '980 mm' },
            { label: 'Rozstaw osi gąsienic',    value: '740 mm' },
            { label: 'Nacisk na podłoże',       value: '26 kPa' },
          ],
        },
      ],
    },
  },
  {
    id: 'bm12cc',
    name: 'BM12Cc',
    subtitle: 'Minikoparka 1,2 tony z kabiną · Komfort przez cały rok',
    image: '/images/BM12C.jpeg',
    gallery: [
    '/images/BM12C.jpeg',
    '/images/BM12C.jpeg',
    ],
    techDrawing: '/images/bm12-technical.png',
    badge: null,
    priceNetto: 33900,

    specs: [
      { label: 'Masa robocza',        value: '1 200 kg' },
      { label: 'Silnik',              value: 'Diesel 13,5 KM' },
      { label: 'Kabina',              value: 'Zamknięta, ogrzewana' },
      { label: 'Szerokość gąsienicy', value: '980 mm' },
      { label: 'Gwarancja',           value: '24 miesiące' },
      { label: 'Transport',           value: 'Gratis do 200 km' },
    ],

    detail: {
      description: `BM12C to wersja modelu BM12 wyposażona w zamkniętą, ogrzewaną kabinę operatora.
        Dla firm pracujących przez cały rok — również późną jesienią i zimą — to rozwiązanie, które
        bezpośrednio przekłada się na wydajność i komfort pracy. Kabina skutecznie chroni przed deszczem,
        wiatrem i niską temperaturą, jednocześnie nie zwiększając znacząco gabarytów maszyny.
        Parametry robocze identyczne jak BM12, różnica wyłącznie w wyposażeniu kabiny i masie własnej.`,

      accordions: [
        {
          title: 'Specyfikacja',
          rows: [
            { label: 'Masa robocza',            value: '1 200 kg' },
            { label: 'Silnik',                  value: 'Diesel 13,5 KM / 3 600 obr/min' },
            { label: 'Kabina',                  value: 'Zamknięta, ogrzewana' },
            { label: 'Pojemność łyżki',         value: '0,025 m³' },
            { label: 'Szerokość łyżki',         value: '300 mm' },
            { label: 'Ciśnienie hydrauliczne',  value: '16 MPa' },
            { label: 'Prędkość jazdy',          value: '2,0 km/h' },
            { label: 'Zbiornik paliwa',         value: '10 l' },
          ],
        },
        {
          title: 'Zakres pracy',
          rows: [
            { label: 'Max. głębokość kopania',  value: '1 850 mm' },
            { label: 'Max. wysokość kopania',   value: '2 700 mm' },
            { label: 'Max. wysokość zrzutu',    value: '1 900 mm' },
            { label: 'Max. promień kopania',    value: '3 100 mm' },
            { label: 'Obrót nadwozia',          value: '360°' },
          ],
        },
        {
          title: 'Wymiary i masa',
          rows: [
            { label: 'Długość (w transporcie)', value: '2 980 mm' },
            { label: 'Szerokość',               value: '980 mm' },
            { label: 'Wysokość (z kabiną)',     value: '2 400 mm' },
            { label: 'Szerokość gąsienicy',     value: '980 mm' },
            { label: 'Rozstaw osi gąsienic',    value: '740 mm' },
            { label: 'Nacisk na podłoże',       value: '26 kPa' },
          ],
        },
      ],
    },
  },
]

// ─── ACCESSORIES ─────────────────────────────────────────────────────────────
export const ACCESSORY_PREVIEW = [
  {
    id: 'bucket-200',
    image: '/images/accessories/bucket-200.png',
    name: 'Łyżka 200 mm',
    priceNetto: 590,
  },
  {
    id: 'bucket-500',
    image: '/images/accessories/bucket-500.png',
    name: 'Łyżka 500 mm',
    priceNetto: 715,
  },
  {
    id: 'bucket-800',
    image: '/images/accessories/bucket-800.png',
    name: 'Łyżka 800 mm',
    priceNetto: 800,
  },
  {
    id: 'hydraulic-bucket-800',
    image: '/images/accessories/hydraulic-bucket-800.png',
    name: 'Hydrauliczna łyżka 800 mm',
    priceNetto: 2800,
  },
    {
    id: 'hydraulic-bucket-600',
    image: '/images/accessories/hydraulic-bucket-800.png',
    name: 'Hydrauliczna łyżka 800 mm',
    priceNetto: 2800,
  },
]

// ─── TRUST BAR ───────────────────────────────────────────────────────────────
export const TRUST_ITEMS = [
  { icon: '🔧', text: 'Serwis mobilny w całej Polsce' },
  { icon: '📦', text: 'Części na magazynie w Polsce' },
  { icon: '🚚', text: 'Transport pod wskazany adres' },
  { icon: '🧾', text: 'Faktura VAT bez dopłat' },
  { icon: '📝', text: 'Leasing i raty dostępne' },
]

// ─── WHY US ──────────────────────────────────────────────────────────────────
export const WHY_CARDS = [
  {
    id: 'fv',
    icon: '📄',
    title: 'Zawsze Faktura VAT',
    desc: 'Każda sprzedaż dokumentowana fakturą bez ukrytych dopłat. Odlicz VAT, skorzystaj z amortyzacji.',
  },
  {
    id: 'parts',
    icon: '🏭',
    title: 'Magazyn Części w Polsce',
    desc: 'Kluczowe podzespoły trzymamy w polskim magazynie. Brak przestojów na przesyłkę z Chin.',
  },
  {
    id: 'service',
    icon: '🔧',
    title: 'Mobilny Serwis',
    desc: 'Technik przyjedzie do Ciebie. Nie tracisz czasu na transport maszyny do serwisu.',
  },
  {
    id: 'leasing',
    icon: '💰',
    title: 'Leasing i Raty',
    desc: 'Współpracujemy z firmami leasingowymi. Maszyna zarabia zanim skończy się pierwsza rata.',
  },
  {
    id: 'advisory',
    icon: '📞',
    title: 'Doradztwo Techniczne',
    desc: 'Nie wiesz, który model wybrać? Nasz specjalista pomoże dobrać maszynę do Twoich prac.',
  },
  {
    id: 'delivery',
    icon: '🚚',
    title: 'Dostawa Pod Adres',
    desc: 'Dowozimy maszynę na plac budowy lub posesję. Transport wliczony w cenę do 200 km.',
  },
]

// ─── OBJECTIONS ──────────────────────────────────────────────────────────────
export const OBJECTIONS = [
  {
    id: 'parts-wait',
    question: '"A co z częściami zamiennymi z Chin? Będę czekał miesiąc?"',
    answer: (
      <>
        <strong>Nie.</strong> Trzymamy w Polsce magazyn kluczowych części — uszczelnień, filtrów, łyżek
        i elementów hydraulicznych. Dla minikoparek 1–1,5t używamy podzespołów kompatybilnych z Kubotą
        i Yanmarem, dostępnych u polskich dystrybutorów. Czas realizacji naprawy: zazwyczaj{' '}
        <strong>48–72 godziny</strong>.
      </>
    ),
  },
  {
    id: 'service-who',
    question: '"Kto mi to naprawi? Żaden serwis nie zna tych maszyn."',
    answer: (
      <>
        <strong>My.</strong> Posiadamy własny mobilny serwis techniczny. Do każdej maszyny dostarczamy
        kompletną dokumentację serwisową po polsku. Silniki diesel w naszych maszynach to standardowe
        jednostki — każdy doświadczony mechanik je obsłuży. Do każdej maszyny dołączamy{' '}
        <strong>polskojęzyczną instrukcję obsługi i katalog części</strong>.
      </>
    ),
  },
  {
    id: 'quality',
    question: '"Chińska koparka to zabawka. Nie wytrzyma na budowie."',
    answer: (
      <>
        <strong>Sprawdź liczby.</strong> Rynek minikoparek chińskiej produkcji rośnie w Polsce o 30–40%
        rok do roku. Liderzy tacy jak Gunter Shop, XTM czy Meyer Europe sprzedają wyłącznie maszyny
        z Chin. Różnica? Nasze maszyny kosztują <strong>30–40% mniej</strong> przy identycznych
        parametrach roboczych.
      </>
    ),
  },
]

// ─── PROCESS STEPS ───────────────────────────────────────────────────────────
export const STEPS = [
  { num: 1, title: 'Kontakt',            desc: 'Wypełnij formularz lub zadzwoń. Odpiszemy w ciągu 2 godzin w dni robocze.' },
  { num: 2, title: 'Konsultacja',        desc: 'Dobieramy model i osprzęt do Twoich konkretnych prac i budżetu.' },
  { num: 3, title: 'Zamówienie i FV',    desc: 'Podpisujemy umowę, wystawiamy fakturę. Leasing i raty możliwe.' },
  { num: 4, title: 'Dostawa',            desc: 'Dowozimy maszynę pod wskazany adres. Szkolenie z obsługi w cenie.' },
  { num: 5, title: 'Serwis Pogwarancyjny', desc: 'Jesteśmy z Tobą długoterminowo. Serwis, części, doradztwo.' },
]

// ─── SERVICE LIST ─────────────────────────────────────────────────────────────
export const SERVICE_ITEMS = [
  {
    id: 'warranty',
    icon: '🛡️',
    title: '2-letnia Gwarancja',
    desc: 'Pełna gwarancja na wszystkie podzespoły mechaniczne i hydrauliczne. Żadnych gwiazdek, żadnych ukrytych wyjątków.',
  },
  {
    id: 'mobile',
    icon: '🚗',
    title: 'Mobilny Serwis Przyjazdowy',
    desc: 'Technik przyjeżdża do Ciebie — na plac budowy, na posesję. Ty nie tracisz ani dnia pracy na logistykę.',
  },
  {
    id: 'stock',
    icon: '📦',
    title: 'Magazyn Części w Polsce',
    desc: 'Filtry, uszczelniacze, elementy hydrauliczne, łyżki — wszystko na stanie. Czas oczekiwania: max 48–72 h.',
  },
  {
    id: 'hotline',
    icon: '📞',
    title: 'Linia Techniczna',
    desc: 'Bezpłatna konsultacja telefoniczna dla klientów. Pomożemy zdiagnozować problem zanim wyślemy technika.',
  },
  {
    id: 'docs',
    icon: '📚',
    title: 'Dokumentacja po Polsku',
    desc: 'Pełna instrukcja obsługi, DTR i katalog części zamiennych w języku polskim przy każdej maszynie.',
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const FAQ = [
  {
    id: 'registration',
    q: 'Czy minikoparka wymaga rejestracji lub uprawnień?',
    a: 'Minikoparki do 5 ton nie wymagają rejestracji ani uprawnień operatorskich do obsługi na własnej nieruchomości. Do pracy na drogach publicznych konieczne jest ubezpieczenie OC maszyny.',
  },
  {
    id: 'transport',
    q: 'Jak przetransportować koparkę na plac budowy?',
    a: 'Nasze minikoparki mieszczą się na typowej przyczepie samochodowej do 3,5t DMC. Transport na przyczepie z samochodem osobowym — bez problemów.',
  },
  {
    id: 'delivery-time',
    q: 'Jak długo czeka się na dostawę maszyny?',
    a: 'Maszyny ze stocku dostarczamy w ciągu 5–14 dni roboczych. Modele na zamówienie — do 3–4 tygodni. Aktualną dostępność podajemy przy wycenie.',
  },
  {
    id: 'leasing',
    q: 'Czy mogę kupić na firmę i skorzystać z leasingu?',
    a: 'Tak. Wystawiamy fakturę VAT na firmę i osobę prywatną. Współpracujemy z firmami leasingowymi — rata za maszynę BM12 to ok. 650–800 zł/mies. przy leasingu 60-miesięcznym.',
  },
  {
    id: 'after-warranty',
    q: 'Co się stanie gdy coś się zepsuje po roku?',
    a: 'Gwarancja obejmuje 24 miesiące. Po jej zakończeniu oferujemy płatny serwis mobilny oraz sprzedaż części zamiennych z polskiego magazynu.',
  },
  {
    id: 'test-drive',
    q: 'Czy mogę przetestować maszynę przed zakupem?',
    a: 'Tak — zapraszamy na prezentację do naszego showroomu w Poznaniu. Możesz osobiście wypróbować maszynę w pracy. Skontaktuj się z nami, aby umówić termin.',
  },
  {
    id: 'gate-width',
    q: 'Czy maszyna przejdzie przez wąską bramę lub furtkę?',
    a: 'BM10 ma szerokość gąsienic 760 mm — mieści się przez większość standardowych bram. BM12 i BM12C mają 980 mm. Gąsienice zaciskane hydraulicznie można zwęzić.',
  },
  {
    id: 'new-ce',
    q: 'Czy minikoparki są nowe? Czy mają certyfikaty CE?',
    a: 'Wszystkie maszyny są fabrycznie nowe, z deklaracją zgodności CE. Dostarczamy pełną dokumentację techniczną oraz instrukcję obsługi w języku polskim.',
  },
]

// ─── CONTACT INFO ────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
  phone: '+48 600 507 816',
  email: 'kontakt@bergsonmachines.pl',
  location: 'Pobórka Wielka 2',
  locationSub: '89-340 Pobórka Wielka',
  hours: 'Pon–Pt: 8:00–17:00 · Sob: 9:00–13:00',
  // OpenStreetMap embed centered on Poznań
  mapEmbedUrl:
    'https://www.google.com/maps/embed/v1/place?key=AIzaSyCuyZxv5_Key0VnVYqW-08bOmUF_nT0StE&q=Pobórka+Wielka+2,+89-340+Pobórka+Wielka',
  mapLinkUrl:
    'https://www.google.com/maps/search/?api=1&query=Pobórka+Wielka+2,+89-340+Pobórka+Wielka',
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const VAT = 1.23
export const calcBrutto = (netto) => Math.round(netto * VAT)
export const formatPrice = (amount) =>
  amount.toLocaleString('pl-PL') + ' zł'