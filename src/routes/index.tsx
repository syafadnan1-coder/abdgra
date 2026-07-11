import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BRAND, SERVICES, waLink } from "@/lib/brand";
import heroImg from "@/assets/WhatsApp Image 2026-07-04 at 11.48.26 PM (4).jpeg";
import bait from "@/assets/WhatsApp Image 2026-06-10 at 10.51.55 PM.jpeg";
import sawater from "@/assets/WhatsApp Image 2026-07-04 at 11.58.27 PM (1).jpeg";
import pergola from "@/assets/WhatsApp Image 2026-07-04 at 11.58.28 PM (3).jpeg";
import mazallat from "@/assets/WhatsApp Image 2026-07-04 at 11.48.27 PM.jpeg";
import shade1 from "@/assets/WhatsApp Image 2026-07-04 at 11.48.27 PM (4).jpeg";
import pergola2 from "@/assets/WhatsApp Image 2026-07-04 at 11.58.28 PM (4).jpeg";
import bait2 from "@/assets/WhatsApp Image 2026-06-10 at 10.51.54 PM (2).jpeg";
import pergola3 from "@/assets/WhatsApp Image 2026-07-04 at 11.58.28 PM (5).jpeg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نسيم الظل | مظلات، سواتر، بيوت شعر وبرجولات — جدة ومكة والطائف" },
      {
        name: "description",
        content:
          "شركة نسيم الظل: تصميم وتركيب مظلات سيارات، سواتر خصوصية، بيوت شعر تراثية، وبرجولات حدائق بأرقى الخامات في جدة ومكة والطائف. اتصل الآن للحصول على عرض سعر.",
      },
      { property: "og:title", content: "نسيم الظل — أفخم المظلات والسواتر في المنطقة الغربية" },
      { property: "og:description", content: "خبرة، جودة، وضمان. مظلات سيارات، سواتر، بيوت شعر، وبرجولات حدائق." },
    ],
  }),
  component: Home,
});

const IMAGES = [heroImg, mazallat, sawater, pergola, bait, shade1, pergola2, bait2];
function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        size: 3 + Math.random() * 6,
        key: i,
      })),
    [],
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <span
          key={d.key}
          className="particle"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-hero-grad text-sand overflow-hidden">
      <div className="absolute inset-0 arabesque opacity-30" />
      <Particles />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs md:text-sm text-gold-soft mb-6">
          <i className="fa-solid fa-award" /> خبرة تتجاوز 15 عاماً في المنطقة الغربية
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <span className="bg-gold-grad bg-clip-text text-transparent">نسيم الظل</span>
          <br className="md:hidden" />
          <span className="text-sand"> للمظلات وبيوت الشعر والبرجولات</span>
        </h1>
        <p className="mt-6 md:mt-8 max-w-2xl mx-auto text-base md:text-lg text-sand/80 leading-loose">
          {BRAND.tagline}. نحمي ممتلكاتكم بأرقى التصاميم وأجود المواد — مع ضمان شامل وتركيب احترافي في جميع أنحاء جدة ومكة والطائف.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={waLink("مرحباً، أرغب بطلب عرض سعر")} className="inline-flex items-center gap-2 rounded-full bg-gold-grad px-7 py-3.5 text-sm font-extrabold text-ink shadow-gold hover:scale-105 transition-transform">
            <i className="fa-brands fa-whatsapp text-lg" /> اطلب عرض السعر
          </a>
          <a href={`tel:+${BRAND.phone}`} className="inline-flex items-center gap-2 rounded-full border-2 border-gold/60 px-7 py-3.5 text-sm font-bold text-sand hover:bg-gold/10 transition-colors">
            <i className="fa-solid fa-phone" /> {BRAND.phoneDisplay}
          </a>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
          {[
            { n: "+15", t: "سنة خبرة" },
            { n: "+2400", t: "مشروع منفذ" },
            { n: "10", t: "سنوات ضمان" },
          ].map((s) => (
            <div key={s.t} className="text-center">
              <div className="font-display text-3xl md:text-5xl font-bold text-gold">{s.n}</div>
              <div className="text-xs md:text-sm text-sand/70 mt-1">{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

function AutoSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 -mt-6">
      <div className="relative rounded-3xl overflow-hidden shadow-luxe ring-1 ring-gold/20 aspect-[16/9] md:aspect-[21/9] bg-ink">
        <div className="absolute inset-0 flex slider-track" style={{ transform: `translateX(${idx * 100}%)` }}>
          {IMAGES.map((src, i) => (
            <img key={i} src={src} alt={`مشروع ${i + 1}`} className="w-full h-full object-cover flex-shrink-0" loading={i === 0 ? "eager" : "lazy"} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between">
          <div className="text-sand">
            <div className="text-xs md:text-sm text-gold-soft">من معرض أعمالنا</div>
            <div className="font-display text-xl md:text-3xl font-bold">مشاريع منفذة بأعلى جودة</div>
          </div>
          <div className="flex gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`صورة ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-2 bg-sand/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
      <div className="text-center reveal">
        <div className="text-gold text-sm font-bold tracking-widest">خدماتنا</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 gold-underline">تصاميم فاخرة تصنع الفرق</h2>
        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
          نقدم مجموعة متكاملة من الحلول لحماية وتزيين منزلك بأرقى الخامات وأحدث التصاميم.
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <article key={s.slug} className="reveal group bg-card rounded-3xl overflow-hidden shadow-luxe ring-1 ring-border hover:ring-gold/40 transition-all hover:-translate-y-1" style={{ transitionDelay: `${i * 50}ms` }}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={[mazallat, bait, sawater, pergola][i]}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute top-4 right-4 bg-gold-grad text-ink text-xs font-extrabold px-3 py-1.5 rounded-full">
                {s.title}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-loose text-sm md:text-base">{s.long}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {s.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-gold mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink/80 px-5 py-2.5 text-sm font-bold hover:bg-ink hover:text-sand transition-colors"
                >
                  <i className="fa-solid fa-images" /> عرض المزيد من الصور
                </Link>
                <a
                  href={waLink(`مرحباً، أرغب بطلب ${s.title}`)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-grad px-5 py-2.5 text-sm font-extrabold text-ink shadow-gold hover:scale-105 transition-transform"
                >
                  <i className="fa-brands fa-whatsapp" /> اتصل واطلب الآن
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  const items = [
    { img: shade1, city: "جدة", t: "مظلات سيارات" },
    { img: pergola2, city: "مكة", t: "برجولة حديقة" },
    { img: sawater, city: "الطائف", t: "سواتر خصوصية" },
    { img: bait2, city: "جدة", t: "بيت شعر ملكي" },
    { img: heroImg, city: "جدة", t: "مظلات PVC مقوسة" },
    { img: pergola3, city: "مكة", t: "برجولة استراحة" },
    { img: mazallat, city: "جدة", t: "مظلة سيارات فيلا" },
    { img: pergola, city: "مكة", t: "برجولة حديقة" },
    { img: sawater, city: "الطائف", t: "سواتر خصوصية" },
    { img: bait, city: "جدة", t: "بيت شعر ملكي" },
    { img: heroImg, city: "جدة", t: "مظلة PVC مقوسة" },
    { img: pergola, city: "مكة", t: "برجولة استراحة" },
    
  ];
  const [city, setCity] = useState<string>("الكل");
  const filtered = city === "الكل" ? items : items.filter((i) => i.city === city);

  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center reveal">
          <div className="text-gold text-sm font-bold tracking-widest">أعمالنا</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 gold-underline">أحدث المشاريع المنفذة</h2>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["الكل", ...BRAND.cities].map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${city === c ? "bg-gold-grad text-ink border-transparent shadow-gold" : "bg-card border-border hover:border-gold"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3">
          {filtered.map((it, i) => (
            <figure key={i} className="reveal relative overflow-hidden rounded-2xl aspect-square group cursor-pointer shadow-luxe">
              <img src={it.img} alt={it.t} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex flex-col justify-end p-4 opacity-100">
                <div className="text-gold text-xs font-bold">{it.city}</div>
                <div className="text-sand font-bold">{it.t}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantees() {
  const items = [
    { icon: "fa-screwdriver-wrench", t: "صيانة دورية", d: "نضمن لك صيانة دورية مجانية لمدة سنة كاملة بعد التركيب لضمان بقاء منتجك بأفضل حالة." },
    { icon: "fa-hard-hat", t: "تركيب احترافي", d: "فريق تركيب مدرب ومحترف يصل إليك في جميع مناطق جدة ومكة والطائف بسرعة ودقة." },
    { icon: "fa-shield-halved", t: "ضمان الجودة", d: "ضمان شامل يصل إلى 10 سنوات على جميع منتجاتنا مع خدمة ما بعد البيع المتميزة." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
      <div className="text-center reveal">
        <div className="text-gold text-sm font-bold tracking-widest">لماذا نسيم الظل؟</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 gold-underline">التزامنا تجاهك</h2>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {items.map((it, i) => (
          <div key={it.t} className="reveal text-center group" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="mx-auto w-24 h-24 rounded-2xl bg-gold-grad flex items-center justify-center shadow-gold group-hover:rotate-6 transition-transform">
              <i className={`fa-solid ${it.icon} text-3xl text-ink`} />
            </div>
            <h3 className="font-display text-xl font-bold mt-6">{it.t}</h3>
            <p className="mt-3 text-muted-foreground leading-loose">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { icon: "fa-medal", t: "خامات مستوردة", d: "أقمشة PVC ألمانية وهياكل مجلفنة مقاومة للصدأ." },
    { icon: "fa-palette", t: "تصاميم عصرية", d: "فريق تصميم يخصص لكم شكلاً يليق ببيتكم." },
    { icon: "fa-clock", t: "التزام بالوقت", d: "نلتزم بمواعيد التركيب ولا نترككم تنتظرون." },
    { icon: "fa-hand-holding-dollar", t: "أسعار منافسة", d: "جودة عالية بأفضل الأسعار في السوق." },
    { icon: "fa-headset", t: "دعم مستمر", d: "خدمة عملاء متاحة قبل وبعد البيع." },
    { icon: "fa-map-location-dot", t: "تغطية شاملة", d: "جدة، مكة، الطائف وجميع المحافظات المجاورة." },
  ];
  return (
    <section className="bg-ink text-sand py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 arabesque opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center reveal">
          <div className="text-gold text-sm font-bold tracking-widest">مميزاتنا</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 gold-underline">لماذا يختارنا العملاء؟</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {points.map((p, i) => (
            <div key={p.t} className="reveal rounded-2xl border border-gold/20 bg-sand/5 backdrop-blur p-6 hover:border-gold hover:bg-sand/10 transition-all" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="w-12 h-12 rounded-xl bg-gold-grad text-ink flex items-center justify-center mb-4">
                <i className={`fa-solid ${p.icon} text-lg`} />
              </div>
              <h3 className="font-display text-lg font-bold text-gold-soft">{p.t}</h3>
              <p className="mt-2 text-sm text-sand/75 leading-loose">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gold-grad text-ink p-8 md:p-14 shadow-gold">
        <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-ink/20 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div>
            <h3 className="font-display text-3xl md:text-5xl font-bold">جاهزون لتنفيذ مشروعكم؟</h3>
            <p className="mt-3 text-ink/80 text-lg">اتصلوا الآن واحصلوا على معاينة مجانية وعرض سعر مميز.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+${BRAND.phone}`} className="inline-flex items-center gap-2 rounded-full bg-ink text-sand px-7 py-4 text-base font-extrabold hover:scale-105 transition-transform">
              <i className="fa-solid fa-phone" /> {BRAND.phoneDisplay}
            </a>
            <a href={waLink("مرحباً، أرغب بمعاينة مجانية")} className="inline-flex items-center gap-2 rounded-full bg-white/90 text-ink px-7 py-4 text-base font-extrabold hover:scale-105 transition-transform">
              <i className="fa-brands fa-whatsapp text-xl" /> واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <AutoSlider />
      <Services />
      <Portfolio />
      <Guarantees />
      <WhyUs />
      <FinalCTA />
    </>
  );
}
