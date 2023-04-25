export function countAndFilter(products) {
  const count = {};
  const filteredProducts = [];

  for (const product of products) {
    if (count[product.id]) {
      count[product.id] += 1;
    } else {
      count[product.id] = 1;
      filteredProducts.push(product);
    }
  }

  for (const product of filteredProducts) {
    if (count[product.id]) {
      product.cartquantity = count[product.id];
    }
  }

  return filteredProducts;
}
