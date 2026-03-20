# Solea Sora

Ecommerce editorial de skincare construido con Next.js, Sanity y Stripe.

## Stack

- Next.js 16 + App Router
- React 19
- TypeScript
- Sanity CMS + Sanity Studio
- Stripe Checkout
- GSAP para animaciones
- Zustand para carrito

## Funcionalidades

- Homepage con hero multimedia y bloques editoriales
- Catalogo de productos conectado a Sanity
- Paginas de detalle de producto
- Carrito lateral
- Checkout con Stripe
- Webhook base para eventos de pago
- Sanity Studio embebido en `/studio`

## Requisitos

- Node.js 20+
- pnpm recomendado
- Proyecto de Sanity configurado
- Cuenta de Stripe para checkout

## Instalacion

```bash
pnpm install
```

Crea un archivo `.env.local` con estas variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-18
NEXT_PUBLIC_SANITY_API_TOKEN=tu_token_si_hace_falta

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Desarrollo

```bash
pnpm dev
```

App: `http://localhost:3000`  
Studio: `http://localhost:3000/studio`

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Estructura

```text
src/
  app/
    (shop)/               Rutas publicas de la tienda
    api/checkout/         Creacion de sesion de Stripe
    api/webhooks/stripe/  Webhook de Stripe
    studio/               Sanity Studio embebido
  components/
    home/                 Secciones de homepage
    product/              UI de catalogo y producto
    cart/                 Carrito lateral
    layout/               Navbar, footer, wrappers
  hooks/                  Estado del carrito, scroll, tema
  lib/                    Utilidades generales
  sanity/
    lib/                  Cliente y queries GROQ
    schemaTypes/          Esquemas del CMS
```

## Sanity

El proyecto usa contenido desde:

- `siteSettings` para configuracion global
- `homePage` para bloques de homepage
- `product` para catalogo y paginas de producto
- `aboutPage`, `contactPage`, `legalPage`, `blogPost`, `faq` para paginas editoriales

Archivos principales:

- [`src/sanity/lib/queries.ts`](/home/yuyay/Code/benitoanagua/solea-sora/src/sanity/lib/queries.ts)
- [`src/sanity/schemaTypes/`](/home/yuyay/Code/benitoanagua/solea-sora/src/sanity/schemaTypes)
- [`sanity.config.ts`](/home/yuyay/Code/benitoanagua/solea-sora/sanity.config.ts)

## Stripe

Checkout:

- Endpoint: `/api/checkout`
- Verifica productos y precios consultando Sanity
- Crea una `Checkout Session` en Stripe

Webhook:

- Endpoint: `/api/webhooks/stripe`
- Soporta base para `checkout.session.completed` y eventos de payment intent

Para probar webhooks en local:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Flujo de contenido

1. Configuras productos y ajustes globales en Sanity Studio.
2. Next.js consume el contenido con GROQ usando `next-sanity`.
3. El usuario agrega productos al carrito.
4. `/api/checkout` crea la sesion de pago en Stripe.
5. Stripe redirige a las paginas de exito o cancelacion.
6. El webhook recibe los eventos de pago.

## Notas

- El hero de la homepage acepta una URL directa a un archivo `.mp4` desde `siteSettings.heroVideo`.
- Las imagenes remotas de Sanity estan habilitadas en [`next.config.ts`](/home/yuyay/Code/benitoanagua/solea-sora/next.config.ts).
- El proyecto usa `useCdn: true` en el cliente publico de Sanity y `useCdn: false` para operaciones sensibles del checkout.

## Estado actual

Base funcional para tienda de skincare con CMS y pagos integrados. Faltan piezas tipicas de produccion como persistencia de ordenes, manejo de inventario post-pago, emails transaccionales y endurecimiento del webhook.
