// Menu data - restaurant items organized by category
const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushroom", "mozzarella"],
        id: 0,
        price: 14,
        emoji: "🍕",
        category: "main dish"
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        id: 1,
        category: "main dish"
    },
    {
        name: "Beer",
        ingredients: ["grain", "hops", "yeast", "water"],
        price: 12,
        emoji: "🍺",
        id: 2,
        category: "beverage"
    },
    {
        name: "French Fries",
        ingredients: ["potatoes", "salt", "oil"],
        price: 8,
        emoji: "🍟",
        id: 3,
        category: "side dish"
    },
    {
        name: "Soda",
        ingredients: ["carbonated water", "sugar", "flavoring"],
        price: 5,
        emoji: "🥤",
        id: 4,
        category: "beverage"
    },
    {
        name: "Chicken Wings",
        ingredients: ["chicken", "buffalo sauce", "celery"],
        price: 15,
        emoji: "🍗",
        id: 6,
        category: "side dish"
    },
    {
        name: "Orange Juice",
        ingredients: ["fresh oranges"],
        price: 6,
        emoji: "🍊",
        id: 7,
        category: "beverage"
    },
    {
        name: "Pasta",
        ingredients: ["pasta", "tomato sauce", "parmesan"],
        price: 13,
        emoji: "🍝",
        id: 9,
        category: "main dish"
    }
];

// Category configuration - defines the menu categories
const categories = [
    { name: "Main Dish", id: "main dish", emoji: "🍖" },
    { name: "Beverage", id: "beverage", emoji: "🥤" },
    { name: "Side Dish", id: "side dish", emoji: "🍟" }
];

// Export for ES6 modules
export { menuArray, categories };