export default function SectionHeading({ label, title, intro, align = 'left', id }) {
  return (
    <div className={`section-head${align === 'center' ? ' section-head--center' : ''}`}>
      <span className="label">{label}</span>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
