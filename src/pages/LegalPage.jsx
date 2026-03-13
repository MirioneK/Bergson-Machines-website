import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import styles from './LegalPage.module.css'

const LEGAL_PAGES = {
  gwarancja: {
    title: 'Gwarancja',
    intro:
      'Ta strona stanowi miejsce na docelowe warunki gwarancji dla maszyn i osprzętu Bergson Machines.',
    sections: [
      {
        heading: 'Zakres gwarancji',
        body:
          'W tym miejscu należy opisać, jakie elementy produktu objęte są gwarancją, jaki jest okres obowiązywania oraz od kiedy liczony jest bieg gwarancji.',
      },
      {
        heading: 'Wyłączenia odpowiedzialności',
        body:
          'Tutaj warto wskazać przypadki, w których gwarancja nie obowiązuje, np. uszkodzenia wynikające z niewłaściwej eksploatacji, braku przeglądów lub samodzielnych przeróbek.',
      },
      {
        heading: 'Procedura zgłoszenia',
        body:
          'W tej sekcji należy opisać sposób zgłaszania usterek, wymagane informacje od klienta oraz przewidywany sposób i termin rozpatrzenia zgłoszenia.',
      },
    ],
  },

  'zwroty-i-reklamacje': {
    title: 'Zwroty i reklamacje',
    intro:
      'Ta strona stanowi miejsce na docelowe zasady dotyczące zwrotów, odstąpienia od umowy oraz składania reklamacji.',
    sections: [
      {
        heading: 'Reklamacje',
        body:
          'W tej sekcji należy opisać, w jaki sposób klient może złożyć reklamację, jakie dane powinien przekazać oraz w jakim terminie sprzedawca odpowiada na zgłoszenie.',
      },
      {
        heading: 'Zwroty',
        body:
          'Tutaj należy wskazać, kiedy klientowi przysługuje prawo zwrotu lub odstąpienia od umowy oraz jakie warunki muszą zostać spełnione.',
      },
      {
        heading: 'Forma kontaktu',
        body:
          'W tym miejscu można wskazać preferowaną drogę kontaktu: formularz, e-mail, telefon lub adres korespondencyjny do obsługi reklamacji.',
      },
    ],
  },

  dostawa: {
    title: 'Dostawa',
    intro:
      'Ta strona stanowi miejsce na opis warunków dostawy maszyn, osprzętu i części zamiennych.',
    sections: [
      {
        heading: 'Obszar dostawy',
        body:
          'W tej sekcji należy wskazać, na jakim obszarze realizowana jest dostawa oraz czy obowiązują dodatkowe warunki dla wybranych lokalizacji.',
      },
      {
        heading: 'Czas realizacji',
        body:
          'Tutaj warto opisać standardowe terminy dostawy dla produktów dostępnych od ręki oraz dla maszyn sprowadzanych lub konfigurowanych na zamówienie.',
      },
      {
        heading: 'Koszty i odbiór',
        body:
          'W tym miejscu można wskazać zasady naliczania kosztów transportu, warunki odbioru oraz obowiązki klienta przy przyjęciu towaru.',
      },
    ],
  },

  regulamin: {
    title: 'Regulamin',
    intro:
      'Ta strona stanowi miejsce na regulamin sprzedaży i korzystania ze strony internetowej Bergson Machines.',
    sections: [
      {
        heading: 'Postanowienia ogólne',
        body:
          'Tutaj należy opisać podstawowe zasady działania sklepu lub serwisu, definicje używanych pojęć oraz dane identyfikacyjne sprzedawcy.',
      },
      {
        heading: 'Składanie zamówień',
        body:
          'W tej sekcji warto opisać, w jaki sposób dochodzi do złożenia zamówienia, potwierdzenia warunków oraz zawarcia umowy.',
      },
      {
        heading: 'Postanowienia końcowe',
        body:
          'Tutaj można wskazać zasady zmian regulaminu, właściwość prawa oraz sposób publikacji aktualnej wersji dokumentu.',
      },
    ],
  },

  'formy-platnosci': {
    title: 'Formy płatności',
    intro:
      'Ta strona stanowi miejsce na opis dostępnych metod płatności oraz warunków rozliczenia zamówienia.',
    sections: [
      {
        heading: 'Dostępne metody',
        body:
          'W tej sekcji należy opisać, czy dostępny jest przelew tradycyjny, płatność gotówką, leasing, raty lub inne formy finansowania.',
      },
      {
        heading: 'Termin płatności',
        body:
          'Tutaj warto wskazać, kiedy płatność powinna zostać dokonana i jakie są konsekwencje jej braku w określonym czasie.',
      },
      {
        heading: 'Rozliczenia indywidualne',
        body:
          'W tym miejscu można opisać warunki płatności ustalane indywidualnie przy zakupie maszyn, osprzętu lub większych zamówień.',
      },
    ],
  },

  'polityka-prywatnosci': {
    title: 'Polityka prywatności',
    intro:
      'Ta strona stanowi miejsce na opis zasad przetwarzania danych osobowych użytkowników strony i klientów.',
    sections: [
      {
        heading: 'Administrator danych',
        body:
          'W tej sekcji należy wskazać dane administratora, dane kontaktowe oraz podstawowe informacje o przetwarzaniu danych osobowych.',
      },
      {
        heading: 'Cele i podstawy przetwarzania',
        body:
          'Tutaj należy opisać, w jakich celach dane są przetwarzane, np. obsługa zapytań, przygotowanie oferty, kontakt handlowy lub wykonanie umowy.',
      },
      {
        heading: 'Prawa użytkownika',
        body:
          'W tym miejscu należy wskazać prawa osoby, której dane dotyczą, w tym prawo dostępu, sprostowania, usunięcia, ograniczenia przetwarzania i wniesienia skargi.',
      },
    ],
  },
}

export default function LegalPage({ pageKey }) {
  const page = LEGAL_PAGES[pageKey]

  if (!page) {
    return <Navigate to="/" replace />
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`page-shell ${styles.heroInner}`}>
          <Link to="/" className={styles.backLink}>
            ← Wróć do strony głównej
          </Link>

          <span className={styles.label}>Informacje</span>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.intro}>{page.intro}</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`page-shell ${styles.contentInner}`}>
          {page.sections.map((section) => (
            <article key={section.heading} className={styles.card}>
              <h2 className={styles.cardTitle}>{section.heading}</h2>
              <p className={styles.cardText}>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}