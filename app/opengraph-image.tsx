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
    ? quote.q.length > 120
      ? quote.q.slice(0, 117) + '\u2026'
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
          padding: '72px 80px',
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
            border: '3px solid #D97706',
            opacity: 0.15,
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
            border: '2px solid #D97706',
            opacity: 0.1,
          }}
        />

        {/* Accent bar — wider for thumbnail visibility */}
        <div
          style={{
            width: '140px',
            height: '6px',
            background: '#D97706',
            marginBottom: '36px',
            borderRadius: '3px',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: '76px',
            fontWeight: 700,
            color: '#1C1917',
            letterSpacing: '-2.5px',
            lineHeight: 1.05,
            marginBottom: '16px',
          }}
        >
          Bao Pham
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 400,
            color: '#57534E',
            letterSpacing: '1px',
            marginBottom: '48px',
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
              maxWidth: '780px',
            }}
          >
            {/* Large decorative opening quote mark */}
            <div
              style={{
                fontSize: '96px',
                fontWeight: 700,
                color: '#D97706',
                opacity: 0.4,
                lineHeight: 0.8,
                marginRight: '12px',
                marginTop: '-8px',
              }}
            >
              {'\u201C'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 400,
                  color: '#57534E',
                  lineHeight: 1.6,
                  marginBottom: '8px',
                }}
              >
                {quoteText}
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#A8A29E',
                  letterSpacing: '0.5px',
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
            bottom: '72px',
            left: '80px',
            right: '80px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#D5CFCA',
              marginBottom: '20px',
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
                fontSize: '20px',
                fontWeight: 500,
                color: '#D97706',
                letterSpacing: '1px',
              }}
            >
              phambao.dev
            </div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 400,
                color: '#A8A29E',
                letterSpacing: '0.5px',
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
