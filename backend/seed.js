const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    { name: "Wireless Headphone", price: 3500.00, image: "./images/images (10).jpg", category: "electronics", description: "High-quality wireless headphones with noise cancellation and long battery life." },
    { name: "Smart phone", price: 42500.00, image: "./images/iPhone.avif", category: "electronics", description: "Latest smartphone with advanced features and sleek design." },
    { name: "Men suit", price: 18000.00, image: "./images/shopping (1).webp", category: "fashion-clothes", description: "Suit designed for formal occasions, made with high-quality fabric." },
    { name: "Camera", price: 60000.00, image: "./images/camera.avif", category: "electronics", description: "High quality camera for images and videos." },
    { name: "Plate", price: 12000.00, image: "./images/download.jpg", category: "home-material", description: "A luxury plate for stylish dining." },
    { name: "Eye glass", price: 2800.00, image: "./images/vishnu-prasad-STykhkcG-p8-unsplash.jpg", category: "electronics", description: "Stylish eyewear protecting eyes from UV rays." },
    { name: "Female dress", price: 140000.00, image: "./images/download.webp", category: "fashion-clothes", description: "A beautiful and elegant dress." },
    { name: "Habesha tebab", price: 10099.90, image: "./images/shopping.webp", category: "traditional-clothes", description: "Traditional Ethiopian wear." },
    { name: "Smart watch", price: 6700.99, image: "./images/daniel-korpai-QhF3YGsDrYk-unsplash.jpg", category: "electronics", description: "A smartwatch combining digital watch with advanced features." },
    { name: "Glass", price: 1199.99, image: "./images/glass.avif", category: "home-material", description: "A glass container for drinking beverages." },
    { name: "iPad Pro", price: 1500.00, image: "./images/airpad.png", category: "electronics", description: "Compact wireless earbuds with clear sound and comfortable fit." },
    { name: "Bluetooth Speaker", price: 4500.00, image: "./images/bluetooth_speaker.avif", category: "electronics", description: "Portable Bluetooth speaker with deep bass and high-quality sound." },
    { name: "Casual Hoodie", price: 3400.00, image: "./images/cousal_hoddie.png", category: "fashion-clothes", description: "Comfortable and stylish hoodie made with soft fabric for everyday fashion wear." },
    { name: "Denim Jacket", price: 5200.00, image: "./images/denima_jacket.avif", category: "fashion-clothes", description: "Modern denim jacket with a classic street-style look and durable material." },
    { name: "Luxury Female Suit", price: 15000.00, image: "./images/female_suit.webp", category: "fashion-clothes", description: "Elegant female suit for business and formal events." },
    { name: "Professional Female Suit", price: 12000.00, image: "./images/female_suit1.webp", category: "fashion-clothes", description: "Polished and professional suit for workplace elegance." },
    { name: "Crystal Wine Glass", price: 800.00, image: "./images/glass.avif", category: "home-material", description: "Exquisite crystal glass for fine dining." },
    { name: "Kitchen Utensil Set", price: 9500.00, image: "./images/kitchen.avif", category: "home-material", description: "Complete set of high-quality kitchen tools." },
    { name: "Laptop", price: 85000.00, image: "./images/laptop.png", category: "electronics", description: "Powerful laptop for work, study, and entertainment with long battery life." },
    { name: "Cultural Men's Outfit", price: 5800.00, image: "./images/men_outfit.png", category: "traditional-clothes", description: "Stylish traditional Ethiopian men's wear designed for holidays and cultural events." },
    { name: "Oromo Traditional Clothing", price: 6200.00, image: "./images/oromo_culture.png", category: "traditional-clothes", description: "Colorful Oromo cultural clothing with unique handcrafted designs and premium fabric." },
    { name: "Power Bank", price: 2800.00, image: "./images/powerbank.png", category: "electronics", description: "Portable high-capacity power bank for charging devices anywhere." },
    { name: "Slim Fit Jeans", price: 3900.00, image: "./images/slimfit_jeans.avif", category: "fashion-clothes", description: "Stylish slim fit jeans with flexible and comfortable high-quality denim fabric." },
    { name: "Sneakers", price: 4300.00, image: "./images/sneakers.avif", category: "fashion-clothes", description: "Lightweight fashion sneakers with modern style and comfortable sole design." },
    { name: "Modern Sofa", price: 45000.00, image: "./images/sofa.jpg", category: "home-material", description: "Comfortable and stylish modern sofa for your living room." },
    { name: "Men's Formal Suit", price: 22000.00, image: "./images/suit.avif", category: "fashion-clothes", description: "Premium formal suit for executive look." },
    { name: "Fashion T-Shirt", price: 1500.00, image: "./images/t-shirt.avif", category: "fashion-clothes", description: "Trendy cotton T-shirt with modern design perfect for casual outfits." },
    { name: "Tablet", price: 18500.00, image: "./images/tablet.png", category: "electronics", description: "Modern tablet perfect for reading, gaming, and productivity tasks." },
    { name: "Traditional Habesha Dress", price: 4500.00, image: "./images/tradional_dress.jpg", category: "traditional-clothes", description: "Elegant Ethiopian traditional dress with beautiful woven patterns and soft cotton fabric." },
    { name: "Traditional Wedding Dress", price: 12500.00, image: "./images/Wedding Dress.png", category: "traditional-clothes", description: "Luxury Ethiopian wedding dress with detailed embroidery and elegant traditional style." },
    { name: "Bridesmaid Dress", price: 35000.00, image: "./images/wedding_female.png", category: "fashion-clothes", description: "Elegant and matching dress for bridesmaids." },
    { name: "Women's Fashion Dress", price: 4800.00, image: "./images/women_fashion_dress.avif", category: "fashion-clothes", description: "Elegant fashion dress designed with premium fabric for parties and special occasions." },
    { name: "Traditional Shawl", price: 1900.00, image: "./images/wedding_female.png", category: "traditional-clothes", description: "Handmade traditional shawl with classic Ethiopian embroidery and lightweight comfort." }
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/estore');
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(products);
        console.log('Database seeded successfully!');

        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
}

seedDB();
