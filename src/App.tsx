import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Studio } from './components/Studio';
import { Pricing } from './components/Pricing';
import { DrumGame } from './components/DrumGame';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SectionTransition } from './components/SectionTransition';
import { YandexMetrika } from './components/YandexMetrika';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Set document title
    document.title = 'Уроки барабанов в Москве | Николай Бокарев - профессиональный преподаватель барабанов для детей и взрослых | Chayka Studio';
    
    // Set viewport meta tag if not exists
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    
    // Set charset meta tag
    let charset = document.querySelector('meta[charset]');
    if (!charset) {
      charset = document.createElement('meta');
      charset.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(charset, document.head.firstChild);
    }
    
    // Set meta tags
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags - улучшенные для SEO
    setMetaTag('description', 'Уроки барабанов в Москве от профессионального преподавателя Николая Бокарева. 5+ лет опыта, 150+ учеников, индивидуальный подход. Обучение игре на барабанах для детей и взрослых в студии Chayka Studio на Ленинградском проспекте и выездные занятия. Первое занятие 1500₽, скидка 50% при прохождении игры!');
    setMetaTag('keywords', 'уроки барабанов москва, школа барабанов москва, обучение игре на барабанах, преподаватель барабанов, барабаны для детей, барабаны для взрослых, индивидуальные уроки барабанов, николай бокарев, барабанщик москва, научиться играть на барабанах, курсы барабанов, chayka studio, ленинградский проспект, выездные уроки барабанов, барабанная установка, drum lessons moscow, частный преподаватель барабанов');
    
    // Open Graph - улучшенные
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', 'https://nikolai-bokarev-drums.ru/', true);
    setMetaTag('og:title', 'Уроки барабанов в Москве | Николай Бокарев - преподаватель барабанов', true);
    setMetaTag('og:description', 'Профессиональные уроки барабанов для детей и взрослых в Москве. 5+ лет опыта, индивидуальный подход. Первое занятие 1500₽, скидка 50%!', true);
    setMetaTag('og:image', 'https://nikolai-bokarev-drums.ru/images/hero-photo.png', true);
    setMetaTag('og:locale', 'ru_RU', true);
    setMetaTag('og:site_name', 'Школа барабанов Николая Бокарева', true);
    
    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:url', 'https://nikolai-bokarev-drums.ru/');
    setMetaTag('twitter:title', 'Уроки барабанов в Москве | Николай Бокарев');
    setMetaTag('twitter:description', 'Профессиональные уроки барабанов для детей и взрослых в Москве. Первое занятие 1500₽');
    setMetaTag('twitter:image', 'https://nikolai-bokarev-drums.ru/images/hero-photo.png');
    
    // Additional SEO meta tags
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('googlebot', 'index, follow');
    setMetaTag('author', 'Николай Бокарев');
    setMetaTag('geo.region', 'RU-MOW');
    setMetaTag('geo.placename', 'Москва');
    setMetaTag('geo.position', '55.799806;37.530822');
    setMetaTag('ICBM', '55.799806, 37.530822');
    setMetaTag('language', 'Russian');
    setMetaTag('revisit-after', '7 days');
    setMetaTag('rating', 'general');
    setMetaTag('distribution', 'global');

    // Set HTML lang attribute
    document.documentElement.lang = 'ru';

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://nikolai-bokarev-drums.ru/';

    // Add alternate hreflang
    let hreflang = document.querySelector('link[rel="alternate"][hreflang="ru"]') as HTMLLinkElement;
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = 'ru';
      document.head.appendChild(hreflang);
    }
    hreflang.href = 'https://nikolai-bokarev-drums.ru/';

    // Add favicon
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/x-icon';
      document.head.appendChild(favicon);
    }
    favicon.href = '/favicon.ico';

    // Add multiple JSON-LD structured data schemas
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Schema 1: Music School with detailed information
    const musicSchoolSchema = {
      "@context": "https://schema.org",
      "@type": "MusicSchool",
      "name": "Школа барабанов Николая Бокарева",
      "alternateName": "Николай Бокарев - Уроки барабанов",
      "description": "Профессиональная школа барабанов в Москве. Индивидуальные уроки для детей и взрослых с 5-летним опытом преподавания. Обучение в студии Chayka Studio и выездные занятия.",
      "url": "https://nikolai-bokarev-drums.ru",
      "telephone": "+79019069119",
      "email": "bn-school@yandex.ru",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ленинградский проспект, 47, стр. 4",
        "addressLocality": "Москва",
        "addressRegion": "Москва",
        "postalCode": "125167",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "55.799806",
        "longitude": "37.530822"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "21:00"
      },
      "priceRange": "1500-21000 RUB",
      "paymentAccepted": "Cash, Card, Bank Transfer",
      "currenciesAccepted": "RUB",
      "image": "https://nikolai-bokarev-drums.ru/images/hero-photo.png",
      "logo": "https://nikolai-bokarev-drums.ru/logo.png",
      "sameAs": [
        "https://t.me/nikolaibokarev",
        "https://wa.me/79019069119"
      ],
      "areaServed": {
        "@type": "City",
        "name": "Москва"
      },
      "founder": {
        "@type": "Person",
        "@id": "https://nikolai-bokarev-drums.ru/#nikolai-bokarev",
        "name": "Николай Бокарев",
        "jobTitle": "Преподаватель барабанов",
        "description": "Профессиональный преподаватель барабанов с более чем 5-летним опытом. Обучил более 150 учеников, участвовал в 100+ выступлениях.",
        "image": "https://nikolai-bokarev-drums.ru/images/profile-photo.png",
        "url": "https://nikolai-bokarev-drums.ru",
        "telephone": "+79019069119",
        "email": "bn-school@yandex.ru",
        "worksFor": {
          "@type": "MusicSchool",
          "name": "Школа барабанов Николая Бокарева"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Уроки барабанов",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Первое занятие по барабанам",
              "description": "Пробный урок игры на барабанах длительностью 60 минут. Подходит для детей и взрослых любого уровня подготовки.",
              "provider": {
                "@type": "Person",
                "name": "Николай Бокарев"
              }
            },
            "price": "1500",
            "priceCurrency": "RUB",
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01",
            "priceValidUntil": "2026-12-31",
            "url": "https://nikolai-bokarev-drums.ru/#pricing"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Абонемент на 4 занятия по барабанам",
              "description": "Абонемент на 4 индивидуальных урока игры на барабанах. Срок действия 1 месяц.",
              "provider": {
                "@type": "Person",
                "name": "Николай Бокарев"
              }
            },
            "price": "11000",
            "priceCurrency": "RUB",
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01",
            "priceValidUntil": "2026-12-31",
            "url": "https://nikolai-bokarev-drums.ru/#pricing"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Абонемент на 8 занятий по барабанам",
              "description": "Абонемент на 8 индивидуальных уроков игры на барабанах со скидкой. Срок действия 2 месяца.",
              "provider": {
                "@type": "Person",
                "name": "Николай Бокарев"
              }
            },
            "price": "21000",
            "priceCurrency": "RUB",
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01",
            "priceValidUntil": "2026-12-31",
            "url": "https://nikolai-bokarev-drums.ru/#pricing"
          }
        ]
      }
    };

    // Schema 2: Person (Teacher)
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://nikolai-bokarev-drums.ru/#nikolai-bokarev",
      "name": "Николай Бокарев",
      "givenName": "Николай",
      "familyName": "Бокарев",
      "jobTitle": "Преподаватель барабанов",
      "description": "Профессиональный преподаватель барабанов в Москве. Более 5 лет опыта преподавания, 150+ довольных учеников, 100+ выступлений. Индивидуальный подход к каждому ученику.",
      "image": "https://nikolai-bokarev-drums.ru/images/profile-photo.png",
      "url": "https://nikolai-bokarev-drums.ru",
      "telephone": "+79019069119",
      "email": "bn-school@yandex.ru",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Москва",
        "addressCountry": "RU"
      },
      "sameAs": [
        "https://t.me/nikolaibokarev",
        "https://wa.me/79019069119"
      ],
      "knowsAbout": [
        "Барабаны",
        "Ударные инструменты",
        "Музыкальное образование",
        "Ритм",
        "Музыкальная педагогика"
      ],
      "alumniOf": "Музыкальное образование",
      "worksFor": {
        "@type": "MusicSchool",
        "name": "Школа барабанов Николая Бокарева"
      }
    };

    // Schema 3: BreadcrumbList
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Главная",
          "item": "https://nikolai-bokarev-drums.ru/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "О преподавателе",
          "item": "https://nikolai-bokarev-drums.ru/#about"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Студия",
          "item": "https://nikolai-bokarev-drums.ru/#studio"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Цены",
          "item": "https://nikolai-bokarev-drums.ru/#pricing"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Контакты",
          "item": "https://nikolai-bokarev-drums.ru/#contact"
        }
      ]
    };

    // Schema 4: LocalBusiness
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Chayka Studio - Уроки барабанов",
      "description": "Студия для индивидуальных уроков барабанов в Москве",
      "image": "https://nikolai-bokarev-drums.ru/images/studio.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ленинградский проспект, 47, стр. 4",
        "addressLocality": "Москва",
        "postalCode": "125167",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "55.799806",
        "longitude": "37.530822"
      },
      "url": "https://nikolai-bokarev-drums.ru/#studio",
      "telephone": "+79019069119",
      "priceRange": "1500-21000 RUB"
    };

    // Add all schemas
    const schemas = [musicSchoolSchema, personSchema, breadcrumbSchema, localBusinessSchema];
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      script.setAttribute('data-schema-index', index.toString());
      document.head.appendChild(script);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-blue-50/30 to-amber-50/30 relative">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <About />
      <SectionTransition />
      <Gallery />
      <SectionTransition />
      <Studio />
      <SectionTransition />
      <Pricing />
      <SectionTransition />
      <DrumGame />
      <Contact />
      <YandexMetrika />
    </div>
  );
}