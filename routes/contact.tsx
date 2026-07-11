import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BRAND, waLink } from "@/lib/brand";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "اتصل بنا — نسيم الظل | جدة، مكة، الطائف" },
      { name: "description", content: "تواصل مع نسيم الظل للمظلات والسواتر والبرجولات. اتصال، واتساب، ونموذج طلب سريع. نغطي جدة، مكة والطائف." },
      { property: "og:title", content: "اتصل بنا — نسيم الظل" },
      { property: "og:description", content: "احصل على معاينة مجانية وعرض سعر خلال ساعة." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="bg-hero-grad text-sand py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 arabesque opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            <span className="bg-gold-grad bg-clip-text text-transparent">اتصل بنا</span>
          </h1>
          <p className="mt-4 text-sand/80 max-w-2xl mx-auto">
            نحن هنا لخدمتكم في جميع أنحاء جدة ومكة والطائف — تواصلوا معنا بالطريقة الأنسب لكم.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-14 grid gap-10 lg:grid-cols-3">
        {[
          { icon: "fa-phone", t: "اتصل بنا", v: BRAND.phoneDisplay, href: `tel:+${BRAND.phone}` },
          { icon: "fa-whatsapp", brand: true, t: "واتساب", v: BRAND.phoneDisplay, href: waLink("مرحباً") },
          { icon: "fa-location-dot", t: "مواقعنا", v: BRAND.cities.join(" • "), href: "#map" },
        ].map((c) => (
          <a key={c.t} href={c.href} className="reveal group rounded-3xl bg-card border border-border p-8 text-center shadow-luxe hover:border-gold hover:-translate-y-1 transition-all">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gold-grad text-ink flex items-center justify-center shadow-gold group-hover:rotate-6 transition-transform">
              <i className={`${c.brand ? "fa-brands" : "fa-solid"} ${c.icon} text-2xl`} />
            </div>
            <div className="font-display text-lg font-bold mt-4">{c.t}</div>
            <div className="text-muted-foreground text-sm mt-1" dir="ltr">{c.v}</div>
          </a>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-20 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-card border border-border p-6 md:p-10 shadow-luxe">
          <h2 className="font-display text-2xl md:text-3xl font-bold gold-underline text-right">أرسل لنا رسالة</h2>
          {sent ? (
            <div className="mt-8 rounded-2xl bg-gold-soft/40 p-8 text-center">
              <i className="fa-solid fa-circle-check text-4xl text-gold" />
              <div className="font-bold mt-3 text-lg">تم استلام رسالتك!</div>
              <div className="text-sm text-muted-foreground mt-1">سنتواصل معكم خلال ساعة عمل.</div>
            </div>
          ) : (
            <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="الاسم" className="rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold" />
                <input required type="tel" placeholder="الجوال" className="rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              </div>
              <input type="email" placeholder="البريد الإلكتروني (اختياري)" className="w-full rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <select required className="w-full rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold">
                <option value="">نوع الخدمة</option>
                <option>مظلات سيارات</option>
                <option>سواتر</option>
                <option>بيوت شعر</option>
                <option>برجولات</option>
              </select>
              <textarea required rows={5} placeholder="تفاصيل طلبك" className="w-full rounded-lg border border-input px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <button className="w-full rounded-full bg-gold-grad text-ink font-extrabold py-3.5 shadow-gold hover:scale-[1.02] transition-transform">
                إرسال
              </button>
            </form>
          )}
        </div>

        <div id="map" className="rounded-3xl overflow-hidden shadow-luxe min-h-[400px] border border-border">
          <iframe
            title="موقعنا على الخريطة"
            src="https://www.google.com/maps?q=Jeddah,Saudi+Arabia&output=embed"
            className="w-full h-full min-h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
