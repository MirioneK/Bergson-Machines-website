import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getPostAlternates } from '../lib/blog'
import { useLangPath } from '../hooks/useLangPath'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { buildLangPath } from '../i18n/routing'
import styles from './BlogPostPage.module.css'

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://bergsonmachines.pl').replace(/\/$/, '')

export default function BlogPostPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

  const post = getPostBySlug(i18n.resolvedLanguage, slug)
  const [coverError, setCoverError] = useState(false)

  const [heroRef, heroVisible] = useReveal()
  const [coverRef, coverVisible] = useReveal()
  const [articleRef, articleVisible] = useReveal()

  useEffect(() => {
    setCoverError(false)
  }, [post?.cover])

  if (!post) {
    return <Navigate to={langPath('/blog')} replace />
  }

  const shouldShowCover = Boolean(post.cover) && !coverError

  const blogAlternates = getPostAlternates(i18n.resolvedLanguage, slug).map(
    ({ lang, slug: localizedSlug }) => ({
      lang,
      href: `${SITE_URL}${buildLangPath(lang, `/blog/${localizedSlug}`)}`,
    })
  )

  usePageMeta({
    title: post.seoTitle || t('meta.blogPost.title', { title: post.title }),
    description: post.seoDescription || post.excerpt || t('meta.blog.description'),
    image: post.cover || undefined,
    type: 'article',
    alternates: blogAlternates,
  })

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div
          ref={heroRef}
          className={`page-shell ${styles.heroInner} reveal ${heroVisible ? 'visible' : ''}`}
        >
          <Link to={langPath('/blog')} className={styles.backLink}>
            {t('blogPostPage.backLink')}
          </Link>

          <div className={styles.meta}>
            <span>{post.category}</span>
            <span>{formatPostDate(post.date, i18n.resolvedLanguage)}</span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          {post.excerpt && <p className={styles.lead}>{post.excerpt}</p>}
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`page-shell ${styles.contentWrap}`}>
          {shouldShowCover && (
            <div
              ref={coverRef}
              className={`${styles.coverWrap} reveal ${coverVisible ? 'visible' : ''}`}
              style={{ transitionDelay: '100ms' }}
            >
              <img
                src={post.cover}
                alt={post.title}
                className={styles.cover}
                onError={() => setCoverError(true)}
              />
            </div>
          )}

          <article
            ref={articleRef}
            className={`${styles.article} reveal ${articleVisible ? 'visible' : ''}`}
            style={{ transitionDelay: shouldShowCover ? '180ms' : '100ms' }}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </div>
      </section>
    </main>
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