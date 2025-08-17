// app/layout.jsx
import '@/styles/globals.scss';

export const metadata = {
  title: 'iLab',           // placeholder; real meta will come later from Firebase
  description: 'iLab site', // placeholder
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
