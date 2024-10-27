const mongoose = require('mongoose');
module.exports.connet = async() =>{
    try
    {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect success");
        
    }
    catch(err)
    {
        console.log(`connect error: ${err}`)
    }
}
