require('dotenv').config();
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
    { name: "Glass", price: 1199.99, image: "./images/glass.avif", category: "home-material", description: "A glass container for drinking beverages." }
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
