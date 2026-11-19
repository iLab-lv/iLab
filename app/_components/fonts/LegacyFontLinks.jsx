/* eslint-disable @next/next/no-page-custom-font -- Shared App Router root retains protected legacy font loading. */
// Keep the protected shells' original Google Fonts request and hints intact.
export default function LegacyFontLinks() {
  return <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Geologica:CRSV,SHRP,slnt,wght@0..1,0..100,-12..0,100..900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  </>;
}
