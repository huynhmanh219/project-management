const ProductCategory = require("../models/product-category.model");

module.exports.getSubCategory = async (parentId) =>{ 
    const getCategory = async (parentId) =>
        {
            const subs = await ProductCategory.find({
                parent_id:parentId,
                status:"active",
                deleted:false
            });

            let allsubs = [...subs];

            for (const sub of subs) {
                const childs = await getCategory(sub.id);
                allsubs = allsubs.concat(childs);
            }

            return allsubs;
        };
    const result = await getCategory(parentId);
    return result;
}