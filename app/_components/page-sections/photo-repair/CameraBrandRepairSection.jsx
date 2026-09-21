import Image from 'next/image';

import s from './PhotoRepairSections.module.scss';

export default function CameraBrandRepairSection({ content }) {
  return (
    <section id="photo-brands" className={s.brandSection} aria-labelledby="photo-brands-title">
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.eyebrow}>{content.eyebrow}</span>
          <h2 id="photo-brands-title">{content.titleStart}<span>{content.titleAccent}</span></h2>
          <p>{content.intro}</p>
        </header>
        <div className={s.brandList}>
          {content.items.map((item) => (
            <article className={s.brandRow} key={item.title}>
              <div className={s.brandIdentity}>
                <Image className={s.brandLogo} src={item.logo} width={230} height={76} alt={item.brand} />
              </div>
              <div className={s.brandCopy}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className={s.familyList}>{item.families.map((family) => <li key={family}>{family}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
