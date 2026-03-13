// components/scripts/userform/validation.js

// --- EMAIL ---

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Walidacja adresu e-mail na potrzeby formularza kontaktowego.
 *
 * Zwraca:
 *  - valid: boolean
 *  - value: obcięty z białych znaków e-mail (gotowy do wysyłki)
 *  - error: komunikat błędu lub null
 */
export function validateEmail(email, { required = true } = {}) {
  const value = (email || "").trim();

  if (!value) {
    if (!required) {
      return { valid: true, value: "", error: null };
    }
    return {
      valid: false,
      value,
      error: "Adres e-mail jest wymagany.",
    };
  }

  if (!EMAIL_REGEX.test(value)) {
    return {
      valid: false,
      value,
      error: "Podaj poprawny adres e-mail (np. nazwa@domena.pl).",
    };
  }

  return { valid: true, value, error: null };
}

// --- TELEFON (PL: 9 cyfr, opcjonalnie +48) ---

/**
 * Formatuje numer dla wyświetlenia w polu:
 * +48123456789 -> "+48 123 456 789"
 * 123456789    -> "123 456 789"
 * 67584        -> "675 84"
 */
// Formatowanie „as-you-type” dla numeru PL:
// 1) pozwala wpisać: "+", "+4", "+45" — nic nie ucina
// 2) gdy wykryje pełne "+48", formatuje dalej 3-3-3
// 3) bez plusa grupuje cyfry 3-3-3, maks. 9 cyfr
export function formatPhoneDisplay(raw) {
  if (!raw) return "";

  // usuwamy tylko spacje, resztę zostawiamy
  let trimmed = raw.replace(/\s+/g, "");

  // Etap wpisywania prefiksu kraju – nie kombinujemy
  if (trimmed === "+" || trimmed === "+4" || trimmed === "+45") {
    return trimmed;
  }

  // Jeśli zaczyna się od '+'
  if (trimmed.startsWith("+")) {
    const digits = trimmed.slice(1).replace(/\D/g, "");

    // Case PL: +48 + 9 cyfr => formatujemy 3-3-3
    if (digits.startsWith("48")) {
      const rest = digits.slice(2, 11); // maks. 9 cyfr po "48"
      const groups = [];
      for (let i = 0; i < rest.length; i += 3) {
        groups.push(rest.slice(i, i + 3));
      }
      const joined = groups.join(" ");
      return joined ? "+48 " + joined : "+48";
    }

    // Inne kraje – tylko plus + cyfry bez dodatkowego formatowania
    return "+" + digits.slice(0, 15);
  }

  // Brak plusa – przyjmujemy „krajowy” numer PL i grupujemy co 3 cyfry
  const digitsOnly = trimmed.replace(/\D/g, "").slice(0, 9); // maks. 9 cyfr
  const groups = [];
  for (let i = 0; i < digitsOnly.length; i += 3) {
    groups.push(digitsOnly.slice(i, i + 3));
  }

  return groups.join(" ");
}

// Walidacja numeru PL:
// - akceptuje 9 cyfr (np. "123 456 789")
// - albo "+48" + 9 cyfr (np. "+48 123 456 789")
// - zwraca:
//   valid: bool
//   value: numer w formacie do backendu (E.164: +48xxxxxxxxx)
//   display: sformatowany tak jak w polu
//   error: komunikat PL lub null
export function validatePhone(raw, { required = false } = {}) {
  const display = formatPhoneDisplay(raw);
  const compact = display.replace(/\s+/g, "");

  if (!compact) {
    if (!required) {
      return { valid: true, value: "", display, error: null };
    }
    return {
      valid: false,
      value: "",
      display,
      error: "Numer telefonu jest wymagany.",
    };
  }

  // wyciągamy same cyfry, żeby łatwo liczyć długość
  const digits = compact.replace(/\D/g, "");

  // Case 1: zaczyna się od '+' → oczekujemy +48XXXXXXXXX (łącznie 11 cyfr)
  if (compact.startsWith("+")) {
    if (!digits.startsWith("48") || digits.length !== 11) {
      return {
        valid: false,
        value: "",
        display,
        error:
          "Wprowadź poprawny numer telefonu w formacie +48 123 456 789.",
      };
    }

    // E.164: +48 + 9 cyfr
    const e164 = "+" + digits;
    return { valid: true, value: e164, display, error: null };
  }

  // Case 2: krajowy numer bez plusa → oczekujemy dokładnie 9 cyfr
  if (digits.length !== 9) {
    return {
      valid: false,
      value: "",
      display,
      error: "Wprowadź poprawny numer telefonu (9 cyfr, np. 123 456 789).",
    };
  }

  // Z punktu widzenia backendu najlepiej od razu E.164:
  const e164 = "+48" + digits; // jeśli wolisz bez +48, zmień na samo `digits`

  return { valid: true, value: e164, display, error: null };
}


// --- Walidacja całego formularza ---

export function validateContactForm(fields) {
  const values = {
    name: (fields.name || "").trim(),
    company: (fields.company || "").trim(),
    email: (fields.email || "").trim(),
    phoneDisplay: fields.phone || "",
    message: (fields.message || "").trim(),
    consent: !!fields.consent,
  };

  const errors = {};

  if (!values.name) {
    errors.name = "Podaj imię i nazwisko.";
  }

  const emailRes = validateEmail(values.email, { required: false })
    values.email = emailRes.value
    if (!emailRes.valid) {
    errors.email = emailRes.error
    }

    const phoneRes = validatePhone(values.phoneDisplay, { required: true })
    values.phone = phoneRes.value
    values.phoneDisplay = phoneRes.display
    if (!phoneRes.valid) {
    errors.phone = phoneRes.error
    }

  if (!values.message) {
    errors.message = "Opisz swój projekt.";
  }

  if (!values.consent) {
    errors.consent = "Musisz wyrazić zgodę na przetwarzanie danych.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values,
  };
}
