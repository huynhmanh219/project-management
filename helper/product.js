module.exports.priceNewproducts = (products)=>{
    const newproduct = products.map(item => {
        item.pricenew = (item.price -(100 *item.discountPercentage)/100).toFixed(0);
        return item;
    });
    return newproduct;
}

module.exports.priceNewproduct = (product)=>{
    const priceNew =  (product.price -(100 *product.discountPercentage)/100).toFixed(0);
    return parseInt(priceNew);
}