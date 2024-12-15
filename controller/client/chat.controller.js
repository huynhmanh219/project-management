//[GET] /chat
module.exports.index = (req,res)=>{
    //socket
    _io.on("connection",(socket)=>{
        console.log("a user connect",socket.id);  
    })
    //end socket
    
    res.render("client/pages/chat/index",
        {
            pageTitle:"Chat"
        }
    )
}