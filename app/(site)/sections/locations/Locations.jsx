// app/(site)/sections/home/Locations.jsx
import s from './Locations.module.scss';
import LocationsMap from '@/(site)/components/locations-map/LocationsMap';

export default function Locations({
  id = 'locations',
  title = 'Servisa centri Rīgā',
  images = {
    alt: 'Rīga — iLab lokācijas',
    small: '/images/map-1024.webp',
    medium: '/images/map-1600.webp',
    large: '/images/map-3000.webp',
  },
  pins = [
    { id: 'domina', label: 'Domina Shopping', xPct: 68, yPct: 40, gmaps: 'https://maps.google.com/?q=Ieriķu iela 3 Rīga', tel: 'tel:23370088' },
    { id: 'spice',  label: 'Spice Home',       xPct: 30, yPct: 60, gmaps: 'https://maps.google.com/?q=Jaunmoku iela 13 Rīga', tel: 'tel:20887787' },
  ],
  locations = [
    {
      id: 'domina',
      title: 'Domina Shopping',
      address: 'Ieriķu iela 3, Rīga',
      hours: 'Mon–Sun 10:00–21:00',
      tel: 'tel:23370088',
      gmaps: 'https://maps.google.com/?q=Ieriķu iela 3 Rīga',
    },
    {
      id: 'spice',
      title: 'Spice Home',
      address: 'Jaunmoku iela 13, Rīga',
      hours: 'Mon–Sat 10:00–21:00, Sun 10:00–20:00',
      tel: 'tel:20887787',
      gmaps: 'https://maps.google.com/?q=Jaunmoku iela 13 Rīga',
    },
  ],
}) {
  return (
    <section id={id} className={`${s.section} ${s.locations}`} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>{title}</h2>

        <LocationsMap images={images} pins={pins} locations={locations} />
      </div>
    </section>
  );
}
