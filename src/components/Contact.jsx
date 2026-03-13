import React, { useState } from 'react'
import { CONTACT_INFO } from '../data'
import { useReveal } from '../hooks/useReveal'
import {
  validateContactForm,
  formatPhoneDisplay,
} from '../../lib/userform/validation'
import { getRecaptchaToken } from '../../lib/userform/recaptcha'
import styles from './Contact.module.css'

const API_ENDPOINT = 'https://TWOJA-DOMENA.pl/api/contact'

const GENERIC_ERROR_MESSAGE =
  'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę lub skontaktuj się z nami telefonicznie lub mailowo.'

const INITIAL_FORM = {
  name: '',
  company: '',
  phone: '',
  email: '',
  model: '',
  message: '',
  consent: false,
}

const MODEL_OPTIONS = [
  'BM10 – 1 tona',
  'BM12 – 1,2 tony',
  'BM12C – 1,2 tony z kabiną',
  'Potrzebuję doradztwa',
]

export default function Contact() {
  const [headerRef, headerVisible] = useReveal()
  const [formRef, formVisible] = useReveal()
  const [infoRef, infoVisible] = useReveal()

  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | loading
  const [fieldErrors, setFieldErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    let newValue = type === 'checkbox' ? checked : value

    if (name === 'phone') {
      newValue = formatPhoneDisplay(newValue)
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    setFieldErrors((prev) => {
      const copy = { ...prev }
      delete copy[name]
      return copy
    })

    setGlobalError('')
    setSuccess('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setGlobalError('')
    setSuccess('')

    const { valid, errors, values } = validateContactForm(form)

    if (!valid) {
      setFieldErrors(errors)
      setGlobalError(
        'Uzupełnij wymagane pola, popraw e-mail lub telefon i zaznacz zgodę na kontakt.'
      )
      return
    }

    try {
      setStatus('loading')

      let recaptchaToken = ''
      try {
        recaptchaToken = await getRecaptchaToken('contact_form_submit')
      } catch (err) {
        console.error('[contact-form] reCAPTCHA error:', err)
        setGlobalError(GENERIC_ERROR_MESSAGE)
        return
      }

      if (!recaptchaToken) {
        setGlobalError(GENERIC_ERROR_MESSAGE)
        return
      }

      const enrichedMessage = [
        values.message,
        form.model ? `\n\nInteresujący model: ${form.model}` : '',
      ]
        .join('')
        .trim()

      let response
      try {
        response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            company: values.company || '',
            email: values.email,
            phone: values.phone,
            message: enrichedMessage,
            model: form.model,
            recaptchaToken,
          }),
        })
      } catch (err) {
        console.error('[contact-form] network error:', err)
        setGlobalError(GENERIC_ERROR_MESSAGE)
        return
      }

      let data = {}
      try {
        data = await response.json()
      } catch (err) {
        console.error('[contact-form] JSON parse error:', err)
      }

      if (!response.ok || !data.ok) {
        console.error('[contact-form] backend error:', {
          status: response.status,
          body: data,
        })
        throw new Error(data.error || 'API returned an error')
      }

      setSuccess('Dziękujemy! Twoje zapytanie zostało wysłane.')
      setFieldErrors({})
      setForm(INITIAL_FORM)
    } catch (err) {
      console.error('[contact-form] submit error:', err)
      setGlobalError(GENERIC_ERROR_MESSAGE)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <section className={styles.section} id="kontakt" aria-labelledby="contact-title">
      <div className={`page-shell ${styles.outer}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Skontaktuj się</span>
          <h2 className={styles.title} id="contact-title">
            Wycena bezpłatna. Odpowiedź dziś.
          </h2>
          <p className={styles.sub}>
            Opisz czego potrzebujesz, a wrócimy z konkretną odpowiedzią i doborem
            modelu pod Twoje prace.
          </p>
        </header>

        <div className={styles.inner}>
          <div
            ref={formRef}
            className={`${styles.formCard} reveal ${formVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.row2}>
                <Field
                  label="Imię i nazwisko *"
                  name="name"
                  type="text"
                  placeholder="Jan Kowalski"
                  value={form.name}
                  onChange={handleChange}
                  error={fieldErrors.name}
                />

                <Field
                  label="Telefon *"
                  name="phone"
                  type="tel"
                  placeholder="+48 600 000 000"
                  value={form.phone}
                  onChange={handleChange}
                  error={fieldErrors.phone}
                />
              </div>

              <Field
                label="E-mail"
                name="email"
                type="email"
                placeholder="jan@firma.pl"
                value={form.email}
                onChange={handleChange}
                error={fieldErrors.email}
              />

              <SelectField
                label="Interesujący model"
                name="model"
                value={form.model}
                onChange={handleChange}
                options={MODEL_OPTIONS}
              />

              <div className={styles.fieldGroup}>
                <label htmlFor="message" className={styles.fieldLabel}>
                  Pytanie lub opis prac *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`${styles.textarea} ${fieldErrors.message ? styles.inputInvalid : ''}`}
                  placeholder="Opisz do czego potrzebujesz koparki, jakie masz pytania i jaki zakres prac planujesz."
                  value={form.message}
                  onChange={handleChange}
                />
                {fieldErrors.message && (
                  <p className={styles.fieldError}>{fieldErrors.message}</p>
                )}
              </div>

              <div className={styles.consentBlock}>
                <label className={styles.consentRow}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={handleChange}
                    className={`${styles.checkbox} ${fieldErrors.consent ? styles.checkboxInvalid : ''}`}
                  />
                  <span className={styles.consentText}>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez firmę Better Solutions. z o.o. z siedzibą przy ul. Poznańska 7, 61-160 Czapury, NIP: 7252298652 w celu udzielenia odpowiedzi, w tym przedłożenia oferty jeśli o nią pytam.
                  </span>
                </label>

                {fieldErrors.consent && (
                  <p className={styles.fieldError}>{fieldErrors.consent}</p>
                )}

                <p className={styles.recaptchaText}>
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </div>

              <div className={styles.formFooter}>
                {globalError && (
                  <div className={styles.formMessageError}>{globalError}</div>
                )}

                {success && (
                  <div className={styles.formMessageSuccess}>{success}</div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.submitBtn}
                >
                  {status === 'loading' ? 'Wysyłanie…' : 'Wyślij zapytanie'}
                </button>
              </div>
            </form>
          </div>

          <aside
            ref={infoRef}
            className={`${styles.infoCard} reveal ${infoVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '180ms' }}
          >
            <div className={styles.infoTop}>
              <h3 className={styles.infoTitle}>Porozmawiajmy</h3>
              <p className={styles.infoText}>
                Nie zmuszamy do zakupu przez internet. Wolisz zadzwonić? Chcesz
                zobaczyć maszynę na żywo? Przyjedź do nas lub zamów wizytę
                demonstracyjną.
              </p>
            </div>

            <ul className={styles.details}>
              <Detail icon="📞" label="Telefon" value={CONTACT_INFO.phone} />
              <Detail icon="📧" label="E-mail" value={CONTACT_INFO.email} />
              <Detail
                icon="📍"
                label="Adres"
                value={CONTACT_INFO.location}
                sub={CONTACT_INFO.locationSub}
              />
              <Detail icon="🕐" label="Godziny pracy" value={CONTACT_INFO.hours} />
            </ul>

            <div className={styles.whatsappWrap}>
              <a
                href="https://wa.me/48600507816"
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappBtn}
                aria-label="Napisz do nas na WhatsApp"
              >
                <span className={styles.whatsappIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20.52 3.48A11.78 11.78 0 0 0 12.04 0C5.56 0 .28 5.27.28 11.74c0 2.07.54 4.1 1.58 5.89L0 24l6.56-1.72a11.72 11.72 0 0 0 5.48 1.39h.01c6.47 0 11.74-5.27 11.74-11.74 0-3.14-1.22-6.09-3.27-8.45Z"
                      fill="currentColor"
                      opacity="0.16"
                    />
                    <path
                      d="M12.05 2.08c-5.33 0-9.66 4.33-9.66 9.66 0 1.9.55 3.75 1.6 5.33l.25.37-.98 3.57 3.66-.96.36.21a9.65 9.65 0 0 0 4.77 1.25h.01c5.33 0 9.66-4.33 9.66-9.66 0-2.58-1-5.01-2.82-6.83a9.57 9.57 0 0 0-6.85-2.94Zm5.63 13.67c-.24.68-1.4 1.3-1.93 1.33-.5.03-1.13.05-1.82-.18-.42-.14-.97-.32-1.67-.62-2.94-1.27-4.85-4.24-4.99-4.43-.14-.18-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.58-.38.77-.38.19 0 .39 0 .57.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.11.32.02.51-.08.18-.13.3-.27.46-.14.16-.29.35-.41.46-.14.14-.29.29-.13.57.16.28.72 1.18 1.55 1.91 1.06.95 1.95 1.24 2.23 1.39.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.27.09 1.68.79 1.97.94.29.14.49.21.56.33.07.12.07.68-.17 1.36Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>Napisz na WhatsApp</span>
              </a>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                src={CONTACT_INFO.mapEmbedUrl}
                title="Bergson Machines — Pobórka Wielka"
                className={styles.mapFrame}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className={styles.mapBar}>
                <span className={styles.mapText}>
                  Pobórka Wielka 2, 89-340 Pobórka Wielka
                </span>
                <a
                  href={CONTACT_INFO.mapLinkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.mapLink}
                >
                  Otwórz mapę
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.inputInvalid : ''}`}
      />
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
      >
        <option value="">Wybierz</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function Detail({ icon, label, value, sub }) {
  return (
    <li className={styles.detailItem}>
      <span className={styles.detailIcon} aria-hidden="true">
        {icon}
      </span>

      <div className={styles.detailContent}>
        <div className={styles.detailLabel}>{label}</div>
        <div className={styles.detailVal}>{value}</div>
        {sub && <div className={styles.detailSub}>{sub}</div>}
      </div>
    </li>
  )
}