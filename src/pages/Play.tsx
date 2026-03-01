import { useState, useEffect } from 'react'
import ContentBox from '../components/ContentBox'
import { Link } from 'react-router-dom'

interface Variant {
  id: string
  difficulty: string
  description: string
  timeLimit: string
  downloadUrl: string
}

interface GameMap {
  id: string
  name: string
  version: string
  description: string
  variants: Variant[]
}

interface MapsManifest {
  maps: GameMap[]
}

function Play() {
  const [maps, setMaps] = useState<GameMap[]>([])
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'maps.json')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load maps: ${res.status}`)
        return res.json() as Promise<MapsManifest>
      })
      .then(data => {
        setMaps(data.maps)
        const defaults: Record<string, string> = {}
        for (const map of data.maps) {
          if (map.variants.length > 0) {
            defaults[map.id] = map.variants[0].id
          }
        }
        setSelectedVariants(defaults)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDownload = (map: GameMap) => {
    const variant = map.variants.find(v => v.id === selectedVariants[map.id])
    if (variant) {
      window.open(variant.downloadUrl, '_blank')
    }
  }

  if (loading) {
    return (
      <main className="main-content">
        <ContentBox title="Play BW Co-op">
          <p>Loading maps...</p>
        </ContentBox>
      </main>
    )
  }

  if (error) {
    return (
      <main className="main-content">
        <ContentBox title="Play BW Co-op">
          <p style={{ color: '#ff4444' }}>Error: {error}</p>
        </ContentBox>
      </main>
    )
  }

  return (
    <main className="main-content">
      <ContentBox title="Play BW Co-op">
        <p>Select your preferred game modes and download the maps to get started.</p>
        <p>
          New to BW Co-op? Check out our <Link to="/setup">Setup Guide</Link> for detailed installation instructions.
        </p>
      </ContentBox>

      {maps.map(map => (
        <ContentBox key={map.id} title={`${map.name} ${map.version}`}>
          <p>{map.description}</p>

          <h4>Select Difficulty:</h4>
          <div style={{ marginBottom: '20px' }}>
            {map.variants.map(variant => (
              <div key={variant.id} style={{
                marginBottom: '10px',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: selectedVariants[map.id] === variant.id ? '#e8f4f8' : 'transparent'
              }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name={`gameMode-${map.id}`}
                    value={variant.id}
                    checked={selectedVariants[map.id] === variant.id}
                    onChange={(e) => setSelectedVariants(prev => ({ ...prev, [map.id]: e.target.value }))}
                    style={{ marginRight: '10px', marginTop: '2px' }}
                  />
                  <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{variant.difficulty} Difficulty</h4>
                    <p style={{ margin: '0 0 5px 0', color: '#666' }}>{variant.description}</p>
                    <div style={{ fontSize: '14px', color: '#888' }}>
                      <strong>Time Limit:</strong> {variant.timeLimit}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleDownload(map)}
            style={{
              padding: '16px 24px',
              fontSize: '16px',
              backgroundColor: 'transparent',
              color: '#00ff00',
              border: '1px solid #00ff00',
              borderRadius: '0',
              cursor: 'pointer',
              fontFamily: '"Courier New", monospace',
              width: '100%',
              transition: 'all 0.2s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#00ff00'
              e.currentTarget.style.color = '#000000'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#00ff00'
            }}
          >
            Download {map.variants.find(v => v.id === selectedVariants[map.id])?.difficulty} Version
          </button>
        </ContentBox>
      ))}

      <ContentBox title="Getting Started">
        <p>After downloading your maps:</p>
        <ol>
          <li>Place the .scm files in your StarCraft Maps folder</li>
          <li>Launch StarCraft and go to Multiplayer → Use Map Settings</li>
          <li>Create or join a game with your selected map</li>
          <li>Invite 1-3 friends for the best co-op experience</li>
        </ol>
        <p><em>Communication is key - use voice chat for coordination!</em></p>
      </ContentBox>
    </main>
  )
}

export default Play
