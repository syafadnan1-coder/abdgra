import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logoImg from "../assets/logo.png";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BRAND, SERVICES, waLink } from "../lib/brand";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الرابط الذي تبحث عنه غير متوفر أو تم نقله.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center rounded-md bg-gold-grad px-5 py-2.5 text-sm font-bold text-ink shadow-gold">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">حدث خطأ غير متوقع</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          يمكنك المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center rounded-md bg-gold-grad px-4 py-2 text-sm font-bold text-ink shadow-gold"
          >
            حاول مجدداً
          </button>
          <a href="/" className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium">
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "نسيم الظل | مظلات سيارات، سواتر منازل، بيوت شعر،وبرجولات حدائق— جدة ومكة" },
      {
        name: "description",
        content:
          "نسيم الظل للمظلات والسواتر والبرجولات: تركيب مظلات سيارات، بيوت شعر، سواتر، وبرجولات حدائق بأجود الخامات وتصاميم عصرية في جدة ومكة والطائف. اتصل: +966534243758",
      },
    { name: 'keywords', content: 'مظلات سيارات, برجولات حدائق, بيوت شعر ملكية, تركيب مظلات, سواتر, هناجر, مظلات وسواتر, قرميد' },
      { name: "keywords", content: "مظلات سيارات جدة, سواتر مكة, بيوت شعر الطائف, برجولات حدائق, مظلات مواقف, نسيم الظل " },
      { name: 'robots', content: 'index, follow' },
      { name: "author", content: "نسيم الظل" },
      { name: "theme-color", content: "#d4a24a" },
      { property: "og:site_name", content: "نسيم الظل" },
      { property: "og:title", content: "نسيم الظل — للمظلات وسواتر وبرجولات الحدائق الفاخرة" },
      { property: "og:description", content: "أحدث تصاميم مظلات السيارات، برجولات الحدائق، وبيوت الشعر الملكية الفاخرة بأسعار تنافسية وضمان طويل." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_SA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'نسيم الظل للمظلات وسواتر | مظلات سيارات وبرجولات' },
    { name: 'twitter:description', content: 'أحدث تصاميم مظلات السيارات، برجولات الحدائق، وبيوت الشعر الملكية الفاخرة بأسعار تنافسية وضمان طويل.' }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Amiri:wght@700&display=swap" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<null | "cats" | "prods">(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-sand text-xs md:text-sm overflow-hidden border-b border-gold/20">
        <div className="marquee-track flex gap-16 whitespace-nowrap py-2 w-max">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16">
              <span><i className="fa-solid fa-bolt text-gold ms-2" /> عرض خاص: خصم يصل إلى 20% على مظلات السيارات لفترة محدودة</span>
              <span><i className="fa-solid fa-truck-fast text-gold ms-2" /> معاينة وتركيب في جدة، مكة، الطائف</span>
              <span><i className="fa-solid fa-shield-halved text-gold ms-2" /> ضمان يصل إلى 10 سنوات على المنتجات</span>
            </div>
          ))}
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-background/85 backdrop-blur-lg shadow-luxe" : "bg-background/60 backdrop-blur"} border-b border-border/60`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Right: Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white ring-2 ring-gold/40 shadow-gold flex items-center justify-center overflow-hidden">
              <img src={logoImg} alt="شعار نسيم الظل - مظلات سيارات" className="w-full h-full object-contain p-1" width={64} height={64} />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg md:text-xl font-bold text-gold">{BRAND.short}</div>
              <div className="text-[10px] md:text-[11px] text-muted-foreground tracking-wide">للمظلات • السواتر • البرجولات</div>
            </div>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-2">
            <div className="relative" onMouseEnter={() => setDrop("cats")} onMouseLeave={() => setDrop(null)}>
              <button className="px-4 py-2 text-sm font-bold hover:text-gold flex items-center gap-1">
                كل تصنيفاتنا <i className="fa-solid fa-chevron-down text-[10px] mt-0.5" />
              </button>
              {drop === "cats" && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-luxe p-2">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block px-3 py-2 rounded-lg hover:bg-gold-soft/40 text-sm font-medium">
                      <i className="fa-solid fa-angle-left text-gold ms-2" />{s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={() => setDrop("prods")} onMouseLeave={() => setDrop(null)}>
              <button className="px-4 py-2 text-sm font-bold hover:text-gold flex items-center gap-1">
                منتجاتنا <i className="fa-solid fa-chevron-down text-[10px] mt-0.5" />
              </button>
              {drop === "prods" && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-luxe p-2">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block px-3 py-2 rounded-lg hover:bg-gold-soft/40 text-sm font-medium">
                      <i className="fa-solid fa-angle-left text-gold ms-2" />{s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="mr-2 inline-flex items-center gap-2 rounded-full bg-gold-grad px-5 py-2.5 text-sm font-extrabold text-ink shadow-gold hover:scale-105 transition-transform">
              <i className="fa-solid fa-phone-volume" /> اتصل بنا
            </Link>
          </nav>

          {/* Mobile */}
          <button className="lg:hidden w-10 h-10 rounded-lg border border-border" onClick={() => setOpen((v) => !v)} aria-label="القائمة">
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-4 py-3 flex flex-col gap-1">
              <div className="text-xs font-bold text-gold mt-2 mb-1">التصنيفات</div>
              {SERVICES.map((s) => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium">
                  {s.title}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="mt-3 inline-flex justify-center items-center gap-2 rounded-full bg-gold-grad px-5 py-3 text-sm font-extrabold text-ink shadow-gold">
                <i className="fa-solid fa-phone-volume" /> اتصل بنا الآن
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-sand relative overflow-hidden">
      <div className="absolute inset-0 arabesque opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-grad flex items-center justify-center">
              <i className="fa-solid fa-umbrella-beach text-ink" />
            </div>
            <div className="font-display text-xl font-bold">{BRAND.short}</div>
          </div>
          <p className="mt-4 text-sm text-sand/70 leading-7">
            {BRAND.name} — خبرة سنوات في تركيب المظلات والسواتر والبرجولات بأرقى الخامات وأدق التفاصيل.
          </p>
        </div>
        <div>
          <h4 className="text-gold font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">الرئيسية</Link></li>
            {SERVICES.map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-gold">{s.title}</Link></li>
            ))}
            <li><Link to="/contact" className="hover:text-gold">اتصل بنا</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold font-bold mb-4">تواصل معنا</h4>
          <ul className="space-y-3 text-sm">
            <li><a href={`tel:+${BRAND.phone}`} className="flex items-center gap-2 hover:text-gold"><i className="fa-solid fa-phone text-gold" /> {BRAND.phoneDisplay}</a></li>
            <li><a href={waLink("مرحباً، أرغب بالاستفسار عن خدماتكم")} className="flex items-center gap-2 hover:text-gold"><i className="fa-brands fa-whatsapp text-gold" /> واتساب مباشر</a></li>
            <li className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-gold" /> جدة • مكة المكرمة • الطائف</li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold font-bold mb-4">النشرة البريدية</h4>
          <p className="text-sm text-sand/70 mb-3">اشترك ليصلك جديد العروض والتصاميم.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("تم الاشتراك بنجاح!"); }} className="flex gap-2">
            <input type="email" required placeholder="بريدك الإلكتروني" className="flex-1 rounded-lg bg-sand/10 border border-sand/20 px-3 py-2 text-sm placeholder:text-sand/50 focus:outline-none focus:border-gold" />
            <button className="rounded-lg bg-gold-grad px-4 text-ink font-bold text-sm"><i className="fa-solid fa-paper-plane" /></button>
          </form>
        </div>
      </div>
      <div className="relative border-t border-sand/10 py-5 text-center text-xs text-sand/60">
        © {new Date().getFullYear()} {BRAND.name}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <>
      <a
        href={waLink("مرحباً، أرغب بطلب عرض سعر")}
        target="_blank"
        rel="noopener"
        aria-label="واتساب"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-luxe flex items-center justify-center hover:scale-110 transition-transform"
      >
        <i className="fa-brands fa-whatsapp text-2xl" />
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
      </a>
      <a
        href={`tel:+${BRAND.phone}`}
        aria-label="اتصل بنا"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gold-grad text-ink shadow-gold flex items-center justify-center hover:scale-110 transition-transform"
      >
        <i className="fa-solid fa-phone text-xl" />
        <span className="absolute inset-0 rounded-full animate-ping bg-gold/40" />
      </a>
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Simple reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingButtons />
    </QueryClientProvider>
  );
}
