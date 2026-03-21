import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { CONTACT_INFO } from '../data'
import { useReveal } from '../hooks/useReveal'
import {
  validateContactForm,
  formatPhoneDisplay,
} from '../../lib/userform/validation'
import { getRecaptchaToken } from '../../lib/userform/recaptcha'
import styles from './Contact.module.css'

const API_ENDPOINT = 'https://TWOJA-DOMENA.pl/api/contact'

const INITIAL_FORM = {
  name: '',
  company: '',
  phone: '',
  email: '',
  model: '',
  message: '',
  consent: false,
}

function translateValidationErrors(errors, t) {
  const translated = {}

  if (errors.name) translated.name = t('contact.form.errors.name')
  if (errors.phone) translated.phone = t('contact.form.errors.phone')
  if (errors.email) translated.email = t('contact.form.errors.email')
  if (errors.message) translated.message = t('contact.form.errors.message')
  if (errors.consent) translated.consent = t('contact.form.errors.consent')

  return translated
}

export default function Contact() {
  const { t } = useTranslation()

  const [headerRef, headerVisible] = useReveal()
  const [formRef, formVisible] = useReveal()
  const [infoRef, infoVisible] = useReveal()

  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')
  const [fieldErrors, setFieldErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  const [success, setSuccess] = useState('')

  const modelOptions = t('contact.form.modelOptions', { returnObjects: true })

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
      setFieldErrors(translateValidationErrors(errors, t))
      setGlobalError(t('contact.form.messages.fixErrors'))
      return
    }

    const selectedModel = modelOptions.find((option) => option.value === form.model)
    const selectedModelLabel = selectedModel?.label || ''

    try {
      setStatus('loading')

      let recaptchaToken = ''
      try {
        recaptchaToken = await getRecaptchaToken('contact_form_submit')
      } catch (err) {
        console.error('[contact-form] reCAPTCHA error:', err)
        setGlobalError(t('contact.form.messages.genericError'))
        return
      }

      if (!recaptchaToken) {
        setGlobalError(t('contact.form.messages.genericError'))
        return
      }

      const enrichedMessage = [
        values.message,
        selectedModelLabel
          ? `\n\n${t('contact.form.modelSelectionPrefix', { model: selectedModelLabel })}`
          : '',
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
            model: selectedModelLabel,
            recaptchaToken,
          }),
        })
      } catch (err) {
        console.error('[contact-form] network error:', err)
        setGlobalError(t('contact.form.messages.genericError'))
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

      setSuccess(t('contact.form.messages.success'))
      setFieldErrors({})
      setForm(INITIAL_FORM)
    } catch (err) {
      console.error('[contact-form] submit error:', err)
      setGlobalError(t('contact.form.messages.genericError'))
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
          <span className={styles.label}>{t('contact.label')}</span>
          <h2 className={styles.title} id="contact-title">
            <span>{t('contact.titleLine1')}</span>
            <br />
            <span>{t('contact.titleLine2')}</span>
          </h2>
          <p className={styles.sub}>{t('contact.sub')}</p>
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
                  label={t('contact.form.fields.name.label')}
                  name="name"
                  type="text"
                  placeholder={t('contact.form.fields.name.placeholder')}
                  value={form.name}
                  onChange={handleChange}
                  error={fieldErrors.name}
                />

                <Field
                  label={t('contact.form.fields.phone.label')}
                  name="phone"
                  type="tel"
                  placeholder={t('contact.form.fields.phone.placeholder')}
                  value={form.phone}
                  onChange={handleChange}
                  error={fieldErrors.phone}
                />
              </div>

              <Field
                label={t('contact.form.fields.email.label')}
                name="email"
                type="email"
                placeholder={t('contact.form.fields.email.placeholder')}
                value={form.email}
                onChange={handleChange}
                error={fieldErrors.email}
              />

              <SelectField
                label={t('contact.form.fields.model.label')}
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder={t('contact.form.fields.model.placeholder')}
                options={modelOptions}
              />

              <div className={styles.fieldGroup}>
                <label htmlFor="message" className={styles.fieldLabel}>
                  {t('contact.form.fields.message.label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`${styles.textarea} ${fieldErrors.message ? styles.inputInvalid : ''}`}
                  placeholder={t('contact.form.fields.message.placeholder')}
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
                    {t('contact.form.consentText')}
                  </span>
                </label>

                {fieldErrors.consent && (
                  <p className={styles.fieldError}>{fieldErrors.consent}</p>
                )}

                <p className={styles.recaptchaText}> This site is protected by reCAPTCHA and the Google{' '} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" > Privacy Policy </a>{' '} and{' '} <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" > Terms of Service </a>{' '} apply. </p> </div>

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
                  {status === 'loading'
                    ? t('contact.form.submit.loading')
                    : t('contact.form.submit.default')}
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
              <h3 className={styles.infoTitle}>{t('contact.info.title')}</h3>
              <p className={styles.infoText}>{t('contact.info.text')}</p>
            </div>

            <ul className={styles.details}>
              <Detail
                icon="📞"
                label={t('contact.info.details.phone.label')}
                values={[
                  {
                    text: CONTACT_INFO.phone,
                    href: `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`,
                  },
                  {
                    text: CONTACT_INFO.phone2,
                    href: `tel:${CONTACT_INFO.phone2.replace(/\s+/g, '')}`,
                  },
                ]}
              />
              <Detail
                icon="📧"
                label={t('contact.info.details.email.label')}
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
              />
              <Detail
                icon="📍"
                label={t('contact.info.details.address.label')}
                value={CONTACT_INFO.location}
                sub={CONTACT_INFO.locationSub}
              />
              <Detail
                icon="🕐"
                label={t('contact.info.details.hours.label')}
                value={t('contact.info.details.hours.value')}
              />
            </ul>

            <div className={styles.whatsappWrap}>
              <a
                href="https://wa.me/48600507816"
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappBtn}
                aria-label={t('contact.info.whatsapp.ariaLabel')}
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
                <span>{t('contact.info.whatsapp.label')}</span>
              </a>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                src={CONTACT_INFO.mapEmbedUrl}
                title={t('contact.map.iframeTitle')}
                className={styles.mapFrame}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className={styles.mapBar}>
                <span className={styles.mapText}>
                  {t('contact.map.barText', {
                    location: CONTACT_INFO.location,
                    locationSub: CONTACT_INFO.locationSub,
                  })}
                </span>
                <a
                  href={CONTACT_INFO.mapLinkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.mapLink}
                >
                  {t('contact.map.open')}
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

function SelectField({ label, name, value, onChange, options, placeholder }) {
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
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function Detail({ icon, label, value, sub, href, values }) {
  return (
    <li className={styles.detailItem}>
      <span className={styles.detailIcon} aria-hidden="true">
        {icon}
      </span>

      <div className={styles.detailContent}>
        <div className={styles.detailLabel}>{label}</div>

        {Array.isArray(values) && values.length > 0 ? (
          values.map((item, index) =>
            item.href ? (
              <a key={index} href={item.href} className={styles.detailVal}>
                {item.text}
              </a>
            ) : (
              <div key={index} className={styles.detailVal}>
                {item.text}
              </div>
            )
          )
        ) : href ? (
          <a href={href} className={styles.detailVal}>
            {value}
          </a>
        ) : (
          <div className={styles.detailVal}>{value}</div>
        )}

        {sub && <div className={styles.detailSub}>{sub}</div>}
      </div>
    </li>
  )
}