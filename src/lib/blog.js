import { DEFAULT_LANG, SUPPORTED_LANGS } from '../i18n/routing'

const blogFiles = import.meta.glob('../content/blog/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontMatter(raw = '') {
  if (!raw.startsWith('---')) {
    return {
      data: {},
      content: raw.trim(),
    }
  }

  const closingIndex = raw.indexOf('\n---', 3)

  if (closingIndex === -1) {
    return {
      data: {},
      content: raw.trim(),
    }
  }

  const frontMatterBlock = raw.slice(3, closingIndex).trim()
  const content = raw.slice(closingIndex + 4).trim()

  const data = {}

  frontMatterBlock.split('\n').forEach((line) => {
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
    title: data.title || slug,
    excerpt: data.excerpt || '',
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
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
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