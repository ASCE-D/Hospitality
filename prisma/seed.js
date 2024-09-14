const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const restaurants = [
    // Breakfast restaurants
    {
      name: "Douce Pâtisserie Cafè",
      description: "Elegant French-inspired patisserie and café offering exquisite pastries and fine coffee.",
      address: "Via San Vincenzo 2r, 16121 Genova GE, Italy",
      mail: false,
      whatsapp: true,
    },
    // Appetizer restaurants
    {
      name: "Giano Bifronte Bistrot",
      description: "Modern Italian bistro offering innovative appetizers and a unique dining experience.",
      address: "Via Garibaldi 38r, 16124 Genova GE, Italy",
      mail: true,
      whatsapp: true,
    },
    {
      name: "N9ve Ristorante Evoluto",
      description: "Avant-garde Italian cuisine featuring creative appetizers and tasting menus.",
      address: "Via Balbi 40, 16126 Genova GE, Italy",
      mail: true,
      whatsapp: false,
    },
    {
      name: "Les Rouges Cucina & Cocktails",
      description: "Chic restaurant blending Italian cuisine with French influences, known for appetizers and cocktails.",
      address: "Via Carlo Barabino 44R, 16129 Genova GE, Italy",
      mail: false,
      whatsapp: true,
    },
  ];

  let id = 22;
  for (const restaurant of restaurants) {
    const owner = await prisma.user.create({
      data: {
        id: `owner${id}`,
        email: `owner${id}@example.com`,
        name: "Restaurant Owner",
        password: "test",
      },
    });

    await prisma.restaurant.create({
      data: { ...restaurant, ownerId: owner.id },
    });

    id++;
  }

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });