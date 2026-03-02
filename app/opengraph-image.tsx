import { ImageResponse } from 'next/og'

export const alt = 'Bao Pham — Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-dynamic'

async function getQuoteOfDay(): Promise<{ q: string; a: string } | null> {
  try {
    const res = await fetch('https://zenquotes.io/api/today')
    if (!res.ok) return null
    const data = await res.json()
    return data[0] ?? null
  } catch {
    return null
  }
}

export default async function Image() {
  const quote = await getQuoteOfDay()

  const quoteText = quote
    ? quote.q.length > 90
      ? quote.q.slice(0, 87) + '\u2026'
      : quote.q
    : null

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F7F3EC',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles — top-right, partially off-canvas */}
        <div
          style={{
            position: 'absolute',
            right: '-60px',
            top: '-60px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: '5px solid #D97706',
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-20px',
            top: '-20px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '4px solid #D97706',
            opacity: 0.2,
          }}
        />

        {/* Accent bar */}
        <div
          style={{
            width: '180px',
            height: '8px',
            background: '#D97706',
            marginBottom: '28px',
            borderRadius: '3px',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: 700,
            color: '#1C1917',
            letterSpacing: '-3px',
            lineHeight: 1.0,
            marginBottom: '12px',
          }}
        >
          Bao Pham
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '40px',
            fontWeight: 500,
            color: '#57534E',
            letterSpacing: '2px',
            marginBottom: '36px',
          }}
        >
          Software Engineer
        </div>

        {/* Quote section */}
        {quoteText && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              maxWidth: '880px',
            }}
          >
            {/* Decorative opening quote mark */}
            <div
              style={{
                fontSize: '120px',
                fontWeight: 700,
                color: '#D97706',
                opacity: 0.5,
                lineHeight: 0.7,
                marginRight: '16px',
                marginTop: '-4px',
              }}
            >
              {'\u201C'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 500,
                  color: '#44403C',
                  lineHeight: 1.45,
                  marginBottom: '10px',
                }}
              >
                {quoteText}
              </div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: '#78716C',
                  letterSpacing: '1px',
                }}
              >
                {`\u2014 ${quote!.a}`}
              </div>
            </div>
          </div>
        )}

        {/* Bottom bar — absolutely pinned */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '72px',
            right: '72px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '2px',
              background: '#D5CFCA',
              marginBottom: '16px',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                fontWeight: 600,
                color: '#B45309',
                letterSpacing: '1.5px',
              }}
            >
              phambao.dev
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 500,
                color: '#78716C',
                letterSpacing: '1px',
              }}
            >
              Portfolio
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
