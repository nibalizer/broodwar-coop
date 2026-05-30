import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ContentBox from '../components/ContentBox'
import './Play.css'

// JSON files (manifest.json, variables.json) are served from public/ — same origin, no CORS.
const JSON_BASE: string = import.meta.env.BASE_URL

// .scx files live on S3/CloudFront.  Set VITE_MAPS_BASE_URL in .env.local or CI:
//   VITE_MAPS_BASE_URL=https://dprb1kkglcoiz.cloudfront.net/maps/
const DOWNLOAD_BASE: string =
  (import.meta.env.VITE_MAPS_BASE_URL as string | undefined) ?? import.meta.env.BASE_URL

function ensure_slash(s: string): string {
  return s.endsWith('/') ? s : s + '/'
}

function fmt_time(s: number): string {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface DifficultyOption {
  id: string
  label: string
  timer_seconds: number
}

interface RaceOption {
  id: string
  label: string
}

interface QteOption {
  id: string
  label: string
  category: string
  fire_time_seconds?: number
  description?: string
  qte_ids?: string[]
}

interface Variables {
  difficulty: { options: DifficultyOption[] }
  race: { options: RaceOption[] }
  qte: { options: QteOption[] }
}

interface ManifestEntry {
  filename: string
  difficulty: string
  race: string
  qte_loadout: string
  qtes: { id: string; label: string }[]
  timer_seconds: number
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Play() {
  const [variables, setVariables] = useState<Variables | null>(null)
  const [manifest, setManifest] = useState<ManifestEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selDifficulty, setSelDifficulty] = useState<string | null>(null)
  const [selRace, setSelRace] = useState<string | null>(null)
  const [selQte, setSelQte] = useState<string | null>(null)

  const [randDifficulty, setRandDifficulty] = useState<string | null>(null)
  const [randEntry, setRandEntry] = useState<ManifestEntry | null>(null)

  function rollRandom() {
    if (!randDifficulty) return
    const pool = manifest.filter(m => m.difficulty === randDifficulty)
    if (!pool.length) return
    setRandEntry(pool[Math.floor(Math.random() * pool.length)])
  }

  useEffect(() => {
    const b = ensure_slash(JSON_BASE)
    Promise.all([
      fetch(b + 'variables.json').then(r => {
        if (!r.ok) throw new Error(`variables.json: ${r.status}`)
        return r.json() as Promise<Variables>
      }),
      fetch(b + 'manifest.json').then(r => {
        if (!r.ok) throw new Error(`manifest.json: ${r.status}`)
        return r.json() as Promise<ManifestEntry[]>
      }),
    ])
      .then(([vars, mfst]) => { setVariables(vars); setManifest(mfst) })
      .catch(err => setError((err as Error).message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <main className="main-content">
      <ContentBox title="Play BW Co-op"><p>Loading map data...</p></ContentBox>
    </main>
  )

  if (error || !variables) return (
    <main className="main-content">
      <ContentBox title="Play BW Co-op">
        <p className="err">Error loading map data: {error}</p>
      </ContentBox>
    </main>
  )

  const qteOpts = variables.qte.options
  const factions: [string, string][] = [
    ['terran', 'Terran'], ['zerg', 'Zerg'], ['protoss', 'Protoss'], ['wildcard', 'Wildcard'],
  ]

  const entry = selDifficulty && selRace && selQte
    ? manifest.find(m => m.difficulty === selDifficulty && m.race === selRace && m.qte_loadout === selQte)
    : undefined

  const diffOpt = variables.difficulty.options.find(o => o.id === selDifficulty)
  const raceOpt = variables.race.options.find(o => o.id === selRace)
  const qteOpt  = variables.qte.options.find(o => o.id === selQte)

  return (
    <main className="main-content">
      <ContentBox title="Play BW Co-op">
        <p>
          Configure your variant and download the map.{' '}
          New? See the <Link to="/setup">Setup Guide</Link>.
        </p>
      </ContentBox>

      <ContentBox title="Select Your Variant">
        <div className="variant-grid">

          {/* Difficulty */}
          <div className="selector-panel">
            <div className="selector-header">Difficulty</div>
            <div className="selector-list">
              {variables.difficulty.options.map(o => (
                <button
                  key={o.id}
                  className={`selector-btn${selDifficulty === o.id ? ' selected' : ''}`}
                  onClick={() => setSelDifficulty(o.id)}
                >
                  <span>{o.label}</span>
                  <span className="selector-sub">{fmt_time(o.timer_seconds)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Race */}
          <div className="selector-panel">
            <div className="selector-header">Enemy Race</div>
            <div className="selector-list">
              {variables.race.options.map(o => (
                <button
                  key={o.id}
                  className={`selector-btn${selRace === o.id ? ' selected' : ''}`}
                  onClick={() => setSelRace(o.id)}
                >
                  <span>{o.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* QTE */}
          <div className="selector-panel">
            <div className="selector-header">Quick Time Event</div>
            <div className="selector-list scrollable">

              {(() => {
                const combos = qteOpts.filter(o => o.category === 'combo')
                if (!combos.length) return null
                return (
                  <div>
                    <div className="selector-group">Combo Loadouts</div>
                    {combos.map(o => (
                      <button
                        key={o.id}
                        className={`selector-btn${selQte === o.id ? ' selected' : ''}`}
                        onClick={() => setSelQte(o.id)}
                      >
                        <span>{o.label}</span>
                        {o.description && (
                          <span className="selector-sub combo-desc">{o.description}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )
              })()}

              {(() => {
                const none = qteOpts.find(o => o.category === 'none')
                return none && (
                  <div>
                    <div className="selector-group">Single Events</div>
                    <button
                      className={`selector-btn${selQte === none.id ? ' selected' : ''}`}
                      onClick={() => setSelQte(none.id)}
                    >
                      <span>{none.label}</span>
                    </button>
                  </div>
                )
              })()}

              {factions.map(([cat, name]) => {
                const singles = qteOpts.filter(o => o.category === cat)
                if (!singles.length) return null
                return (
                  <div key={cat}>
                    <div className="selector-group">{name}</div>
                    {singles.map(o => (
                      <button
                        key={o.id}
                        className={`selector-btn${selQte === o.id ? ' selected' : ''}`}
                        onClick={() => setSelQte(o.id)}
                      >
                        <span>{o.label}</span>
                        {o.fire_time_seconds && (
                          <span className="selector-sub">@{fmt_time(o.fire_time_seconds)}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )
              })}

            </div>
          </div>

        </div>
      </ContentBox>

      {selDifficulty && selRace && selQte && (
        <ContentBox title="Download">
          {entry ? (
            <div className="download-section">
              <div className="download-filename">{entry.filename}</div>
              <div className="download-meta">
                <span>{diffOpt?.label}</span>
                <span>vs. {raceOpt?.label}</span>
                <span>Timer {fmt_time(entry.timer_seconds)}</span>
              </div>
              <div className="download-events">
                Event:{' '}
                {entry.qtes.length ? entry.qtes.map(q => q.label).join('  +  ') : 'None'}
                {qteOpt?.description && (
                  <span className="download-desc"> — {qteOpt.description}</span>
                )}
              </div>
              <a className="download-btn" href={ensure_slash(DOWNLOAD_BASE) + entry.filename} download={entry.filename}>
                Download Map
              </a>
            </div>
          ) : (
            <p className="err">Map not found — regenerate the manifest.</p>
          )}
        </ContentBox>
      )}

      <ContentBox title="Random Map">
        <p className="random-intro">Pick a difficulty and let the dice decide the rest.</p>
        <div className="random-controls">
          <div className="selector-list random-diff">
            {variables.difficulty.options.map(o => (
              <button
                key={o.id}
                className={`selector-btn${randDifficulty === o.id ? ' selected' : ''}`}
                onClick={() => { setRandDifficulty(o.id); setRandEntry(null) }}
              >
                <span>{o.label}</span>
                <span className="selector-sub">{fmt_time(o.timer_seconds)}</span>
              </button>
            ))}
          </div>
          <button
            className={`roll-btn${!randDifficulty ? ' disabled' : ''}`}
            onClick={rollRandom}
            disabled={!randDifficulty}
          >
            Roll
          </button>
        </div>

        {randEntry && (() => {
          const diffOpt = variables!.difficulty.options.find(o => o.id === randEntry.difficulty)
          const raceOpt = variables!.race.options.find(o => o.id === randEntry.race)
          const qteOpt  = variables!.qte.options.find(o => o.id === randEntry.qte_loadout)
          const eventsStr = randEntry.qtes.length
            ? randEntry.qtes.map(q => q.label).join('  +  ')
            : 'None'
          return (
            <div className="download-section" style={{ marginTop: '1rem' }}>
              <div className="download-filename">{randEntry.filename}</div>
              <div className="download-meta">
                <span>{diffOpt?.label}</span>
                <span>vs. {raceOpt?.label}</span>
                <span>Timer {fmt_time(randEntry.timer_seconds)}</span>
              </div>
              <div className="download-events">
                Event: {eventsStr}
                {qteOpt?.description && (
                  <span className="download-desc"> — {qteOpt.description}</span>
                )}
              </div>
              <div className="random-actions">
                <a className="download-btn" href={ensure_slash(DOWNLOAD_BASE) + randEntry.filename} download={randEntry.filename}>
                  Download Map
                </a>
                <button className="reroll-btn" onClick={rollRandom}>Reroll</button>
              </div>
            </div>
          )
        })()}
      </ContentBox>

      <ContentBox title="Getting Started">
        <p>After downloading:</p>
        <ol>
          <li>Place the .scx file in your StarCraft Maps folder</li>
          <li>Launch StarCraft → Multiplayer → Use Map Settings</li>
          <li>Create or join a game with your selected map</li>
          <li>Invite 1–3 friends for the best co-op experience</li>
        </ol>
      </ContentBox>
    </main>
  )
}
