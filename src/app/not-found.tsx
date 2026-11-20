import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center px-4 py-24 sm:px-8">
      <div className="section-card relative w-full max-w-2xl overflow-hidden p-8 sm:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <p className="section-kicker">Page not found</p>
        <p aria-hidden="true" className="mt-6 text-[clamp(6rem,20vw,11rem)] font-semibold leading-none tracking-tighter text-primary/80">
          404<span className="text-white/20">.</span>
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          A wrong turn. A way forward.
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
          This page may have moved or no longer exists. Head back to the
          portfolio to explore my work, experience, and projects.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/#contact">
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
