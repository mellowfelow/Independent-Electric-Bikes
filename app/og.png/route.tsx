import { ImageResponse } from 'next/og';
import { SITE, CONTACT } from '@/config/site';

// Served from a path with a file extension so the trailing-slash redirect never applies to social crawlers.
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: SITE.headerDark,
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: SITE.primaryColor, fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>BRUNSWICK, VICTORIA</div>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>{SITE.name}</div>
        <div style={{ display: 'flex', fontSize: 36, color: '#cbd5e1', marginTop: 28 }}>E-bikes, scooters and personal EVs with express Australian freight</div>
        <div style={{ display: 'flex', fontSize: 30, color: SITE.primaryColor, marginTop: 48 }}>{SITE.domain}  |  {CONTACT.phoneDisplay}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
