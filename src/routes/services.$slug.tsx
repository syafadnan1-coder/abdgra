import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BRAND, SERVICES, getService, waLink } from "@/lib/brand";
import bait from "@/assets/WhatsApp Image 2026-06-10 at 10.51.54 PM.jpeg";
import sawater from "@/assets/WhatsApp Image 2026-07-04 at 11.53.58 PM (2).jpeg";
import pergola from "@/assets/WhatsApp Image 2026-07-04 at 11.58.27 PM (3).jpeg";
import mazallat from "@/assets/WhatsApp Image 2026-07-04 at 11.48.27 PM.jpeg";
import hero from "@/assets/WhatsApp Image 2026-07-04 at 11.48.26 PM (3).jpeg";

const IMG: Record<string, string> = {
  "car-shades": mazallat,
  "bait-shaar": bait,
  "sawater": sawater,
  "pergolas": pergola,
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { service: s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "غير متوفر" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    return {
      meta: [
        { title: `${s.title} — نسيم الظل | جدة، مكة، الطائف` },
        { name: "description", content: s.short },
        { property: "og:title", content: `${s.title} — نسيم الظل` },
        { property: "og:description", content: s.short },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">الخدمة غير موجودة</h1>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-gold-grad px-6 py-3 text-ink font-bold">الرئيسية</Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const gallery = [IMG[service.slug], hero, mazallat, sawater, pergola, bait];
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative bg-hero-grad text-sand py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 arabesque opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-sm text-gold-soft mb-3">
            <Link to="/" className="hover:text-gold">الرئيسية</Link> <span className="mx-1">/</span> {service.title}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            <span className="bg-gold-grad bg-clip-text text-transparent">{service.title}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sand/80 leading-loose">{service.long}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Gallery */}
        <div>
          <div className="rounded-3xl overflow-hidden shadow-luxe aspect-[4/3] bg-ink">
            <img src={gallery[active]} alt={service.title} className="w-full h-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-square rounded-lg overflow-hidden ring-2 transition-all ${i === active ? "ring-gold" : "ring-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Video */}
          <div className="mt-8 aspect-video rounded-3xl bg-ink text-sand grid place-items-center relative overflow-hidden shadow-luxe">
            <img src={IMG[service.slug]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="relative text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gold-grad text-ink flex items-center justify-center shadow-gold">
                <i className="fa-solid fa-play text-xl" />
              </div>
              <div className="mt-3 font-display font-bold">فيديو تعريفي — قريباً</div>
            </div>
          </div>

          {/* Specs */}
          <div className="mt-8">
            <h2 className="font-display text-2xl font-bold mb-4">جدول المواصفات</h2>
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm md:text-base">
                <tbody>
                  {service.specs.map((r: { label: string; value: string }, i: number) => (
                    <tr key={r.label} className={i % 2 ? "bg-secondary/50" : ""}>
                      <td className="p-4 font-bold text-ink w-1/3">{r.label}</td>
                      <td className="p-4 text-muted-foreground">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quote form */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="rounded-3xl bg-card border border-gold/30 shadow-luxe p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold">اطلب عرض سعر</h2>
            <p className="text-sm text-muted-foreground mt-1">نرد عليك خلال أقل من ساعة</p>

            {sent ? (
              <div className="mt-6 rounded-2xl bg-gold-soft/40 p-6 text-center">
                <i className="fa-solid fa-circle-check text-3xl text-gold" />
                <div className="font-bold mt-2">تم إرسال طلبك بنجاح!</div>
                <div className="text-sm text-muted-foreground mt-1">سنتواصل معكم في أقرب وقت.</div>
              </div>
            ) : (
              <form
                className="mt-5 space-y-3"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <input required placeholder="الاسم الكامل" className="w-full rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold" />
                <input required type="tel" placeholder="رقم الجوال" className="w-full rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold" />
                <select required className="w-full rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold">
                  <option value="">اختر المدينة</option>
                  {BRAND.cities.map((c) => <option key={c}>{c}</option>)}
                </select>
                <textarea placeholder="تفاصيل الطلب (المقاسات، اللون، الموقع)" rows={4} className="w-full rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold" />
                <button className="w-full rounded-full bg-gold-grad text-ink font-extrabold py-3.5 shadow-gold hover:scale-[1.02] transition-transform">
                  إرسال الطلب
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border grid gap-2 text-sm">
              <a href={`tel:+${BRAND.phone}`} className="flex items-center gap-2 hover:text-gold">
                <i className="fa-solid fa-phone text-gold" /> {BRAND.phoneDisplay}
              </a>
              <a href={waLink(`مرحباً، أرغب بطلب ${service.title}`)} className="flex items-center gap-2 hover:text-gold">
                <i className="fa-brands fa-whatsapp text-gold" /> واتساب مباشر
              </a>
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-sand py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">خدمات ذات صلة</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-2xl overflow-hidden bg-card shadow-luxe">
                <div className="aspect-video overflow-hidden">
                  <img src={IMG[s.slug]} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="font-bold">{s.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.short}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
