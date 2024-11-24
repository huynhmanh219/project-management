module.exports.priceNewproduct = (products)=>{
    const newproduct = products.map(item => {
        item.pricenew = item.price -(100 *item.discountPercentage)/100;
        return item;
    });
    return newproduct;
}