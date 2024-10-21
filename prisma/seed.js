const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const restaurantsWithMenus = [
    {
      id: "cm1293j7g0001p7pak19l8bye", // Replace with actual restaurant ID
      name: "Douce Pâtisserie Cafè",
      menu: [
        { name: "Croissant", description: "Buttery, flaky pastry", price: 2.50 },
        { name: "Pain au Chocolat", description: "Chocolate-filled croissant", price: 3.00 },
        { name: "Café Latte", description: "Espresso with steamed milk", price: 3.50 },
        { name: "Quiche Lorraine", description: "Savory tart with bacon and cheese", price: 8.00 },
      ]
    },
    {
      id: "cm1293jsn0003p7pa5a2oglvu", // Replace with actual restaurant ID
      name: "Giano Bifronte Bistrot",
      menu: [
        { name: "Bruschetta al Pomodoro", description: "Toasted bread with fresh tomatoes and basil", price: 6.00 },
        { name: "Carpaccio di Manzo", description: "Thinly sliced raw beef with arugula and parmesan", price: 12.00 },
        { name: "Arancini", description: "Sicilian rice balls stuffed with ragu and cheese", price: 8.00 },
        { name: "Insalata Caprese", description: "Fresh mozzarella, tomatoes, and basil", price: 9.00 },
      ]
    },
    {
      id: "cm1293k6r0005p7pano9n96up", // Replace with actual restaurant ID
      name: "N9ve Ristorante Evoluto",
      menu: [
        { name: "Sfera di Mozzarella", description: "Molecular gastronomy mozzarella sphere", price: 14.00 },
        { name: "Tartare di Tonno", description: "Tuna tartare with avocado and citrus", price: 16.00 },
        { name: "Uovo 65°", description: "Slow-cooked egg with truffle foam", price: 18.00 },
        { name: "Crudo di Pesce", description: "Raw fish platter with daily selection", price: 22.00 },
      ]
    },
    {
      id: "cm1293kl20007p7pamy9f4mzf", // Replace with actual restaurant ID
      name: "Les Rouges Cucina & Cocktails",
      menu: [
        { name: "Escargots à la Bourguignonne", description: "Snails in garlic-herb butter", price: 12.00 },
        { name: "Fritto Misto", description: "Mixed fried seafood platter", price: 15.00 },
        { name: "Pâté de Foie Gras", description: "Duck liver pâté with brioche", price: 18.00 },
        { name: "Negroni Sbagliato", description: "Classic cocktail with prosecco", price: 10.00 },
      ]
    },
  ];

  for (const restaurantData of restaurantsWithMenus) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantData.id },
    });

    if (restaurant) {
      for (const menuItem of restaurantData.menu) {
        await prisma.menuItem.create({
          data: {
            ...menuItem,
            restaurantId: restaurant.id,
          },
        });
      }
      console.log(`Added ${restaurantData.menu.length} menu items to ${restaurant.name}`);
    } else {
      console.log(`Restaurant with ID "${restaurantData.id}" not found. Skipping menu items.`);
    }
  }

  console.log("Menu items added successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });