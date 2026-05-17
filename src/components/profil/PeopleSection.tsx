export type Person = {
  initials: string;
  name: string;
  role: string;
  bg?: string; // tailwind bg class
  ink?: string;
};

export function PeopleSection({
  people,
  heading,
  eyebrow = "Anggota",
}: {
  people: Person[];
  heading: string;
  eyebrow?: string;
}) {
  return (
    <section className="bg-white border-t border-black/5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 reveal">
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{eyebrow}</p>
          <h2 className="font-display headline-section max-w-2xl">{heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {people.map((p, i) => (
            <article
              key={p.name + i}
              className={`${p.bg ?? "bg-navy"} ${p.ink ?? "text-paper"} group reveal rounded-2xl p-6 aspect-[3/4] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">{p.role}</p>
              <div className="flex-1 grid place-items-center">
                <span className="font-display text-display-md italic opacity-90 transition-transform duration-700 group-hover:scale-110">
                  {p.initials}
                </span>
              </div>
              <div className="border-t border-current/15 pt-3">
                <p className="font-display text-base leading-snug">{p.name}</p>
                <p className="text-[11px] opacity-70 mt-1">{p.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
