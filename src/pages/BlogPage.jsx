import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getAllPosts } from '../lib/blog'
import { useLangPath } from '../hooks/useLangPath'
import { useReveal } from '../hooks/useReveal'
import styles from './BlogPage.module.css'

export default function BlogPage() {
  const { t, i18n } = useTranslation()
  const posts = getAllPosts(i18n.resolvedLanguage)

  const [heroRef, heroVisible] = useReveal()

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bgBase} aria-hidden="true" />
        <div className={styles.bgGrid} aria-hidden="true" />
        <div className={styles.bgGlow} aria-hidden="true" />

        <div
          ref={heroRef}
          className={`page-shell ${styles.heroInner} reveal ${heroVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('blogPage.label')}</span>
          <h1 className={styles.title}>{t('blogPage.title')}</h1>
          <p className={styles.lead}>{t('blogPage.lead')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`page-shell ${styles.sectionInner}`}>
          <div className={styles.grid}>
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                language={i18n.resolvedLanguage}
                delay={100 + index * 80}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function BlogCard({ post, language, delay }) {
  const { t } = useTranslation()
  const langPath = useLangPath()
  const [imageError, setImageError] = useState(false)
  const [ref, visible] = useReveal()

  useEffect(() => {
    setImageError(false)
  }, [post.cover])

  const shouldShowImage = Boolean(post.cover) && !imageError

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        to={langPath(`/blog/${post.slug}`)}
        className={styles.cardLink}
      >
        {shouldShowImage && (
          <div className={styles.cardMedia}>
            <img
              src={post.cover}
              alt={post.title}
              className={styles.cardImage}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
          </div>
        )}

        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <span>{post.category}</span>
            <span>{formatPostDate(post.date, language)}</span>
          </div>

          <h2 className={styles.cardTitle}>{post.title}</h2>
          <p className={styles.cardExcerpt}>{post.excerpt}</p>

          <span className={styles.cardCta}>
            {t('blogPage.readMore')}
          </span>
        </div>
      </Link>
    </article>
  )
}

function formatPostDate(date, language) {
  if (!date) return ''

  const localeMap = {
    pl: 'pl-PL',
    en: 'en-US',
    ua: 'uk-UA',
  }

  try {
    return new Intl.DateTimeFormat(localeMap[language] || 'pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  } catch {
    return date
  }
}