import { DEFAULT_LANG, SUPPORTED_LANGS } from '../i18n/routing'

const blogFiles = import.meta.glob('../content/blog/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const FRONT_MATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

function parseFrontMatter(raw = '') {
  const match = raw.match(FRONT_MATTER_REGEX)

  if (!match) {
    return {
      data: {},
      content: raw.trim(),
    }
  }

  const frontMatterBlock = match[1].trim()
  const content = match[2].trim()
  const data = {}

  frontMatterBlock.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return

    const separatorIndex = trimmed.indexOf(':')
    if (separatorIndex === -1) return

    const key = trimmed.slice(0, separatorIndex).trim()
    let value = trimmed.slice(separatorIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (value === 'true') value = true
    else if (value === 'false') value = false

    data[key] = value
  })

  return { data, content }
}

function normalizePost(filePath, rawContent) {
  const match = filePath.match(/\/blog\/([^/]+)\/([^/]+)\.md$/)

  const lang = match?.[1] || DEFAULT_LANG
  const slug = match?.[2] || 'post'

  const { data, content } = parseFrontMatter(rawContent)

  return {
    lang,
    slug,
    translationKey: data.translationKey || slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    seoTitle: data.seoTitle || '',
    seoDescription: data.seoDescription || '',
    date: data.date || '',
    category: data.category || '',
    cover: data.cover || null,
    draft: Boolean(data.draft),
    content,
  }
}

const ALL_POSTS = Object.entries(blogFiles).map(([filePath, rawContent]) =>
  normalizePost(filePath, rawContent)
)

function sortPosts(posts) {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

function getSafeLang(lang) {
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG
}

export function getAllPosts(lang = DEFAULT_LANG) {
  const safeLang = getSafeLang(lang)

  const localizedPosts = ALL_POSTS.filter(
    (post) => post.lang === safeLang && !post.draft
  )

  if (localizedPosts.length > 0) {
    return sortPosts(localizedPosts)
  }

  return sortPosts(
    ALL_POSTS.filter((post) => post.lang === DEFAULT_LANG && !post.draft)
  )
}

export function getPostBySlug(lang = DEFAULT_LANG, slug) {
  const safeLang = getSafeLang(lang)

  return (
    ALL_POSTS.find(
      (post) => post.lang === safeLang && post.slug === slug && !post.draft
    ) ||
    ALL_POSTS.find(
      (post) => post.lang === DEFAULT_LANG && post.slug === slug && !post.draft
    ) ||
    null
  )
}

export function getPostAlternates(lang = DEFAULT_LANG, slug) {
  const currentPost = getPostBySlug(lang, slug)

  if (!currentPost) return []

  return SUPPORTED_LANGS.map((locale) => {
    const localizedPost = ALL_POSTS.find(
      (post) =>
        post.lang === locale &&
        post.translationKey === currentPost.translationKey &&
        !post.draft
    )

    if (!localizedPost) return null

    return {
      lang: locale,
      slug: localizedPost.slug,
      translationKey: localizedPost.translationKey,
    }
  }).filter(Boolean)
}

export function getAllPublishedPostRoutes() {
  return ALL_POSTS
    .filter((post) => !post.draft)
    .map((post) => ({
      lang: post.lang,
      slug: post.slug,
      date: post.date,
      translationKey: post.translationKey,
    }))
}