import { PrismaClient, PlaceCategory } from '@prisma/client';

const prisma = new PrismaClient();

const melbournePlaces = [
  {
    name: 'Chin Chin',
    category: PlaceCategory.RESTAURANT,
    lat: -37.815,
    lng: 144.969,
    address: '125 Flinders Ln, Melbourne VIC',
    city: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.5,
  },
  {
    name: 'Hardware Société',
    category: PlaceCategory.CAFE,
    lat: -37.8117,
    lng: 144.9608,
    address: '10 Katherine Pl, Melbourne VIC',
    city: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.6,
  },
  {
    name: 'Ponyfish Island',
    category: PlaceCategory.BAR,
    lat: -37.8194,
    lng: 144.9646,
    address: 'Southbank Pedestrian Bridge, Melbourne VIC',
    city: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.3,
  },
  {
    name: 'Cookie',
    category: PlaceCategory.BAR,
    lat: -37.8137,
    lng: 144.9657,
    address: 'Level 1/252 Swanston St, Melbourne VIC',
    city: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.4,
  },
  {
    name: 'The Local Taphouse',
    category: PlaceCategory.PUB,
    lat: -37.8656,
    lng: 144.9793,
    address: '184 Carlisle St, St Kilda East VIC',
    city: 'St Kilda East',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.5,
  },
  {
    name: 'Seven Seeds',
    category: PlaceCategory.CAFE,
    lat: -37.8034,
    lng: 144.9602,
    address: '114 Berkeley St, Carlton VIC',
    city: 'Carlton',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.6,
  },
  {
    name: 'Cumulus Inc.',
    category: PlaceCategory.RESTAURANT,
    lat: -37.8154,
    lng: 144.971,
    address: '45 Flinders Ln, Melbourne VIC',
    city: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.4,
  },
  {
    name: 'Movida',
    category: PlaceCategory.RESTAURANT,
    lat: -37.8179,
    lng: 144.9699,
    address: '1 Hosier Ln, Melbourne VIC',
    city: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.5,
  },
  {
    name: 'The Everleigh',
    category: PlaceCategory.BAR,
    lat: -37.7979,
    lng: 144.9864,
    address: '150-156 Gertrude St, Fitzroy VIC',
    city: 'Fitzroy',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.7,
  },
  {
    name: 'The Napier Hotel',
    category: PlaceCategory.PUB,
    lat: -37.7987,
    lng: 144.9833,
    address: '210 Napier St, Fitzroy VIC',
    city: 'Fitzroy',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.3,
  },
  {
    name: 'Industry Beans Fitzroy',
    category: PlaceCategory.CAFE,
    lat: -37.7981,
    lng: 144.9818,
    address: '3/62 Rose St, Fitzroy VIC',
    city: 'Fitzroy',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.5,
  },
  {
    name: 'Higher Ground',
    category: PlaceCategory.CAFE,
    lat: -37.8141,
    lng: 144.9556,
    address: '650 Little Bourke St, Melbourne VIC',
    city: 'Melbourne',
    state: 'VIC',
    country: 'Australia',
    source: 'seed',
    rating: 4.6,
  },
];

async function main() {
  console.log('Start seeding...');

  for (const place of melbournePlaces) {
    const created = await prisma.place.upsert({
      where: {
        source_sourceId: {
          source: place.source,
          sourceId: place.name, // Using name as sourceId for seed data
        },
      },
      update: {},
      create: {
        ...place,
        sourceId: place.name,
      },
    });
    console.log(`Created place: ${created.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
