import { preload } from 'react-dom';
import styles from './ServiceFontResources.module.scss';

export const serviceFontClassName = styles.scope;

// Call before awaiting page data, so text fonts need not wait for streamed UI.
// Medium mono is still available in CSS; it is fetched only when actually used.
export function preloadServiceFonts() {
  preload('/fonts/service/Geologica.c210244b.woff2', {
    as: 'font', type: 'font/woff2', crossOrigin: 'anonymous',
  });
  preload('/fonts/service/IBMPlexMono-Regular.13b16cd7.woff2', {
    as: 'font', type: 'font/woff2', crossOrigin: 'anonymous',
  });
}
