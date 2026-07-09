import s from './IphoneRepairStepsSection.module.scss';

const steps = [
  {
    title: 'Atnes ierīci vai nosūti ar kurjeru',
    text:
      'iPhone vari nodot iLab servisā Rīgā vai nosūtīt ar kurjeru. Pievieno īsu aprakstu par problēmu, lai meistars var sākt ar pareizu pārbaudi.',
  },
  {
    title: 'Veicam diagnostiku',
    text:
      'Pārbaudām bojājuma iemeslu un pasakām, vai pietiek ar tīrīšanu, nepieciešama detaļas maiņa vai dziļāka diagnostika.',
  },
  {
    title: 'Saskaņojam cenu un termiņu',
    text:
      'Pirms darba sākšanas izskaidrojam risinājumu, detaļas variantu, cenu un izpildes termiņu.',
  },
  {
    title: 'Salabojam un pārbaudām',
    text:
      'Veicam remontu, pārbaudām svarīgākās iPhone funkcijas un izsniedzam ierīci ar 90 dienu garantiju.',
  },
];

export default function IphoneRepairStepsSection() {
  return (
    <section
      id="iphone-repair-steps"
      className={s.section}
      aria-labelledby="iphone-repair-steps-title"
    >
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.eyebrow}>Process servisā</span>

          <h2 id="iphone-repair-steps-title">
            Kā notiek <span>iPhone remonts</span>
          </h2>

          <p>
            Vienkāršs process no diagnostikas līdz pārbaudītai ierīcei ar
            garantiju.
          </p>
        </div>

        <div className={s.grid} role="list">
          {steps.map((step, index) => (
            <article className={s.card} key={step.title} role="listitem">
              <div className={s.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className={s.cardCopy}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
