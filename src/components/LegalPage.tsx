import Link from "next/link";

type Section = { title: string; text: string };

export default function LegalPage({ title, introduction, sections }: {
  title: string;
  introduction: string;
  sections: Section[];
}) {
  return <>
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-8 md:pt-12">
      <article className="section-card">
        <Link href="/" className="text-sm text-primary hover:underline">Back to Portfolio</Link>
        <p className="section-kicker mt-8">Legal</p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: November 20, 2026</p>
        <p className="mt-6 leading-8 text-muted-foreground">{introduction}</p>
        <div className="mt-10 space-y-8">
          {sections.map((section, index) => <section key={section.title}>
            <h2 className="text-xl font-semibold text-white">{index + 1}. {section.title.replace(/^\d+\.\s*/, "")}</h2>
            <p className="mt-3 leading-8 text-muted-foreground">{section.text}</p>
          </section>)}
        </div>
      </article>
    </div>
  </>;
}
