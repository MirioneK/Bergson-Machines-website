import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLangPath } from '../hooks/useLangPath'
import { formatPrice } from '../data'
import {
  AGGREGATES_CATALOG,
  POWER_BANDS,
  ENGINE_BRANDS,
  MIN_KW,
  MAX_KW,
  monthlyLeaseNet,
} from '../data/aggregatesCatalog'
import styles from './AggregatesCatalogPage.module.css'

const PAGE_SIZE = 12

const EMPTY = { bands: [], brands: [], priceMin: '', priceMax: '' }

const SORT_FNS = {
  priceAsc: (a, b) => a.priceGross - b.priceGross,
  priceDesc: (a, b) => b.priceGross - a.priceGross,
  powerAsc: (a, b) => a.kw - b.kw || a.priceGross - b.priceGross,
  powerDesc: (a, b) => b.kw - a.kw || a.priceGross - b.priceGross,
}
const DEFAULT_SORT = 'priceAsc'

// Mapowanie stanu filtrów na parametry URL (?moc=p2&silnik=Cummins,Ricardo),
// żeby dało się udostępnić link do konkretnego widoku i żeby działał przycisk wstecz.
const QUERY_KEYS = {
  bands: 'moc',
  brands: 'silnik',
  priceMin: 'cena_od',
  priceMax: 'cena_do',
}
const SORT_QUERY_KEY = 'sortuj'

function filtersFromSearchParams(params) {
  const getList = (name) => {
    const raw = params.get(name)
    return raw ? raw.split(',').filter(Boolean) : []
  }

  return {
    bands: getList(QUERY_KEYS.bands).filter((v) => POWER_BANDS.some((b) => b.id === v)),
    brands: getList(QUERY_KEYS.brands).filter((v) => ENGINE_BRANDS.includes(v)),
    priceMin: /^\d+$/.test(params.get(QUERY_KEYS.priceMin)) ? params.get(QUERY_KEYS.priceMin) : '',
    priceMax: /^\d+$/.test(params.get(QUERY_KEYS.priceMax)) ? params.get(QUERY_KEYS.priceMax) : '',
  }
}

function sortFromSearchParams(params) {
  const raw = params.get(SORT_QUERY_KEY)
  return raw && SORT_FNS[raw] ? raw : DEFAULT_SORT
}

function searchParamsFromState(filters, sort) {
  const params = new URLSearchParams()
  if (filters.bands.length) params.set(QUERY_KEYS.bands, filters.bands.join(','))
  if (filters.brands.length) params.set(QUERY_KEYS.brands, filters.brands.join(','))
  if (filters.priceMin) params.set(QUERY_KEYS.priceMin, filters.priceMin)
  if (filters.priceMax) params.set(QUERY_KEYS.priceMax, filters.priceMax)
  if (sort !== DEFAULT_SORT) params.set(SORT_QUERY_KEY, sort)
  return params
}

// skip = nazwa grupy pomijanej przy liczeniu liczników fasetowych (licznik pokazuje, ile doda zaznaczenie)
function matches(item, f, skip) {
  if (skip !== 'bands' && f.bands.length && !f.bands.includes(item.band)) return false
  if (skip !== 'brands' && f.brands.length && !f.brands.includes(item.engine)) return false
  if (f.priceMin && item.priceGross < Number(f.priceMin)) return false
  if (f.priceMax && item.priceGross > Number(f.priceMax)) return false
  return true
}

export default function AggregatesCatalogPage() {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState(() => filtersFromSearchParams(searchParams))
  const [sort, setSort] = useState(() => sortFromSearchParams(searchParams))
  const [shown, setShown] = useState(PAGE_SIZE)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const fmt = (v) => formatPrice(v, i18n.resolvedLanguage)

  // Jednokierunkowa synchronizacja: stan filtrów/sortowania jest źródłem prawdy,
  // adres URL jest tylko jego odbiciem — dzięki temu widok da się zapisać w
  // zakładkach i udostępnić, a przycisk wstecz/dalej przegląda zmiany filtrów.
  useEffect(() => {
    setSearchParams(searchParamsFromState(filters, sort), { replace: true })
  }, [filters, sort])

  const SORTS = {
    priceAsc: { label: t('aggregatesCatalog.sort.priceAsc'), fn: SORT_FNS.priceAsc },
    priceDesc: { label: t('aggregatesCatalog.sort.priceDesc'), fn: SORT_FNS.priceDesc },
    powerAsc: { label: t('aggregatesCatalog.sort.powerAsc'), fn: SORT_FNS.powerAsc },
    powerDesc: { label: t('aggregatesCatalog.sort.powerDesc'), fn: SORT_FNS.powerDesc },
  }

  usePageMeta({
    title: t('meta.aggregatesCatalog.title', { range: `${MIN_KW}–${MAX_KW} kW` }),
    description: t('meta.aggregatesCatalog.description', { brands: ENGINE_BRANDS.join(', ') }),
  })

  const update = (patch) => {
    setFilters((f) => ({ ...f, ...patch }))
    setShown(PAGE_SIZE)
  }
  const toggle = (key, value) =>
    update({
      [key]: filters[key].includes(value) ? filters[key].filter((v) => v !== value) : [...filters[key], value],
    })

  const activeFilterCount =
    filters.bands.length +
    filters.brands.length +
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0)

  const results = useMemo(
    () => AGGREGATES_CATALOG.filter((i) => matches(i, filters)).sort(SORTS[sort].fn),
    [filters, sort]
  )

  const facetGroups = [
    {
      key: 'bands',
      title: t('aggregatesCatalog.powerGroupTitle'),
      options: POWER_BANDS.map((b) => ({ value: b.id, label: b.label })),
      field: 'band',
    },
    {
      key: 'brands',
      title: t('aggregatesCatalog.brandGroupTitle'),
      options: ENGINE_BRANDS.map((b) => ({ value: b, label: b })),
      field: 'engine',
    },
  ]

  const labelFor = (key, value) => facetGroups.find((g) => g.key === key).options.find((o) => o.value === value).label
  const chips = [
    ...filters.bands.map((v) => ({
      label: t('aggregatesCatalog.chipPower', { label: labelFor('bands', v) }),
      remove: () => toggle('bands', v),
    })),
    ...filters.brands.map((v) => ({
      label: t('aggregatesCatalog.chipEngine', { label: v }),
      remove: () => toggle('brands', v),
    })),
    ...(filters.priceMin
      ? [{ label: t('aggregatesCatalog.chipPriceFrom', { price: filters.priceMin }), remove: () => update({ priceMin: '' }) }]
      : []),
    ...(filters.priceMax
      ? [{ label: t('aggregatesCatalog.chipPriceTo', { price: filters.priceMax }), remove: () => update({ priceMax: '' }) }]
      : []),
  ]

  return (
    <main>
      <section className={`page-shell ${styles.head}`}>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <Link to={langPath('/')}>{t('aggregatesCatalog.breadcrumbHome')}</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.crumbCurrent}>{t('aggregatesCatalog.breadcrumbCurrent')}</span>
        </nav>
        <h1 className={styles.title}>{t('aggregatesCatalog.title')}</h1>
        <p className={styles.sub}>
          {t('aggregatesCatalog.subtitle', {
            count: AGGREGATES_CATALOG.length,
            range: `${MIN_KW}–${MAX_KW} kW`,
            brands: ENGINE_BRANDS.join(', '),
          })}
        </p>
      </section>

      <section className={`page-shell ${styles.layout}`}>
        <button
          type="button"
          className={styles.mobileFilterToggle}
          onClick={() => setMobileFiltersOpen((v) => !v)}
          aria-expanded={mobileFiltersOpen}
          aria-controls="aggregates-filters"
        >
          <span>
            {mobileFiltersOpen ? t('aggregatesCatalog.hideFilters') : t('aggregatesCatalog.showFilters')}
          </span>
          {activeFilterCount > 0 && (
            <span className={styles.filterCountBadge}>{activeFilterCount}</span>
          )}
          <span className={styles.mobileFilterIcon} aria-hidden="true">{mobileFiltersOpen ? '−' : '+'}</span>
        </button>

        <aside
          id="aggregates-filters"
          className={`${styles.sidebar} ${mobileFiltersOpen ? styles.sidebarOpenMobile : ''}`}
          aria-label={t('aggregatesCatalog.filtersTitle')}
        >
          <div className={styles.sidebarHead}>
            <strong>{t('aggregatesCatalog.filtersTitle')}</strong>
            <button type="button" className={styles.clear} onClick={() => update(EMPTY)}>
              {t('aggregatesCatalog.clear')}
            </button>
          </div>

          <div className={styles.group}>
            <span className={styles.groupTitle}>{t('aggregatesCatalog.priceGroupTitle')}</span>
            <div className={styles.priceRow}>
              <input
                type="number"
                inputMode="numeric"
                placeholder={t('aggregatesCatalog.priceFromPlaceholder')}
                aria-label={t('aggregatesCatalog.priceFromAria')}
                value={filters.priceMin}
                onChange={(e) => update({ priceMin: e.target.value })}
              />
              <span aria-hidden="true">–</span>
              <input
                type="number"
                inputMode="numeric"
                placeholder={t('aggregatesCatalog.priceToPlaceholder')}
                aria-label={t('aggregatesCatalog.priceToAria')}
                value={filters.priceMax}
                onChange={(e) => update({ priceMax: e.target.value })}
              />
            </div>
          </div>

          {facetGroups.map((group) => (
            <div key={group.key} className={styles.group} role="group" aria-label={group.title}>
              <span className={styles.groupTitle}>{group.title}</span>
              {group.options.map((opt) => {
                const checked = filters[group.key].includes(opt.value)
                const count = AGGREGATES_CATALOG.filter(
                  (i) => i[group.field] === opt.value && matches(i, filters, group.key)
                ).length
                return (
                  <label key={opt.value} className={`${styles.option} ${!count && !checked ? styles.optionEmpty : ''}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggle(group.key, opt.value)} />
                    <span className={styles.optionLabel}>{opt.label}</span>
                    <span className={styles.optionCount}>({count})</span>
                  </label>
                )
              })}
            </div>
          ))}
        </aside>

        <div className={styles.results}>
          <div className={styles.toolbar}>
            <span>{t('aggregatesCatalog.resultsLabel', { count: results.length, total: AGGREGATES_CATALOG.length })}</span>
            <label className={styles.sort}>
              {t('aggregatesCatalog.sortLabel')}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(SORTS).map(([key, s]) => (
                  <option key={key} value={key}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {chips.length > 0 && (
            <div className={styles.chips}>
              {chips.map((chip) => (
                <button key={chip.label} type="button" className={styles.chip} onClick={chip.remove}>
                  {chip.label} <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          )}

          <div className={styles.grid}>
            {results.slice(0, shown).map((item) => (
              <AggregateCard key={item.id} item={item} fmt={fmt} t={t} langPath={langPath} />
            ))}
          </div>

          {results.length > shown && (
            <button type="button" className={styles.more} onClick={() => setShown((n) => n + PAGE_SIZE)}>
              {t('aggregatesCatalog.showMore', {
                batch: Math.min(PAGE_SIZE, results.length - shown),
                remaining: results.length - shown,
              })}
            </button>
          )}

          {results.length === 0 && (
            <div className={styles.empty}>
              <strong>{t('aggregatesCatalog.emptyTitle')}</strong>
              <button type="button" onClick={() => update(EMPTY)}>
                {t('aggregatesCatalog.emptyClear')}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function AggregateCard({ item, fmt, t, langPath }) {
  const navigate = useNavigate()
  const detailTo = langPath(`/agregaty/${item.id}`)
  const name = `${t('aggregates.unitName')} ${item.name} ${item.engine}`

  // The "Zapytaj o ofertę" / "Rata" buttons call stopPropagation on their own
  // click, so this only fires for clicks elsewhere on the card.
  const goToDetail = () => navigate(detailTo)
  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      goToDetail()
    }
  }

  return (
    <article
      className={styles.card}
      onClick={goToDetail}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={name}
    >
      <div className={styles.media}>
        <img src={item.image} alt={name} loading="lazy" />
        {item.stamfordAlternator && (
          <span className={styles.badge}>{t('aggregatesCatalog.badgeStamford')}</span>
        )}
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{name}</h2>
        <ul className={styles.specs}>
          <li><span>{t('aggregatesCatalog.specPower')}:</span> {item.kw} kW / {item.kva}</li>
          <li><span>{t('aggregatesCatalog.specEngine')}:</span> {item.engine}{item.engineModel ? ` ${item.engineModel}` : ''}</li>
          <li><span>{t('aggregatesCatalog.specAlternator')}:</span> {item.alternator}</li>
          <li><span>{t('aggregatesCatalog.specWeight')}:</span> {item.weight} kg</li>
        </ul>
        <div className={styles.priceBlock}>
          <strong className={styles.price}>{fmt(item.priceGross)}</strong>
          <span className={styles.lease}>
            {t('aggregatesCatalog.priceGrossSuffix')} · {t('aggregatesCatalog.leaseFrom', { price: fmt(monthlyLeaseNet(item.priceGross)) })}
          </span>
        </div>
        <div className={styles.actions}>
          <Link
            className={styles.primary}
            to={langPath('/', '#kontakt')}
            state={{ machine: item.id }}
            onClick={(event) => event.stopPropagation()}
          >
            {t('aggregatesCatalog.ctaOffer')}
          </Link>
          <Link
            className={styles.secondary}
            to={langPath('/', '#leasing')}
            state={{ calcModel: item.id }}
            onClick={(event) => event.stopPropagation()}
          >
            {t('aggregatesCatalog.ctaInstallment')}
          </Link>
        </div>
      </div>
    </article>
  )
}
