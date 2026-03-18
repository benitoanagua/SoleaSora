// scripts/seed.ts
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_EDITOR_TOKEN!,
  useCdn: false,
});

const products = [
  {
    _type: "product",
    name: "Sérum Luminoso Nocturno",
    slug: { _type: "slug", current: "serum-luminoso-nocturno" },
    tagline: "Tu piel, renovada mientras dormís",
    category: "serum",
    price: 18500,
    compareAtPrice: 22000,
    inStock: true,
    isNew: true,
    isFeatured: true,
    order: 1,
    shortDescription:
      "Sérum con retinol encapsulado y ácido hialurónico triple peso molecular. Actúa profundo mientras dormís.",
    storySections: [
      {
        _type: "storySection",
        _key: "story-1-1",
        headline: "La noche es el momento de mayor regeneración",
        body: "Mientras dormís, tu piel trabaja a máxima capacidad. Nuestro sérum potencia ese proceso natural con retinol microencapsulado que se libera de forma gradual.",
      },
      {
        _type: "storySection",
        _key: "story-1-2",
        headline: "Triple ácido hialurónico",
        body: "Tres pesos moleculares distintos para una hidratación en superficie, dermis y profundidad. El resultado es visible desde la primera aplicación.",
      },
      {
        _type: "storySection",
        _key: "story-1-3",
        headline: "Formulado para la piel latinoamericana",
        body: "Testado en distintos fototipos y climas. Liviano, no comedogénico, apto para pieles sensibles.",
      },
    ],
    ingredients: [
      {
        _type: "ingredient",
        _key: "ing-1-1",
        name: "Retinol encapsulado",
        scientificName: "Retinyl Palmitate",
        benefit: "Estimula la renovación celular y reduce líneas finas",
      },
      {
        _type: "ingredient",
        _key: "ing-1-2",
        name: "Ácido Hialurónico",
        scientificName: "Sodium Hyaluronate",
        benefit: "Hidratación profunda en tres niveles de la piel",
      },
      {
        _type: "ingredient",
        _key: "ing-1-3",
        name: "Niacinamida",
        scientificName: "Niacinamide",
        benefit: "Unifica el tono y reduce los poros visibles",
      },
      {
        _type: "ingredient",
        _key: "ing-1-4",
        name: "Péptidos de cobre",
        scientificName: "Copper Tripeptide-1",
        benefit: "Estimula la producción de colágeno y elastina",
      },
    ],
    benefits: [
      {
        _type: "benefit",
        _key: "ben-1-1",
        stat: "98%",
        label: "notó piel más luminosa en 4 semanas",
      },
      {
        _type: "benefit",
        _key: "ben-1-2",
        stat: "3x",
        label: "más hidratación vs sérum convencional",
      },
      {
        _type: "benefit",
        _key: "ben-1-3",
        stat: "28 días",
        label: "para renovación celular completa",
      },
    ],
    howToUse: [
      {
        _type: "step",
        _key: "step-1-1",
        step: 1,
        instruction: "Limpiar el rostro y secar suavemente",
      },
      {
        _type: "step",
        _key: "step-1-2",
        step: 2,
        instruction: "Aplicar 3-4 gotas sobre piel seca",
      },
      {
        _type: "step",
        _key: "step-1-3",
        step: 3,
        instruction: "Masajear con movimientos ascendentes",
      },
      {
        _type: "step",
        _key: "step-1-4",
        step: 4,
        instruction: "Continuar con crema hidratante si se desea",
      },
    ],
    skinTypes: ["all", "dry", "mature"],
    volume: "30ml",
    fullIngredientList:
      "Aqua, Glycerin, Sodium Hyaluronate, Niacinamide, Retinyl Palmitate, Copper Tripeptide-1, Panthenol, Allantoin, Carbomer, Phenoxyethanol.",
  },

  {
    _type: "product",
    name: "Crema Barrera Restauradora",
    slug: { _type: "slug", current: "crema-barrera-restauradora" },
    tagline: "Restaurá tu escudo natural",
    category: "cream",
    price: 15900,
    inStock: true,
    isNew: false,
    isFeatured: true,
    order: 2,
    shortDescription:
      "Crema rica en ceramidas y escualano para restaurar la barrera cutánea dañada por el sol, el frío o el estrés.",
    storySections: [
      {
        _type: "storySection",
        _key: "story-2-1",
        headline: "La barrera cutánea es tu primera línea de defensa",
        body: "Cuando se debilita, la piel pierde agua, se irrita y envejece más rápido. Esta crema la repara desde adentro.",
      },
      {
        _type: "storySection",
        _key: "story-2-2",
        headline: "Ceramidas idénticas a las de tu piel",
        body: "Tres tipos de ceramidas que imitan la composición natural del estrato córneo. Tu piel las reconoce y las incorpora de inmediato.",
      },
    ],
    ingredients: [
      {
        _type: "ingredient",
        _key: "ing-2-1",
        name: "Ceramidas NP, AP, EOP",
        scientificName: "Ceramide NP",
        benefit: "Reparan y fortalecen la barrera cutánea",
      },
      {
        _type: "ingredient",
        _key: "ing-2-2",
        name: "Escualano",
        scientificName: "Squalane",
        benefit: "Hidrata sin obstruir poros, imita el sebo natural",
      },
      {
        _type: "ingredient",
        _key: "ing-2-3",
        name: "Manteca de karité",
        scientificName: "Butyrospermum Parkii Butter",
        benefit: "Nutrición profunda y efecto calmante",
      },
    ],
    benefits: [
      {
        _type: "benefit",
        _key: "ben-2-1",
        stat: "72hs",
        label: "de hidratación continua",
      },
      {
        _type: "benefit",
        _key: "ben-2-2",
        stat: "94%",
        label: "reportó piel más calmada en 7 días",
      },
    ],
    howToUse: [
      {
        _type: "step",
        _key: "step-2-1",
        step: 1,
        instruction: "Aplicar mañana y noche sobre piel limpia",
      },
      {
        _type: "step",
        _key: "step-2-2",
        step: 2,
        instruction: "Extender con movimientos suaves hacia afuera",
      },
      {
        _type: "step",
        _key: "step-2-3",
        step: 3,
        instruction: "Usar protector solar encima en la rutina de mañana",
      },
    ],
    skinTypes: ["dry", "sensitive", "mature"],
    volume: "50ml",
    fullIngredientList:
      "Aqua, Squalane, Butyrospermum Parkii Butter, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Cholesterol, Phytosphingosine, Carbomer, Phenoxyethanol.",
  },

  {
    _type: "product",
    name: "Gel Limpiador Suave",
    slug: { _type: "slug", current: "gel-limpiador-suave" },
    tagline: "Limpieza profunda sin comprometer el equilibrio",
    category: "cleanser",
    price: 9800,
    inStock: true,
    isNew: false,
    isFeatured: false,
    order: 3,
    shortDescription:
      "Gel de limpieza de pH balanceado con aloe vera y extracto de pepino. Remueve impurezas sin resecar.",
    storySections: [
      {
        _type: "storySection",
        _key: "story-3-1",
        headline: "El pH importa más de lo que pensás",
        body: "Un limpiador agresivo destruye el manto ácido natural de tu piel. El nuestro tiene pH 5.5, idéntico al de una piel sana.",
      },
      {
        _type: "storySection",
        _key: "story-3-2",
        headline: "Espuma densa, sensación liviana",
        body: "Surfactantes de origen vegetal que limpian sin tirantez. Apto para usar mañana y noche.",
      },
    ],
    ingredients: [
      {
        _type: "ingredient",
        _key: "ing-3-1",
        name: "Aloe Vera",
        scientificName: "Aloe Barbadensis Leaf Juice",
        benefit: "Calma, hidrata y reduce la rojez",
      },
      {
        _type: "ingredient",
        _key: "ing-3-2",
        name: "Extracto de pepino",
        scientificName: "Cucumis Sativus Fruit Extract",
        benefit: "Refresca y descongestiona la piel",
      },
      {
        _type: "ingredient",
        _key: "ing-3-3",
        name: "Gluconolactona",
        scientificName: "Gluconolactone",
        benefit: "Exfoliante suave que afina la textura",
      },
    ],
    benefits: [
      {
        _type: "benefit",
        _key: "ben-3-1",
        stat: "pH 5.5",
        label: "respeta el manto ácido natural",
      },
      {
        _type: "benefit",
        _key: "ben-3-2",
        stat: "100%",
        label: "libre de sulfatos agresivos (SLS/SLES)",
      },
    ],
    howToUse: [
      {
        _type: "step",
        _key: "step-3-1",
        step: 1,
        instruction: "Humedecer el rostro con agua tibia",
      },
      {
        _type: "step",
        _key: "step-3-2",
        step: 2,
        instruction: "Aplicar una pequeña cantidad y espumar",
      },
      {
        _type: "step",
        _key: "step-3-3",
        step: 3,
        instruction: "Masajear suavemente por 60 segundos",
      },
      {
        _type: "step",
        _key: "step-3-4",
        step: 4,
        instruction: "Enjuagar con agua fría para cerrar los poros",
      },
    ],
    skinTypes: ["all", "oily", "combination", "sensitive"],
    volume: "150ml",
    fullIngredientList:
      "Aqua, Aloe Barbadensis Leaf Juice, Cocamidopropyl Betaine, Sodium Lauroyl Glutamate, Cucumis Sativus Fruit Extract, Gluconolactone, Panthenol, Allantoin, Citric Acid.",
  },

  {
    _type: "product",
    name: "Protector Solar Fluido SPF 50+",
    slug: { _type: "slug", current: "protector-solar-fluido-spf50" },
    tagline: "El paso que no podés saltarte",
    category: "sunscreen",
    price: 14200,
    compareAtPrice: 16500,
    inStock: true,
    isNew: true,
    isFeatured: false,
    order: 4,
    shortDescription:
      "Protector solar de acabado invisible con filtros de nueva generación. Textura fluida que no deja residuo blanco.",
    storySections: [
      {
        _type: "storySection",
        _key: "story-4-1",
        headline: "SPF 50+ de nueva generación",
        body: "Filtros Tinosorb M y S de origen europeo, más estables y efectivos que los filtros tradicionales. Protección UVA/UVB/IR.",
      },
      {
        _type: "storySection",
        _key: "story-4-2",
        headline: "Sin cast blanco, sin sensación grasienta",
        body: "Formulado para funcionar como base de maquillaje. Absorción rápida, acabado satinado.",
      },
    ],
    ingredients: [
      {
        _type: "ingredient",
        _key: "ing-4-1",
        name: "Tinosorb M",
        scientificName: "Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine",
        benefit: "Filtro UVA/UVB de amplio espectro y alta estabilidad",
      },
      {
        _type: "ingredient",
        _key: "ing-4-2",
        name: "Niacinamida",
        scientificName: "Niacinamide",
        benefit: "Previene manchas y unifica el tono",
      },
      {
        _type: "ingredient",
        _key: "ing-4-3",
        name: "Vitamina E",
        scientificName: "Tocopheryl Acetate",
        benefit: "Antioxidante que neutraliza el daño por radicales libres",
      },
    ],
    benefits: [
      {
        _type: "benefit",
        _key: "ben-4-1",
        stat: "SPF 50+",
        label: "protección UVA/UVB/IR de amplio espectro",
      },
      {
        _type: "benefit",
        _key: "ben-4-2",
        stat: "0%",
        label: "cast blanco ni sensación grasienta",
      },
      {
        _type: "benefit",
        _key: "ben-4-3",
        stat: "8hs",
        label: "de protección efectiva",
      },
    ],
    howToUse: [
      {
        _type: "step",
        _key: "step-4-1",
        step: 1,
        instruction: "Aplicar como último paso de la rutina de mañana",
      },
      {
        _type: "step",
        _key: "step-4-2",
        step: 2,
        instruction: "Usar 1/4 de cucharadita para todo el rostro",
      },
      {
        _type: "step",
        _key: "step-4-3",
        step: 3,
        instruction: "Reaplicar cada 2 horas si hay exposición solar",
      },
    ],
    skinTypes: ["all", "oily", "combination"],
    volume: "50ml",
    fullIngredientList:
      "Aqua, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Niacinamide, Tocopheryl Acetate, Glycerin, Dimethicone, Phenoxyethanol.",
  },

  {
    _type: "product",
    name: "Mascarilla Arcilla Rosa",
    slug: { _type: "slug", current: "mascarilla-arcilla-rosa" },
    tagline: "Ritual de pureza una vez a la semana",
    category: "mask",
    price: 11500,
    inStock: true,
    isNew: false,
    isFeatured: false,
    order: 5,
    shortDescription:
      "Mascarilla de arcilla caolín y rosa mosqueta para purificar los poros y aportar luminosidad en 10 minutos.",
    storySections: [
      {
        _type: "storySection",
        _key: "story-5-1",
        headline: "Arcilla que purifica sin agredir",
        body: "A diferencia de las arcillas volcánicas, el caolín es suave y apto para pieles sensibles. Absorbe el exceso de sebo sin resecar.",
      },
      {
        _type: "storySection",
        _key: "story-5-2",
        headline: "Rosa mosqueta: el oro de la Patagonia",
        body: "Rica en ácido linoleico y betacarotenos, la rosa mosqueta regenera y aporta ese glow luminoso característico.",
      },
    ],
    ingredients: [
      {
        _type: "ingredient",
        _key: "ing-5-1",
        name: "Arcilla Caolín",
        scientificName: "Kaolin",
        benefit: "Purifica poros y absorbe el exceso de sebo",
      },
      {
        _type: "ingredient",
        _key: "ing-5-2",
        name: "Aceite de Rosa Mosqueta",
        scientificName: "Rosa Canina Fruit Oil",
        benefit: "Regenera, ilumina y aporta ácidos grasos esenciales",
      },
      {
        _type: "ingredient",
        _key: "ing-5-3",
        name: "Extracto de lavanda",
        scientificName: "Lavandula Angustifolia Extract",
        benefit: "Calma la piel y aporta propiedades antisépticas leves",
      },
    ],
    benefits: [
      {
        _type: "benefit",
        _key: "ben-5-1",
        stat: "10 min",
        label: "es todo lo que necesitás",
      },
      {
        _type: "benefit",
        _key: "ben-5-2",
        stat: "89%",
        label: "notó poros más finos después del primer uso",
      },
    ],
    howToUse: [
      {
        _type: "step",
        _key: "step-5-1",
        step: 1,
        instruction: "Aplicar capa uniforme sobre piel limpia y seca",
      },
      {
        _type: "step",
        _key: "step-5-2",
        step: 2,
        instruction: "Dejar actuar 10 minutos (no dejar secar del todo)",
      },
      {
        _type: "step",
        _key: "step-5-3",
        step: 3,
        instruction: "Retirar con agua tibia y movimientos circulares",
      },
      {
        _type: "step",
        _key: "step-5-4",
        step: 4,
        instruction: "Usar 1 o 2 veces por semana",
      },
    ],
    skinTypes: ["oily", "combination", "acne"],
    volume: "75ml",
    fullIngredientList:
      "Aqua, Kaolin, Rosa Canina Fruit Oil, Lavandula Angustifolia Extract, Glycerin, Bentonite, Zinc Oxide, Phenoxyethanol.",
  },
];

async function seed() {
  console.log("🌱 Iniciando seed de productos Solea Sora...\n");

  for (const product of products) {
    try {
      const result = await client.create(product);
      console.log(`✓ Creado: ${product.name} (${result._id})`);
    } catch (err) {
      console.error(`✗ Error en ${product.name}:`, err);
    }
  }

  console.log(
    "\n✅ Seed completado. Revisá tu Studio en localhost:3000/studio",
  );
}

seed();
