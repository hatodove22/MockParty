import { responsibilitySections, safetyNotice } from '../data/responsibility';

export function SafetyPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <section className="max-w-3xl">
        <h1 className="text-3xl font-black md:text-5xl">Safety and responsibility</h1>
        <p className="mt-4 text-lg leading-8 text-navy/70">{safetyNotice}</p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {responsibilitySections.map((section) => (
          <article key={section.title} className="mock-surface rounded-lg p-5">
            <h2 className="text-xl font-black">{section.title}</h2>
            <ul className="mt-4 grid gap-2">
              {section.items.map((item) => (
                <li key={item} className="rounded-md bg-neutralPanel p-3 text-sm font-semibold text-navy/70">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
