import { ImageResponse } from 'next/og'

export const alt = 'Bao Pham — Creative Frontend Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F7F3EC',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Amber accent bar */}
        <div
          style={{
            width: '64px',
            height: '6px',
            background: '#D97706',
            marginBottom: '40px',
            borderRadius: '3px',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: '700',
            color: '#1C1917',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}
        >
          Bao Pham
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: '400',
            color: '#57534E',
            letterSpacing: '0.5px',
            marginBottom: '60px',
          }}
        >
          Creative Frontend Engineer
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: '22px',
            fontWeight: '500',
            color: '#D97706',
            letterSpacing: '1px',
          }}
        >
          phambao.dev
        </div>

        {/* Decorative corner element */}
        <div
          style={{
            position: 'absolute',
            right: '80px',
            bottom: '80px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '3px solid #D97706',
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '110px',
            bottom: '110px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '3px solid #D97706',
            opacity: 0.15,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
