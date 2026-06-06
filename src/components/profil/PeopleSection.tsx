export type Person = {
  initials: string;
  name: string;
  role: string;
  bg?: string; // tailwind bg class
  ink?: string;
  foto?: string | null;
};

export function PeopleSection({
  people,
  heading,
  eyebrow = "Anggota",
  cmsPrefix,
  headingKey,
  eyebrowKey,
}: {
  people: Person[];
  heading: string;
  eyebrow?: string;
  /** Jika diisi, name & role tiap kartu jadi editable: `${cmsPrefix}.${i}.name` */
  cmsPrefix?: string;
  headingKey?: string;
  eyebrowKey?: string;
}) {
  return (
    <section className="bg-white border-t border-black/5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 reveal">
          <p data-cms-key={eyebrowKey} data-cms-type={eyebrowKey ? "text" : undefined} className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{eyebrow}</p>
          <h2 data-cms-key={headingKey} data-cms-type={headingKey ? "text" : undefined} className="font-display headline-section max-w-2xl">{heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {people.map((p, i) => (
            <article
              key={p.name + i}
              className={`${p.foto ? "bg-navy text-paper" : `${p.bg ?? "bg-navy"} ${p.ink ?? "text-paper"}`} group reveal relative overflow-hidden rounded-2xl p-6 aspect-[3/4] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {p.foto && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.foto} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
                </>
              )}
              {!p.foto && (
                <div className="flex-1 grid place-items-center">
                  <span className="font-display text-display-md italic opacity-90 transition-transform duration-700 group-hover:scale-110">
                    {p.initials}
                  </span>
                </div>
              )}
              <div className="relative z-10 mt-auto border-t border-current/15 pt-3">
                <p data-cms-key={cmsPrefix ? `${cmsPrefix}.${i}.name` : undefined} data-cms-type={cmsPrefix ? "text" : undefined} data-cms-label={cmsPrefix ? "Nama" : undefined} className="font-display text-base leading-snug">{p.name}</p>
                <p data-cms-key={cmsPrefix ? `${cmsPrefix}.${i}.role` : undefined} data-cms-type={cmsPrefix ? "text" : undefined} data-cms-label={cmsPrefix ? "Jabatan" : undefined} className="text-[11px] opacity-70 mt-1">{p.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
