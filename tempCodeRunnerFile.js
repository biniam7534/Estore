function addtocart(id) {
 const product = products.find(p => p.id === id);
 console.log(`${product.name} added to cart!`);
}